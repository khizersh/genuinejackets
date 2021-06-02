export const sign_In_User = (data) => {
  return {
    type: "sign_In_User",
    data,
  };
};

export const sign_Out_User = (data) => {
  return {
    type: "sign_Out_User"
  };
};
