export function createProject(project) {
  return (dispatch, getState, { projectConnector }) => {
    console.log(getState());
    
    projectConnector.getProjects()
      .then((result) => {
        console.log(result);
      }, rej => console.log(rej))

    dispatch({
      type: "CREATE_PROJECT",
      project
    });
  }
}