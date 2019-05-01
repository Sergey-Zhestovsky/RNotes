let init = {
  projects: []
};

export default function projectReducer(state = init, action) {
  switch (action.type) {
    case "CREATE_PROJECT":
      return {
        projects: [...state.projects, action.project]
      }

    case "GET_PROJECTS":
      return {
        projects: action.projects
      }

    default:
      break;
  }

  return state;
}