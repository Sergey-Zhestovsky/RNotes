export function signUp(user) {
  return (dispatch, getState, { userConnector }) => {
    userConnector.setUser(user)
      .then(result => {
        dispatch({
          type: "SIGNUP_SUCCES",
          user: result
        });
      })
      .catch(error => {
        dispatch({
          type: "SIGNUP_ERROR",
          error
        });
      });
  }
}

export function signOut() {
  return (dispatch, getState, { userConnector }) => {
    userConnector.logout()
      .then(result => {
        dispatch({
          type: "SIGNOUT_SUCCES"
        });
      })
      .catch(error => {
        dispatch({
          type: "SIGNOUT_ERROR",
          error
        });
      });
  }
}

export function signIn(user) {
  return (dispatch, getState, { userConnector }) => {
    userConnector.login(user)
      .then(result => {
        dispatch({
          type: "SIGNIN_SUCCES",
          user: result
        });
      })
      .catch(error => {
        console.log(error);
        
        dispatch({
          type: "SIGNIN_ERROR",
          error
        });
      });
  }
}