export const initialState = {
  marked_fav: localStorage.getItem("fav_location") ? JSON.parse(localStorage.getItem("fav_location")) : [],
  curr_Location: localStorage.getItem("curr_location") ? JSON.parse(localStorage.getItem("curr_location")) : []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FAV_LOCATION":
      const newlocation = [...state.marked_fav]
      for (let i = 0; i < newlocation.length; i++) {
        if (newlocation[i].id === action.values.id) {
          return { ...state }
        }
      }
      newlocation.push(action.values)
      localStorage.setItem("fav_location", JSON.stringify(newlocation))
      return { ...state, marked_fav: newlocation }
    case "ADD_CURR_LOCATION":
      localStorage.setItem("curr_location", JSON.stringify(action.values))
      return { ...state, curr_Location: [action.values] };
    case "REMOVE_FROM_FAV":
      let newFav = [...state.marked_fav];
      console.log(action.id);
      for (let i = 0; i < newFav.length; i++) {
        if (newFav[i].id === action.values) {
          newFav.splice(i, 1);
          break;
        }
      }
      localStorage.setItem("fav_location", JSON.stringify(newFav))
      return { ...state, marked_fav: newFav }
    default:
      return { ...state };
  }
};

export default reducer;
