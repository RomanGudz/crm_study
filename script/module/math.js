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

export default {
  randomNumber,
  tableTotalPrice,
};
