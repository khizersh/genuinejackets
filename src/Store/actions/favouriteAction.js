export const add_to_favourite = (data) => {
  console.log(data);
  return {
    type: "Add_TO_FAV",
    data,
  };
};
export const remove_from_favourite = (data) => {
    console.log("remo")
  return {
    type: "REMOVE_FROM_FAVOURITE",
    data,
  };
};

export const empty_favourite = () => {
  return {
    type: "EMPTY_FAVOURITES",
  };
};
