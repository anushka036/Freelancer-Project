export const INITIAL_STATE = {
  userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
  companyName: JSON.parse(localStorage.getItem("currentUser"))?.username,
  stipend: "",
  position: "",
  location: "",
  jobType: "",
  about: "",
  requirement: "",
  condition: "",
  noOfopening: 0,
  duration: 0,
  lastDate: "",
  skills: [],
};

export const jobReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "ADD_SKILLS":
      return {
        ...state,
        skills: [...state.skills, action.payload],
      };
    case "REMOVE_SKILLS":
      return {
        ...state,
        skills: state.skills.filter(
          (skill) => skill !== action.payload
        ),
      };

    default:
      return state;
  }
};
