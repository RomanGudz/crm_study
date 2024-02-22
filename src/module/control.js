import createElements from './createElements.js';
import data from './data.js';
import math from './math.js';

const {
  deleteModal,
  totalPriceElem,
  modalError,
  createRow,
  regExpNotImg,
} = createElements;

const {
  toBase64,
  loadGods,
} = data;

const {
  randomNumber,
} = math;




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


let submit = null;

const submitForm = (good = undefined) => {
  const discountCheckbox = document.getElementById('discount');
  const form = document.querySelector('.modal__form');
  const tableBody = document.querySelector('.table__body');
  const errImg = document.querySelector('.err-add-image');
  const img = document.querySelector('.image-container');
  const id = document.querySelector('.vendor-code__id');
  form.price.addEventListener('change', e => {
    form.total.value = `$ ${e.target.value * form.count.value}`;
  });

  form.count.addEventListener('change', e => {
    form.total.value = `$ ${e.target.value * form.price.value}`;
  });

  form.image.addEventListener('change', () => {
    const image = form.image.files[0];
    console.log('form.image.files[0]: ', form.image.files[0]);
    if (image.size > 1000000) {
      errImg.style.display = 'block';
      img.style.display = 'none';
    } else {
      img.src = URL.createObjectURL(image);
      errImg.style.display = 'none';
      img.style.display = 'block';
    }
  });
  if (submit) {
    submit = null;
  } else {
    form.addEventListener('submit', (e) => {
      submit({ e, good, discountCheckbox, tableBody, id, form });
    });
  }
  submit = async (options) => {
    const {
      e, good, discountCheckbox, tableBody, id, form
    } = options;
    const target = e.target;
    e.preventDefault();
    const formData = new FormData(target);
    formData.set('discount', discountCheckbox.checked);
    const newGood = Object.fromEntries(formData);
    console.log('newGood: ', newGood);
    if (form.image.files.length > 0) {
      const imgTobase64 = await toBase64(newGood.image);
      newGood.image = imgTobase64;
    }
    if (good) {
      newGood.image = good.image;
    }
    if (good) {
      await loadGods({
        id: good.id,
        requestMethod: 'PATCH',
        requestBody: newGood,
      });
      const { data } = await loadGods({});
      console.log('data: ', data);
      upDateRow(data.goods, tableBody);
    } else {
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
        if (data.goods) {
          console.log('data: ', data.goods);
          addNewGoodPage(data.goods, tableBody);
        }
      }
    }
    form.reset();
    document.querySelector('.overlay').classList.remove('active');
  };
};

const deleteGood = (goods) => {
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
          await loadGods({ id: goodId, requestMethod: 'DELETE' });
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

const editGods = () => {
  const editBtn = document.querySelectorAll('.table__btn_edit');
  const idGood = document.querySelector('.vendor-code__id');
  const formModal = document.querySelector('.modal__form');
  const modal = document.querySelector('.overlay');
  const img = document.querySelector('.image-container');
  editBtn.forEach((button) => {
    button.addEventListener('click', async e => {
      const target = e.target;
      const tr = target.closest('tr');
      const goodId = tr.children[1].getAttribute('dataid');
      const good = await loadGods({ id: goodId });
      idGood.textContent = goodId;
      formModal.title.value = good.title;
      formModal.category.value = good.category;
      formModal.description.value = good.description;
      formModal.units.value = good.units;
      formModal.count.value = good.count;
      formModal.price.value = good.price;

      if (regExpNotImg.test(good.image)) {
        img.style.display = 'none';
      } else {
        img.style.display = 'block';
        img.src = `http://localhost:3000/${good.image}`;
      }

      formModal.total.value = `$${good.count * good.price}`;
      modal.classList.add('active');
      submitForm(good);
    });
  });
};

const controlModal = (modal) => {
  const form = modal.querySelector('.modal__form');
  const id = modal.querySelector('.vendor-code__id');
  const img = modal.querySelector('.image-container');
  const openModal = () => {
    form.reset();
    img.style.display = 'none';
    id.textContent = randomNumber();
    modal.classList.add('active');
    submitForm();
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

const addNewGoodPage = (goods, tableBody) => {
  const newGood = goods.slice(-1);
  tableBody.append(createRow(...newGood, (goods.length - 1)));
  console.log('newGood: ', newGood);
  deleteGood(newGood);
  openPic();
  editGods();
  totalPriceElem();
};

const upDateRow = (goods, tbody) => {
  const row = goods.map((item, index) => createRow(item, index));
  tbody.innerHTML = '';
  tbody.append(...row);
  openPic();
  deleteGood(goods);
  editGods();
};

export default {
  controlModal,
  activeDiscount,
  submitForm,
  deleteGood,
  openPic,
  editGods,
  upDateRow,
};
