export function createProject(project) {
  return (dispatch, getState, { projectConnector }) => {
    projectConnector.setProject(project)
      .then((result) => {
        let time = getState().project.time;

        if (time < result.time)
          return dispatch({
            type: "CREATE_PROJECT",
            result
          });
      })
      .catch(error => console.error(error))
  }
}

export function initProjects({ length = 5 } = {}) {
  return (dispatch, getState, { projectConnector }) => {
    projectConnector.getProjects({ length })
      .then((result) => {
        let time = getState().project.time;

        if (time < result.time)
          return dispatch({
            type: "INIT_PROJECTS",
            result
          });
      })
      .catch(error => console.error(error))
  }
}

export function getProjects({ length = 5 } = {}) {
  return (dispatch, getState, { projectConnector }) => {
    if (getState().project.allLoaded)
      return;

    let projects = getState().project.projects,
      lastProject = projects.length > 0
        ? projects[projects.length - 1].date
        : null;

    projectConnector.getProjects({ length, paddingByProjectDate: lastProject })
      .then((result) => {
        return dispatch({
          type: "GET_PROJECTS",
          result
        });
      })
      .catch(error => console.error(error))
  }
}