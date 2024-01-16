import math from './math.js';
import createElements from './createElements.js';
const {
  tableTotalPrice,
} = math;
const {
  createRow,
} = createElements;
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
const addNewGoodPage = (goods, newGood, tableBody) => {
  tableBody.append(createRow(newGood, (goods.length - 1)));
  console.log('goods: ', goods);
  tableTotalPrice(goods);
};
const submitForm = (modal, tbody, goods) => {
  const discountCheckbox = document.getElementById('discount');
  const form = document.querySelector('.modal__form');
  form.price.addEventListener('change', e => {
    form.total.value = `$ ${e.target.value * form.count.value}`;
  });

  form.count.addEventListener('change', e => {
    form.total.value = `$ ${e.target.value * form.price.value}`;
  });
  modal.addEventListener('submit', e => {
    const target = e.target;
    e.preventDefault();
    const formData = new FormData(target);
    formData.set('discount', discountCheckbox.checked);
    formData.set('title', target.name.value);
    const newGood = Object.fromEntries(formData);
    goods.push(newGood);
    addNewGoodPage(goods, newGood, tbody);
    form.reset();
    document.querySelector('.overlay').classList.remove('active');
  });
};
const deleteGood = (goods) => {
  const btnDelete = document.querySelectorAll('.table__btn_del');
  btnDelete.forEach(del => {
    del.addEventListener('click', e => {
      const target = e.target;
      const row = target.closest('tr');
      if (row) {
        const rowIndex = Array.from(row.parentNode.children).indexOf(row);
        goods.splice(rowIndex, 1);
        const total = document.querySelector('.cms__total-price');
        total.textContent = `$ ${tableTotalPrice(goods)}`;
        row.remove();
      }
    });
  });
};


export default {
  controlModal,
  activeDiscount,
  submitForm,
  deleteGood,
};
