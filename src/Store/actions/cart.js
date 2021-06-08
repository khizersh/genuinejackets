export const add_to_cart = (data) => {
  return {
    type: "Add_TO_CART",
    data,
  };
};
export const remove_from_cart = (data) => {
  return {
    type: "REMOVE_FROM_CART",
    data,
  };
};
export const update_cart = (data) => {
  console.log(data)
  return {
    type: "UPDATE_CART",
    data:data,
  };
};
export const confirm_Checkout = (data) => {
  console.log(data)
  return {
    type: "CONFIRM_CHECKOUT",
    data:data,
  };
};
