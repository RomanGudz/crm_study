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
import * as render from './module/render.js';
import data from './module/data.js';
import control from './module/control.js';

const {
  controlModal,
  activeDiscount,
  submitForm,
  deleteGood,
} = control;
{
  const initApp = (selectorApp) => {
    const app = document.querySelector(selectorApp);
    const cmsShop = render.renderCMS(app, data.goods);
    const { tbody, modal } = cmsShop;
    controlModal(modal);
    activeDiscount(modal);
    deleteGood(data.goods);
    submitForm(modal, tbody, data.goods);
  };
  window.cmsInit = initApp;
}
