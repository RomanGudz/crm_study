'use strict';

const createRow = (obj) => {
  const tableBody = document.querySelector('.table__body');
  const firstRow = document.querySelector('.table__body tr:first-child');
  const newRow = firstRow.cloneNode(true);
  const newSpan = `<span class="table__cell-id">id: ${obj.id}</span>`
  newRow.querySelectorAll('.table__cell')[0].textContent = obj.id;
  newRow.querySelectorAll('.table__cell')[1].textContent = obj.title;
  newRow.querySelectorAll('.table__cell')[1].insertAdjacentHTML('afterbegin', newSpan)
  newRow.querySelectorAll('.table__cell')[2].textContent = obj.category;
  newRow.querySelectorAll('.table__cell')[3].textContent = obj.units;
  newRow.querySelectorAll('.table__cell')[4].textContent = obj.count;
  newRow.querySelectorAll('.table__cell')[5].textContent = `$${obj.price}`;
  newRow.querySelectorAll('.table__cell')[6].textContent = `$${obj.price * obj.count}`;
  console.log('getTableBody: ', tableBody);
  console.log(newRow.querySelectorAll('.table__cell')[1]);

  console.log('newRow: ', newRow);

  return tableBody.insertAdjacentElement('beforeend', newRow)
};

const renderGoods = (array) => {
  for (let i = 0; i < array.length; i++) {
    createRow(array[i]);
  };
};

const goods = [
  {
    "id": 1,
    "title": "Смартфон Xiaomi 11T 8/128GB",
    "price": 27000,
    "description": "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
    "category": "mobile-phone",
    "discont": false,
    "count": 3,
    "units": "шт",
    "images": {
      "small": "img/smrtxiaomi11t-m.jpg",
      "big": "img/smrtxiaomi11t-b.jpg"
    }
  },
  {
    "id": 2,
    "title": "Радиоуправляемый автомобиль Cheetan",
    "price": 4000,
    "description": "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
    "category": "toys",
    "discont": 5,
    "count": 1,
    "units": "шт",
    "images": {
      "small": "img/cheetancar-m.jpg",
      "big": "img/cheetancar-b.jpg"
    }
  },
  {
    "id": 3,
    "title": "ТВ приставка MECOOL KI",
    "price": 12400,
    "description": "Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D",
    "category": "tv-box",
    "discont": 15,
    "count": 4,
    "units": "шт",
    "images": {
      "small": "img/tvboxmecool-m.jpg",
      "big": "img/tvboxmecool-b.jpg"
    }
  },
  {
    "id": 4,
    "title": "Витая пара PROConnect 01-0043-3-25",
    "price": 22,
    "description": "Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.",
    "category": "cables",
    "discont": false,
    "count": 420,
    "units": "v",
    "images": {
      "small": "img/lan_proconnect43-3-25.jpg",
      "big": "img/lan_proconnect43-3-25-b.jpg"
    }
  }
]

renderGoods(goods);