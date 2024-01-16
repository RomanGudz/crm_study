// const form = document.querySelector('.modal__form');
// const discountCheckbox = document.getElementById('discount');
// form.total.value = '$ 0'
// form.count.setAttribute('type', 'number');
// form.price.setAttribute('type', 'number');
// form.name.setAttribute('required', 'required');
// form.category.setAttribute('required', 'required');
// form.description.setAttribute('required', 'required');
// form.units.setAttribute('required', 'required');
// form.count.setAttribute('required', 'required');
// form.price.setAttribute('required', 'required');

// form.addEventListener('submit', e => {
//   e.preventDefault();
//   const formData = new FormData(e.target);
//   formData.set('discount', discountCheckbox.checked);
//   formData.set('title', form.name.value);
//   const newGood = Object.fromEntries(formData);
//   goods.push(newGood);
//   addNewGoodPage(newGood);
//   form.reset();
//   document.querySelector('.overlay').classList.remove('active');
// });

// form.price.addEventListener('change', e => {
//   form.total.value = `$  ${e.target.value * form.count.value}`;
// });

// form.count.addEventListener('change', e => {
//   form.total.value = `$ ${e.target.value * form.price.value}`;
// });