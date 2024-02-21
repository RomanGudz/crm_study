import * as render from './module/render.js';
import data from './module/data.js';
import control from './module/control.js';
import searchGoods from './module/searchGoods.js';

import './index.html';
import './scss/index.scss';

const {
  controlModal,
  activeDiscount,
  deleteGood,
  openPic,
  editGods,
} = control;

const {
  loadGods,
} = data;

const {
  search,
} = searchGoods;

{
  const initApp = async (selectorApp) => {
    const { data } = await loadGods({});
    const app = document.querySelector(selectorApp);
    const cmsShop = render.renderCMS(app, data.goods);
    const { tbody, modal, container } = cmsShop;
    controlModal(modal);
    activeDiscount(modal);
    deleteGood(data.goods);
    openPic();
    editGods();
    search({ container, loadGods, tbody });
  };
  window.cmsInit = initApp;
}
