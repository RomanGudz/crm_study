import createElements from "./createElements.js";
const {
  renderGoods
} = createElements;

const search = (options) => {
  const {
    container,
    loadGods,
    tbody,
  } = options;

  const input = container.querySelector('.panel__search');

  let timer;
  input.addEventListener('input', e => {
    const target = e.target;
    const requestText = target.value;
    const sendRequest = async () => {
      const data = await loadGods({ search: requestText });
      tbody.innerHTML = '';
      tbody.append(...renderGoods(data.goods));
    };
    clearTimeout(timer);
    timer = setTimeout(sendRequest, 300);
  });
};

export default { search };
