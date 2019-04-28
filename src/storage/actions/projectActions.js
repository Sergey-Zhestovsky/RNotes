export function createProject(project) {
  return (dispatch, getState, { projectConnector }) => {
    console.log(project);

    projectConnector.setProject(project)
      .then((result) => {
        console.log(result);
      }, rej => console.log(rej))

    dispatch({
      type: "CREATE_PROJECT",
      project
    });
  }
}