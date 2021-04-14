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

export const getProductById = function (id) {
  return axios
    .get(BASE_URL + "/product/detail/" + id)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
