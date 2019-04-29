export function createProject(project) {
  return (dispatch, getState, { projectConnector }) => {
    console.log(project);

    projectConnector.setProject(project)
      .then((result) => {
        console.log(result);
        dispatch({
          type: "CREATE_PROJECT",
          project: result
        });
      })
      .catch(error => console.error(error))
  }
}