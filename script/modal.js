'use strict';

const modalName = document.querySelector('#name');
const modalCategory = document.querySelectorAll('.modal__form');
const modalDiscount = document.querySelector('#discount');
const modalDiscountInput = document.querySelector('.modal__input_discount');

const btnAddGood = document.querySelector('.panel__add-goods');
const modal = document.querySelector('.overlay');
const btnClose = document.querySelector('.modal__close');

const openModal = () => {
  modal.classList.add('active');
};

const closeModal = () => {
  modal.classList.remove('active');
};
btnAddGood.addEventListener('click', openModal);

modal.addEventListener('click', e => {
  const target = e.target;
  if (target === modal || target.closest('.modal__close')) {
    closeModal()
  };
});



modalDiscount.addEventListener('click', () => {
  if (modalDiscount.checked) {
    modalDiscountInput.removeAttribute('disabled');
  }
  else {
    modalDiscountInput.value = '';
    modalDiscountInput.setAttribute('disabled', 'disabled');
  }

})