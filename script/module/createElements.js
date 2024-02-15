import math from './math.js';
import data from './data.js';
const {
  randomNumber,
} = math;

const {
  totalPriceGoods,
  getCategory,
} = data;

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
const totalPriceElem = () => {
  const total = document.createElement('p');
  total.classList.add('cms__total');
  total.textContent = 'Итоговая стоимость: ';
  const span = document.createElement('span');
  span.classList.add('cms__total-price');
  const totalPrice = totalPriceGoods();
  totalPrice.then((data) => {
    span.textContent = `$ ${data}`;
  });
  total.append(span);
  return total;
};
const createInput = params => {
  const { className, type, id, name, placeholder, required, list } = params;
  const input = document.createElement('input');
  input.classList.add(className);
  const attributes = {
    type,
    ...(id && { id }),
    ...(name && { name }),
    ...(placeholder && { placeholder }),
    ...(required && { required }),
    ...(list && { list }),
  };
  for (const [key, value] of Object.entries(attributes)) {
    input.setAttribute(key, value);
  }
  return input;
};

const createLabel = params => {
  const { className, atributeFor, classNameSpan, spanText } = params;
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
  };
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
  tdID.setAttribute('dataId', item.id);
  tdID.textContent = item.title;
  const spanGood = document.createElement('span');
  spanGood.classList.add('table__cell-id');
  spanGood.textContent = `id: ${item.id}`;
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
  const buttons = tdButtons.map((elem) => createButton({
    classTable: 'table__btn',
    classButton: elem,
  }));
  buttons[0].setAttribute('data-pic', item.image);

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
    createLink('sub-panel__right', '#'),
  );
  return subPanel;
};

const optionsSelect = async () => {
  const selectCategory = document.createElement('datalist');
  selectCategory.setAttribute('id', 'category-list');
  const data = await getCategory();
  const options = data.map((item) => {
    const createOption = document.createElement('option');
    createOption.value = item;
    return createOption;
  });
  selectCategory.append(...options);
  return new Promise((resolve) => {
    resolve(selectCategory);
  });
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
    name: 'title',
    id: 'title',
    required: 'required',
  }));
  const labelCategory = createLabel({
    className: ['modal__label', 'modal__label_category'],
    atributeFor: 'category',
    classNameSpan: 'modal__text',
    spanText: 'Категория',
  });
  const inputCategory = createInput({
    className: 'modal__input',
    type: 'text',
    name: 'category',
    id: 'category',
    required: 'required',
    list: 'category-list',
  });
  optionsSelect().then((result) => {
    labelCategory.append(result);
  });
  labelCategory.append(inputCategory);
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
  textAreaDescription.setAttribute('required', 'required');
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
    required: 'required',
  }));
  const labelCount = createLabel({
    className: ['modal__label', 'modal__label_count'],
    atributeFor: 'count',
    classNameSpan: 'modal__text',
    spanText: 'Количество',
  });
  labelCount.append(createInput({
    className: 'modal__input',
    type: 'number',
    name: 'count',
    id: 'count',
    required: 'required',
  }));
  const labelPrice = createLabel({
    className: ['modal__label', 'modal__label_price'],
    atributeFor: 'price',
    classNameSpan: 'modal__text',
    spanText: 'Цена',
  });
  labelPrice.append(createInput({
    className: 'modal__input',
    type: 'number',
    name: 'price',
    id: 'price',
    required: 'required',
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
    modalImg(),
    errorAddImg(),
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
  // form.method = 'post';
  // form.action = 'https://jsonplaceholder.typicode.com/posts';
  const modalFooter = document.createElement('div');
  modalFooter.classList.add('modal__footer');
  const labelFooter = document.createElement('lable');
  labelFooter.classList.add('modal__total');
  labelFooter.textContent = 'Итоговая стоимость: ';
  const totalPrice = document.createElement('output');
  totalPrice.classList.add('modal__total-price');
  totalPrice.setAttribute('name', 'total');
  totalPrice.textContent = '$ 0';
  labelFooter.append(totalPrice);
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
  overlay.classList.add('overlay');
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

const modalImg = () => {
  const createImg = document.createElement('img');
  createImg.classList.add('image-container');
  return createImg;
};

const errorAddImg = () => {
  const p = document.createElement('p');
  p.classList.add('err-add-image');
  p.textContent = 'Изображение не должно превышать размер 1 Мб';
  return p;
};

const deleteModal = (id) => {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'active');
  const modal = document.createElement('div');
  modal.classList.add('overlay__modal', 'modal');
  const buttonExit = createButton({
    classButton: 'modal__close',
  });
  buttonExit.innerHTML = `<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="m2 2 20 20M2 22 22 2" 
          stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        </svg>`;

  const modalTop = document.createElement('div');
  modalTop.classList.add('modal_top');
  modalTop.innerHTML = `<h4 class="modal__title-delete">
  Вы уверены что хотите удалить товар с id: ${id} ?</h4>`;

  const btnDelete = createButton({
    classButton: 'modal__delete',
    text: 'Удалить товар',
  });
  const buttonClose = createButton({
    classButton: 'modal__close-btn',
    text: 'Закрыть',
  });
  modal.append(buttonExit, modalTop, btnDelete, buttonClose);
  overlay.append(modal);
  document.body.append(overlay);
  return new Promise((resolve) => {
    btnDelete.addEventListener('click', () => {
      resolve(true);
    });
    buttonClose.addEventListener('click', () => {
      overlay.classList.remove('active');
      resolve(false);
    });
    buttonExit.addEventListener('click', () => {
      overlay.classList.remove('active');
      resolve(false);
    });
  });
};

const modalError = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'active');
  const modal = document.createElement('div');
  modal.classList.add('overlay__modal', 'modal');
  const buttonExit = createButton({
    classButton: 'modal__close',
  });
  buttonExit.innerHTML = `<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="m2 2 20 20M2 22 22 2" 
          stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        </svg>`;

  const modalTop = document.createElement('div');
  modalTop.classList.add('modal_top');
  modalTop.innerHTML = `<h4 class="modal__title-delete">
  Что-то пошло не так попробуйте еще раз...</h4>`;

  modal.append(buttonExit, modalTop);
  overlay.append(modal);
  document.body.append(overlay);
  return new Promise((resolve) => {
    buttonExit.addEventListener('click', () => {
      overlay.classList.remove('active');
      resolve(false);
    });
  });
};

export default {
  createContainer,
  createHeader,
  createTitle,
  totalPriceElem,
  createDivGoods,
  createTableWrapper,
  renderGoods,
  createSubPanel,
  modalForm,
  createRow,
  deleteModal,
  modalError,
};
