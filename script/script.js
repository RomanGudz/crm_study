// const idModalRandom = document.querySelector('.vendor-code__id');
// const btnDelete = document.querySelectorAll('.table__btn_del');
// const tableBody = document.querySelector('.table__body');
// idModalRandom.textContent = randomNumber();




// const createRow = (obj, number) => {
//   const addTr = document.createElement('tr');
//   addTr.innerHTML = `
//   <td class="table__cell">${number + 1}</td>
//                 <td class="table__cell table__cell_left table__cell_name" data-id="${obj.id}">
//                   <span class="table__cell-id">id: ${obj.id}</span>
//                   ${obj.title}
//                 </td>
//                 <td class="table__cell table__cell_left">${obj.category}</td>
//                 <td class="table__cell">${obj.units}</td>
//                 <td class="table__cell">${obj.count}</td>
//                 <td class="table__cell">$${obj.price}</td>
//                 <td class="table__cell">$${obj.price * obj.count}</td>
//                 <td class="table__cell table__cell_btn-wrapper">
//                   <button class="table__btn table__btn_pic"></button>
//                   <button class="table__btn table__btn_edit"></button>
//                   <button class="table__btn table__btn_del"></button>
//                 </td>`;

//   return addTr;
// };


// btnDelete.forEach(del => {
//   del.addEventListener('click', e => {
//     const target = e.target;
//     const row = target.closest('tr');

//     if (row) {
//       const rowIndex = Array.from(row.parentNode.children).indexOf(row);
//       goods.splice(rowIndex, 1);
//       row.remove();
//       console.log(tableBody.textContent);
//       tableTotalPrice();
//     }
//   });
// });

// const addNewGoodPage = (good) => {
//   tableBody.append(createRow(good, (goods.length - 1)));
//   tableTotalPrice();
// };

