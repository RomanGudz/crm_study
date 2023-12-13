'use strict';

const getModalInput = (value) => document.getElementsByName(value);

const modalName = getModalInput('name');
const modalCategory = getModalInput('category');
const modalDiscount = getModalInput('discount');
const modalDiscountInput = getModalInput('discount_count');