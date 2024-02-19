import createElements from './createElements.js';
import control from './control.js';
const {
  createRow,
} = createElements;

const {
  openPic,
  deleteGood,
  editGods
} = control;

const search = (options) => {
  const {
    container,
    loadGods,
    tbody,
    modal,
  } = options;

  const input = container.querySelector('.panel__search');

  let timer;
  input.addEventListener('input', e => {
    const target = e.target;
    const requestText = target.value;
    const sendRequest = async () => {
      const { data } = await loadGods({ search: requestText });
      console.log('data: ', data);
      const row = data.goods.map((item, index) => {
        return createRow(item, index);
      });
      console.log(row);
      tbody.innerHTML = '';
      tbody.append(...row);
      openPic();
      deleteGood(data.goods, loadGods);
      editGods(modal, loadGods);
    };
    clearTimeout(timer);
    timer = setTimeout(sendRequest, 300);
  });
};

export default { search };
