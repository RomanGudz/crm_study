/* eslint-disable max-len */

const loadGods = async ({
  id,
  requestMethod = 'GET',
  requestBody = undefined,
  search = undefined,

}, callback) => {
  let URL = 'http://localhost:3000/api/goods?page=2';
  try {
    if (id) {
      URL = `http://localhost:3000/api/goods/${id}`;
    }
    if (search) {
      URL = `http://localhost:3000/api/goods?page=1&search=${search}`;
    }
    const response = await fetch(`${URL}`, {
      method: requestMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    if (response.ok) {
      const data = await response.json();
      if (id) return data;
      return { data, response };
    }
    throw new Error(response);
  } catch (error) {
    callback(error);
  }
};

const totalPriceGoods = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/total', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

const getCategory = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

const toBase64 = async file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    resolve(reader.result);
  });

  reader.addEventListener('error', error => {
    reject(error);
  });
  reader.readAsDataURL(file);
});

export default {
  loadGods,
  toBase64,
  totalPriceGoods,
  getCategory,
};
