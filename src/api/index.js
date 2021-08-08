import axios from "axios";

// const BASE_URL = "https://jackter.herokuapp.com/api";
const BASE_URL = "http://147.182.178.140:9999/api";
// const BASE_URL = "http://localhost:9999/api";

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

export const getChildCategories = function (id) {
  return axios
    .get(BASE_URL + "/childCategory/parent/" + id)
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

export const getCategoryById = function (id) {
  return axios
    .get(BASE_URL + "/childCategory/" + id)
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
    .get(BASE_URL + "/checkout/" + id)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const stripeOrder = function (data) {
  return axios
    .post(BASE_URL + "/order/stripe", data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const searchProduct = function (search) {
  return axios
    .get(BASE_URL + "/search/" + search)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const getReviews = (id) => {
  console.log("Api Called", id);
  return axios
    .get(BASE_URL + "/review/product/" + id)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const postReview = function (body) {
  console.log("body***", body);
  return axios
    .post(BASE_URL + "/review", body)
    .then(function (response) {
      console.log(response)
      return response;
    })
    .catch(function (error) {
      console.log(error.message);
    });
};
