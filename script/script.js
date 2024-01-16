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
