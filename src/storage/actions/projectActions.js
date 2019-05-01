export function createProject(project) {
  return (dispatch, getState, { projectConnector }) => {
    projectConnector.setProject(project)
      .then((result) => {
        dispatch({
          type: "CREATE_PROJECT",
          project: result
        });
      })
      .catch(error => console.error(error))
  }
}

export function getProjects() {
  return (dispatch, getState, { projectConnector }) => {
    projectConnector.getProjects()
      .then((result) => {
        console.log(result);
        
        dispatch({
          type: "GET_PROJECTS",
          projects: result
        });
      })
      .catch(error => console.error(error))
  }
}