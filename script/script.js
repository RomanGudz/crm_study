'use strict';

const form = document.querySelector('.modal__form');
const discountCheckbox = document.getElementById('discount');
form.total.value = '$ 0'
form.count.setAttribute('type', 'number');
form.price.setAttribute('type', 'number');
form.name.setAttribute('required', 'required');
form.category.setAttribute('required', 'required');
form.description.setAttribute('required', 'required');
form.units.setAttribute('required', 'required');
form.count.setAttribute('required', 'required');
form.price.setAttribute('required', 'required');
const randomNumber = () => {
  const min = 100000000000;
  const max = 999999999999;

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const idModalRandom = document.querySelector('.vendor-code__id')
idModalRandom.textContent = randomNumber();

const tableTotalPrice = () => {
  const totalPrice = document.querySelector('.cms__total-price');
  let total = 0;
  goods.forEach((item) => {
    const totalGood = item.price * item.count;
    total += totalGood;
  })
  totalPrice.textContent = `$ ${total}`;
};

const createRow = (obj, number) => {
  const addTr = document.createElement('tr');
  addTr.innerHTML = `
  <td class="table__cell">${number + 1}</td>
                <td class="table__cell table__cell_left table__cell_name" data-id="${obj.id}">
                  <span class="table__cell-id">id: ${obj.id}</span>
                  ${obj.title}
                </td>
                <td class="table__cell table__cell_left">${obj.category}</td>
                <td class="table__cell">${obj.units}</td>
                <td class="table__cell">${obj.count}</td>
                <td class="table__cell">$${obj.price}</td>
                <td class="table__cell">$${obj.price * obj.count}</td>
                <td class="table__cell table__cell_btn-wrapper">
                  <button class="table__btn table__btn_pic"></button>
                  <button class="table__btn table__btn_edit"></button>
                  <button class="table__btn table__btn_del"></button>
                </td>`;

  return addTr;
};
const tableBody = document.querySelector('.table__body');

const renderGoods = (array) => {
  array.forEach((item, index) => {
    const newRow = createRow(item, index);
    tableBody.appendChild(newRow);
  });
};

const goods = [
  {
    "id": randomNumber(),
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
    "id": randomNumber(),
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
    "id": randomNumber(),
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
    "id": randomNumber(),
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

const btnDelete = document.querySelectorAll('.table__btn_del');

btnDelete.forEach(del => {
  del.addEventListener('click', e => {
    const target = e.target;
    const row = target.closest('tr');

    if (row) {
      const rowIndex = Array.from(row.parentNode.children).indexOf(row);
      goods.splice(rowIndex, 1);
      row.remove();
      console.log(tableBody.textContent);
      tableTotalPrice();
    }
  });
});

const addNewGoodPage = (good) => {
  tableBody.append(createRow(good, (goods.length - 1)));
  tableTotalPrice();
};


form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  formData.set('discount', discountCheckbox.checked);
  formData.set('title', form.name.value);
  const newGood = Object.fromEntries(formData);
  goods.push(newGood);
  addNewGoodPage(newGood);
  form.reset();
  document.querySelector('.overlay').classList.remove('active');
});

form.price.addEventListener('change', e => {
  form.total.value = `$ ${e.target.value * form.count.value}`;
});

form.count.addEventListener('change', e => {
  form.total.value = `$ ${e.target.value * form.price.value}`;
});

tableTotalPrice();

