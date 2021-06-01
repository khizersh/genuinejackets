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
  return axios
    .post(BASE_URL + "/price-attribute/price", body)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};