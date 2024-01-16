const randomNumber = () => {
  const min = 100000000000;
  const max = 999999999999;

  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const tableTotalPrice = (goods) => {
  let total = 0;
  goods.forEach((item) => {
    const totalGood = item.price * item.count;
    total += totalGood;
  });
  return total;
};
const totalPriceForm = (modal) => {
  const price = modal.querySelector('.modal__total-price');
  console.log('price: ', price);
  // console.log('price: ', price);
  // form.addEventListener('change', e => {
  //   form.total.value = `$  ${e.target.value * form.count.value}`;
  // });

  //   form.count.addEventListener('change', e => {
  //     form.total.value = `$ ${e.target.value * form.price.value}`;
  //   });
};

export default {
  randomNumber,
  tableTotalPrice,
  totalPriceForm,
};
