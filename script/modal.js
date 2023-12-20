'use strict';

const modalName = document.querySelector('#name');
const modalCategory = document.querySelectorAll('.modal__form');
const modalDiscount = document.querySelector('#discount');
const modalDiscountInput = document.querySelector('.modal__input_discount');

const btnAddGood = document.querySelector('.panel__add-goods');
const modal = document.querySelector('.overlay');
const btnClose = document.querySelector('.modal__close');

btnAddGood.addEventListener('click', () => {
  modal.classList.add('active');
});

modal.addEventListener('click', e => {
  const target = e.target;
  if (target === modal || target.closest('.modal__close')) {
    modal.classList.remove('active');
  };
});