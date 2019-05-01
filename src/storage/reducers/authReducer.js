const TOKEN_NAME = "session_token";

let init = {
  isAuthorize: false,
  token: null,
  user: null,
  error: {
    signUp: null,
    signOut: null,
    signIn: null
  }
};

init = initAuth(init);

function initAuth(state) {
  let token = getAuthorizeToken();

  if (token)
    return state = {
      ...state,
      token,
      isAuthorize: true
    }

  return state;
}

function getAuthorizeToken(tokenName = TOKEN_NAME) {
  return getCookie(tokenName);
}

function getCookie(name) {
  let value = "; " + document.cookie,
    parts = value.split("; " + name + "=");

  if (parts.length == 2)
    return parts.pop().split(";").shift();

  return false;
}

export default function authReducer(state = init, action) {
  switch (action.type) {
    case "SIGNUP_SUCCES":
      return {
        ...state,
        isAuthorize: true,
        error: {
          ...state.error,
          signUp: null,
          signOut: null,
          signIn: null
        }
      };
    case "SIGNUP_ERROR":
      return {
        ...state,
        error: {
          ...state.error,
          signUp: action.error
        }
      };
    case "SIGNOUT_SUCCES":
      return {
        ...state,
        isAuthorize: false,
        error: {
          ...state.error,
          signUp: null,
          signOut: null,
          signIn: null
        }
      };
    case "SIGNOUT_ERROR":
      return {
        ...state,
        error: {
          ...state.error,
          signOut: action.error
        }
      };
    case "SIGNIN_SUCCES":
      return {
        ...state,
        isAuthorize: true,
        error: {
          ...state.error,
          signUp: null,
          signOut: null,
          signIn: null
        }
      };
    case "SIGNIN_ERROR":
      return {
        ...state,
        error: {
          ...state.error,
          signIn: action.error
        }
      };
    default:
      return state;
  }

  return state;
}