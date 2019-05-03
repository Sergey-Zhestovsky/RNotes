let init = {
  projects: [],
  time: null,
  allLoaded: null,
  error: null
};

export default function projectReducer(state = init, action) {
  switch (action.type) {
    case "CREATE_PROJECT":
      return {
        ...state,
        projects: [action.result.project, ...state.projects],
        time: action.result.time
      }

    case "INIT_PROJECTS":
      return {
        ...state,
        projects: action.result.projects.result,
        time: action.result.time,
        allLoaded: action.result.projects.isAllLoaded
      }

    case "GET_PROJECTS":
      return {
        ...state,
        projects: [...state.projects, ...action.result.projects.result],
        time: action.result.time,
        allLoaded: action.result.projects.isAllLoaded
      }

    case "CLEAR_PROJECTS":
      return init;

    default:
      break;
  }

  return state;
}