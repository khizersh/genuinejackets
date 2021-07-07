const initialState = {
  favArray: [],
};
const favouriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Add_TO_FAV": {
      console.log("fav Added");
      if (state?.favArray?.find((x) => x.id === action.data.id)) {
        return state;
      }
      return { ...state, favArray: [...state.favArray, action.data] };
    }
    case "REMOVE_FROM_FAVOURITE": {
      let filtered = state.favArray.filter((x) => {
        return x.id !== action.data;
      });
      console.log(filtered);
      return { ...state, favArray: filtered };
    }
    case "EMPTY_FAVOURITES": {
      return { favArray: [] };
    }
    default:
      return state;
  }
};
export default favouriteReducer;
