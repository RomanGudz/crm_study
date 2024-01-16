import createElements from './createElements.js';
const {
  createContainer,
  createHeader,
  createTitle,
  totalPriceElem,
  createDivGoods,
  renderGoods,
  createSubPanel,
  modalForm,
  createTableWrapper,
} = createElements;

export const renderCMS = (app, goods) => {
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
