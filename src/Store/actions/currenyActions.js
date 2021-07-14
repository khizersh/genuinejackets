export const change_curreny_type = (data) => {
  console.log(data);
  return {
    type: "CHANGE_CURRENCY_TYPE",
    data,
  };
};