{
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
      "id": 1,
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
      "id": 1,
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
      "id": 1,
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
  ];

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

  const activeDiscount = (modal) => {
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
  }

  const totalPriceForm = (modal) => {
    // const price = modal.querySelector('.modal__total-price');
    // console.log('price: ', price);
    // form.addEventListener('change', e => {
    //   form.total.value = `$  ${e.target.value * form.count.value}`;
    // });

    //   form.count.addEventListener('change', e => {
    //     form.total.value = `$ ${e.target.value * form.price.value}`;
    //   });
    // };
  };
  const submitForm = (modal) => {
    const discountCheckbox = document.getElementById('discount');
    const form = document.querySelector('.modal__form');
    modal.addEventListener('submit', e => {
      const target = e.target;
      e.preventDefault();
      const formData = new FormData(target);
      formData.set('discount', discountCheckbox.checked);
      formData.set('title', target.name.value);
      const newGood = Object.fromEntries(formData);
      goods.push(newGood);
      // addNewGoodPage(newGood);
      form.reset();
      document.querySelector('.overlay').classList.remove('active');
    });
  };

  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };
  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('cms__header');
    return header;
  };
  const createTitle = () => {
    const title = document.createElement('h1');
    title.classList.add('cms__title');
    title.textContent = 'CMS - ShopOnline';
    return title;
  };
  const totalPriceElem = (goods) => {
    const total = document.createElement('p');
    total.classList.add('cms__total');
    total.textContent = 'Итоговая стоимость: ';
    const span = document.createElement('span');
    span.classList.add('cms__total-price');
    span.textContent = `$ ${tableTotalPrice(goods)}`;
    total.append(span);
    return total;
  };

  const createInput = params => {
    const { className, type, id, name, placeholder } = params;
    const input = document.createElement('input');
    input.classList.add(className);
    const attributes = {
      type,
      ...(id && { id }),
      ...(name && { name }),
      ...(placeholder && { placeholder }),
    };
    for (const [key, value] of Object.entries(attributes)) {
      input.setAttribute(key, value);
    }
    return input;
  };

  const createLabel = params => {
    const { className, atributeFor, classNameSpan, spanText, } = params;
    const label = document.createElement('label');
    label.classList.add(...className);
    label.htmlFor = atributeFor;
    const span = document.createElement('span');
    span.classList.add(classNameSpan);
    span.textContent = spanText;
    label.append(span);
    return label;
  };
  const createButton = paramsClass => {
    const button = document.createElement('button');
    const { text, classTable, classButton } = paramsClass;
    const classBtn = {
      ...(classTable && { classTable }),
      classButton,
    }
    button.textContent = text ? text : '';
    for (const [_, value] of Object.entries(classBtn)) {
      button.classList.add(value);
    }

    return button;
  };

  const createLink = (classLink, link) => {
    const linkElem = document.createElement('a');
    linkElem.classList.add(classLink);
    linkElem.href = link;
    return linkElem;
  };

  const goodsPanel = () => {
    const panel = document.createElement('div');
    panel.classList.add('goods__panel', 'panel');

    const buttonFilter = createButton({
      text: 'Фильтр',
      classButton: 'panel__filter',
    });

    const buttonAddGood = createButton({
      text: 'Добавить товар',
      classButton: 'panel__add-goods',
    });

    const form = document.createElement('form');
    form.classList.add('panel__search');

    const input = createInput({
      className: 'panel__input',
      type: 'search',
      placeholder: 'Поиск по наименованию и категории',
    });
    form.append(input);
    panel.append(buttonFilter, form, buttonAddGood);
    return panel;
  };
  const createDivGoods = () => {
    const createDiv = document.createElement('div');
    createDiv.classList.add('cms__goods', 'goods');
    createDiv.append(goodsPanel());
    return createDiv;
  };
  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('goods__table', 'table');
    const thead = document.createElement('thead');
    thead.classList.add('table__header');
    thead.insertAdjacentHTML('beforeend', `
    <tr class="table__header-row">
                <th class="table__header-cell">№</th>
                <th class="table__header-cell table__header-cell_left">
                Наименование</th>
                <th class="table__header-cell table__header-cell_left">
                Категория</th>
                <th class="table__header-cell">ед/изм</th>
                <th class="table__header-cell">количество</th>
                <th class="table__header-cell">цена</th>
                <th class="table__header-cell">ИТОГ</th>
                <th></th>
              </tr>`);
    const tbody = document.createElement('tbody');
    tbody.classList.add('table__body');
    table.append(thead, tbody);
    return { table, tbody };
  };
  const createTableWrapper = () => {
    const createWrapper = document.createElement('div');
    createWrapper.classList.add('goods__table-wrapper');
    const { table, tbody } = createTable();
    createWrapper.append(table);
    return { createWrapper, tbody };
  };

  const createRow = (item, index) => {
    const tr = document.createElement('tr');
    const tdSerialNumber = document.createElement('td');
    tdSerialNumber.classList.add('table__cell');
    tdSerialNumber.textContent = `${index + 1}`;
    const tdID = document.createElement('td');
    tdID.classList.add('table__cell', 'table__cell_left', 'table__cell_name');
    tdID.setAttribute('dataId', randomNumber());
    tdID.textContent = item.title;
    const spanGood = document.createElement('span');
    spanGood.classList.add('table__cell-id');
    spanGood.textContent = `id: ${randomNumber()}`;
    tdID.prepend(spanGood);
    const tdTitle = document.createElement('td');
    tdTitle.classList.add('table__cell', 'table__cell_left');
    tdTitle.textContent = item.category;
    const tdUnits = document.createElement('td');
    tdUnits.classList.add('table__cell');
    tdUnits.textContent = item.units;
    const tdCount = document.createElement('td');
    tdCount.classList.add('table__cell');
    tdCount.textContent = item.count;
    const tdPrice = document.createElement('td');
    tdPrice.classList.add('table__cell');
    tdPrice.textContent = `$${item.price}`;
    const tdTotal = document.createElement('td');
    tdTotal.classList.add('table__cell');
    tdTotal.textContent = `$${item.price * item.count}`;
    const tdBtnWrapper = document.createElement('td');
    tdBtnWrapper.classList.add('table__cell', 'table__cell_btn-wrapper');
    const tdButtons = ['table__btn_pic', 'table__btn_edit', 'table__btn_del'];
    const buttons = tdButtons.map((elem) => {
      return createButton({
        classTable: 'table__btn',
        classButton: elem,
      });
    });
    tdBtnWrapper.append(...buttons);
    tr.append(
      tdSerialNumber,
      tdID,
      tdTitle,
      tdUnits,
      tdCount,
      tdPrice,
      tdTotal,
      tdBtnWrapper,
    );
    return tr;
  };
  const renderGoods = (array) => {
    const rows = array.map((item, index) => createRow(item, index));
    return rows;
  };
  const createSubPanel = () => {
    const subPanel = document.createElement('div');
    subPanel.classList.add('sub-panel');
    const choicePages = document.createElement('p');
    choicePages.classList.add('sub-panel__choice-pages');
    choicePages.textContent = 'Показывать на странице: 5';
    const pages = document.createElement('p');
    pages.classList.add('sub-panel__pages');
    pages.textContent = '1-10 из 48';
    subPanel.append(
      choicePages,
      pages,
      createLink('sub-panel__left', '#'),
      createLink('sub-panel__right', '#')
    );
    return subPanel;
  };
  const createFildset = () => {
    const fildset = document.createElement('fieldset');
    fildset.classList.add('modal__fieldset');
    const labelName = createLabel({
      className: ['modal__label', 'modal__label_name'],
      atributeFor: 'name',
      classNameSpan: 'modal__text',
      spanText: 'Наименование',
    });
    labelName.append(createInput({
      className: 'modal__input',
      type: 'text',
      name: 'name',
      id: 'name',
    }));
    const labelCategory = createLabel({
      className: ['modal__label', 'modal__label_category'],
      atributeFor: 'category',
      classNameSpan: 'modal__text',
      spanText: 'Категория',
    });
    labelCategory.append(createInput({
      className: 'modal__input',
      type: 'text',
      name: 'category',
      id: 'category',
    }));
    const labelDescription = createLabel({
      className: ['modal__label', 'modal__label_description'],
      atributeFor: 'description',
      classNameSpan: 'modal__text',
      spanText: 'Описание',
    });
    const textAreaDescription = document.createElement('textarea');
    textAreaDescription.classList.add('modal__input', 'modal__input_textarea');
    textAreaDescription.setAttribute('name', 'description');
    textAreaDescription.setAttribute('id', 'description');
    labelDescription.append(textAreaDescription);
    const labelUnits = createLabel({
      className: ['modal__label', 'modal__label_units'],
      atributeFor: 'units',
      classNameSpan: 'modal__text',
      spanText: 'Единицы измерения',
    });
    labelUnits.append(createInput({
      className: 'modal__input',
      type: 'text',
      name: 'units',
      id: 'units',
    }));
    const labelCount = createLabel({
      className: ['modal__label', 'modal__label_count'],
      atributeFor: 'count',
      classNameSpan: 'modal__text',
      spanText: 'Количество',
    });
    labelCount.append(createInput({
      className: 'modal__input',
      type: 'text',
      name: 'count',
      id: 'count',
    }));
    const labelPrice = createLabel({
      className: ['modal__label', 'modal__label_price'],
      atributeFor: 'price',
      classNameSpan: 'modal__text',
      spanText: 'Цена',
    });
    labelPrice.append(createInput({
      className: 'modal__input',
      type: 'text',
      name: 'price',
      id: 'price',
    }));
    const labelImage = createLabel({
      className: ['modal__label', 'modal__label_file'],
      atributeFor: 'image',
      classNameSpan: 'modal__text',
    });
    labelImage.textContent = 'Добавить изображение';
    labelImage.setAttribute('tabindex', 0);
    const inputImage = createInput({
      type: 'file',
      name: 'image',
      id: 'image',
    });
    inputImage.classList.add('modal__file', 'visually-hidden');
    inputImage.setAttribute('tabindex', -1);
    fildset.append(
      labelName,
      labelCategory,
      labelDescription,
      labelUnits,
      labelDiscount(),
      labelCount,
      labelPrice,
      labelImage,
      inputImage,
    );
    return fildset;
  };
  const labelDiscount = () => {
    const discount = document.createElement('div');
    discount.classList.add('modal__label', 'modal__label_discount');
    const label = createLabel({
      className: 'modal__text',
      atributeFor: 'discount',
    });
    label.textContent = 'Дисконт';
    const modalCheckbox = document.createElement('div');
    modalCheckbox.classList.add('modal__checkbox-wrapper');
    const inputDiscount = createInput({
      type: 'text',
      name: 'discount_count',
    });
    inputDiscount.classList.add('modal__input', 'modal__input_discount');
    inputDiscount.setAttribute('disabled', 'true');
    modalCheckbox.append(
      createInput({
        className: 'modal__checkbox',
        type: 'checkbox',
        id: 'discount',
        name: 'discount',
      }),
      inputDiscount,
    );
    discount.append(label, modalCheckbox);
    return discount;
  };
  const formGood = () => {
    const form = document.createElement('form');
    form.classList.add('modal__form');
    form.method = 'post';
    form.action = 'https://jsonplaceholder.typicode.com/posts';
    const modalFooter = document.createElement('div');
    modalFooter.classList.add('modal__footer');
    const labelFooter = document.createElement('lable');
    labelFooter.classList.add('modal__total');
    labelFooter.textContent = 'Итоговая стоимость: ';
    const totalPrice = document.createElement('output');
    totalPrice.classList.add('modal__total-price');
    totalPrice.setAttribute('name', 'total');
    totalPrice.textContent = `$ ${totalPriceForm()}`;
    labelFooter.append(totalPrice)
    modalFooter.append(labelFooter);
    const submitBtn = createButton({
      text: 'Добавить товар',
      classButton: 'modal__submit',
    });
    submitBtn.setAttribute('type', 'submit');
    form.append(createFildset(), modalFooter, submitBtn);
    return form;
  };

  const modalForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay', 'active');
    const modal = document.createElement('div');
    modal.classList.add('overlay__modal', 'modal');
    const buttonClose = createButton({
      classButton: 'modal__close',
    });
    buttonClose.innerHTML = `<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="m2 2 20 20M2 22 22 2" 
          stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        </svg>`;
    const modalTop = document.createElement('div');
    modalTop.classList.add('modal_top');
    modalTop.innerHTML = `<h2 class="modal__title">Добавить товар</h2>
        <div class="modal__vendor-code vendor-code">
          <p class="vendor-code__wrapper">id: <span class="vendor-code__id">
          ${randomNumber()}</span></p>
        </div>`;
    modal.append(buttonClose, modalTop, formGood());
    overlay.append(modal);
    return overlay;
  };
  const addNewGoodPage = (good) => {
    tableBody.append(createRow(good, (goods.length - 1)));
    tableTotalPrice();
  };
  const renderCMS = (app, goods) => {
    const container = createContainer();
    const header = createHeader();
    const title = createTitle();
    const total = totalPriceElem(goods);
    const divGoods = createDivGoods();
    const row = renderGoods(goods);
    const subPanel = createSubPanel();
    const modal = modalForm();
    const { createWrapper, tbody } = createTableWrapper();

    tbody.append(...row);
    divGoods.append(createWrapper, subPanel);
    header.append(title, total);
    container.append(header, divGoods);
    app.append(container);
    app.insertAdjacentElement('afterend', modal);
    return {
      container,
      header,
      title,
      tbody,
      modal,
    };
  };
  const initApp = (selectorApp) => {
    const app = document.querySelector(selectorApp);
    const cmsShop = renderCMS(app, goods);
    const { tbody, modal } = cmsShop;
    controlModal(modal);
    activeDiscount(modal);
    totalPriceForm(modal);
    submitForm(modal)
  };
  window.cmsInit = initApp;
}
