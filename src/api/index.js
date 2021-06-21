import axios from "axios";

const BASE_URL = "https://jackter.herokuapp.com/api";

export const getMainBanner = function () {
  return axios
    .get(BASE_URL + "/banner")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getAllBrands = function () {
  return axios
    .get(BASE_URL + "/brand")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getParentCategories = function () {
  return axios
    .get(BASE_URL + "/parentCategory")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getChildCategories = function () {
  return axios
    .get(BASE_URL + "/childCategory")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getParentCategoriesWithChild = function () {
  return axios
    .get(BASE_URL + "/parentCategory/withChild")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getAllProducts = function () {
  return axios
    .get(BASE_URL + "/product")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const getSectionProducts = function () {
  return axios
    .get(BASE_URL + "/section")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const getProductsByCategory = function (slug) {
  return axios
    .get(BASE_URL + "/product/category/" + slug)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getProductById = function (slug) {
  return axios
    .get(BASE_URL + "/product/detail/" + slug)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getPriceByAttruibute = function (body) {
  return axios
    .post(BASE_URL + "/price-attribute/price", body)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const onRegister = function (body) {
  return axios.post(BASE_URL + "/user/process_register", body);
};

export const onLogin = function (body) {
  return axios.post(BASE_URL + "/login", body);
};

export const onVerify = function (body) {
  return axios.post(BASE_URL + "/user/verify", body);
};

export const validateCoupon = function (coupon) {
  return axios
    .post(BASE_URL + "/coupon/validate/" + coupon)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error.message);
    });
};

export const checkout = function (body) {
  return axios
    .post(BASE_URL + "/checkout", body)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error.message);
    });
};

export const getUserCoupons = function (slug) {
  return axios
    .get(BASE_URL + "/assign-coupon/user/" + slug)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const getUserOrders = function (slug) {
  return axios
    .get(BASE_URL + "/order/user/" + slug)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getOrderDetail = function (id) {
  return axios
    .get(BASE_URL + "/order/detail/" + id)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
