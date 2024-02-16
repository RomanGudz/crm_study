import createElements from './createElements.js';
import data from './data.js';

const {
  renderGoods,
  deleteModal,
  totalPriceElem,
  modalError,
} = createElements;

const {
  toBase64,
} = data;


const controlModal = (modal) => {
  const openModal = () => {
    modal.classList.add('active');
  };
  const closeModal = () => {
    modal.classList.remove('active');
  };

  const openBtn = document.querySelector('.panel__add-goods');
  openBtn.addEventListener('click', openModal);

  modal.addEventListener('click', e => {
    const target = e.target;
    if (target === modal || target.closest('.modal__close')) {
      closeModal();
    }
  });
};

const activeDiscount = () => {
  const modalDiscount = document.querySelector('#discount');
  const modalDiscountInput = document.querySelector('.modal__input_discount');
  modalDiscount.addEventListener('click', () => {
    if (modalDiscount.checked) {
      modalDiscountInput.removeAttribute('disabled');
    } else {
      modalDiscountInput.value = '';
      modalDiscountInput.setAttribute('disabled', 'disabled');
    }
  });
};

const submitForm = (modal, loadGods, id = undefined) => {
  const discountCheckbox = document.getElementById('discount');
  const form = document.querySelector('.modal__form');

  const errImg = document.querySelector('.err-add-image');
  form.price.addEventListener('change', e => {
    form.total.value = `$ ${e.target.value * form.count.value}`;
  });

  form.count.addEventListener('change', e => {
    form.total.value = `$ ${e.target.value * form.price.value}`;
  });
  form.image.addEventListener('change', () => {
    const image = form.image.files[0];
    const img = document.querySelector('.image-container');
    if (image.size > 1000000) {
      errImg.style.display = 'block';
      img.style.display = 'none';
    } else {
      img.src = URL.createObjectURL(image);
      errImg.style.display = 'none';
      img.style.display = 'block';
    }
  });
  modal.addEventListener('submit', async e => {
    const target = e.target;
    e.preventDefault();
    const formData = new FormData(target);
    formData.set('discount', discountCheckbox.checked);
    const newGood = Object.fromEntries(formData);
    const imgTobase64 = await toBase64(newGood.image);
    newGood.image = imgTobase64;

    const { response } = await loadGods({
      requestMethod: 'POST', requestBody: newGood,
    },
      (err) => {
        if (err) {
          console.log('err: ', err);
          modalError();
        }
      },
    );
    if (response.ok) {
      const { data } = await loadGods({});
      renderGoods(data.goods);
      form.reset();
      document.querySelector('.overlay').classList.remove('active');
    }
  });
};

const deleteGood = (goods, calback) => {
  const btnDelete = document.querySelectorAll('.table__btn_del');
  btnDelete.forEach(del => {
    del.addEventListener('click', async e => {
      const target = e.target;
      const row = target.closest('tr');
      if (row) {
        const rowIndex = Array.from(row.parentNode.children).indexOf(row);
        const goodId = goods[rowIndex].id;
        const showModal = await deleteModal(goodId);
        if (showModal) {
          await calback({ id: goodId, requestMethod: 'DELETE' });
          goods.splice(rowIndex, 1);
          totalPriceElem();
          row.remove();
        }
      }
    });
  });
};

const openPic = () => {
  const openPic = document.querySelectorAll('.table__btn_pic');
  openPic.forEach((button) => {
    button.addEventListener('click', e => {
      const target = e.target;
      const url = target.getAttribute('data-pic');
      const screenY = (screen.height / 2) / 2;
      const screenX = (screen.width / 2) / 2;
      open(`http://localhost:3000/${url}`, 'about:blank',
        `width=800,height=600,top=${screenY},left=${screenX}`);
    });
  });
};

const editGods = (modal, calback) => {
  const editBtn = document.querySelectorAll('.table__btn_edit');
  const idGood = document.querySelector('.vendor-code__id');
  const img = document.querySelector('.image-container');
  const discountCheckbox = document.getElementById('discount');
  editBtn.forEach((button) => {
    button.addEventListener('click', async e => {
      const formModal = modal.children[0].children[2];
      const target = e.target;
      const tr = target.closest('tr');
      console.log('tr: ', tr);
      const goodId = tr.children[1].getAttribute('dataid');
      const good = await calback({ id: goodId });
      idGood.textContent = goodId;
      formModal.title.value = good.title;
      formModal.category.value = good.category;
      formModal.description.value = good.description;
      formModal.units.value = good.units;
      formModal.count.value = good.count;
      formModal.price.value = good.price;
      img.style.display = 'block';
      img.src = `http://localhost:3000/${good.image}`;
      formModal.total.value = `$${good.count * good.price}`;
      modal.classList.add('active');
      formModal.addEventListener('submit', async e => {
        e.preventDefault();
        const target = e.target;
        const formData = new FormData(target);
        formData.set('discount', discountCheckbox.checked);
        const newGood = Object.fromEntries(formData);
        const imgTobase64 = await toBase64(newGood.image);
        newGood.id = goodId;
        newGood.image = imgTobase64;
        await calback({
          id: goodId,
          requestMethod: 'PATCH',
          requestBody: newGood,
        });
        const { data } = await calback({});
        renderGoods(data.goods);
        formModal.reset();
        document.querySelector('.overlay').classList.remove('active');
      });
    });
  });
};

export default {
  controlModal,
  activeDiscount,
  submitForm,
  deleteGood,
  openPic,
  editGods,
};
