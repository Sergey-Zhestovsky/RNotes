let init = {
  notifications: [],
  isConnected: null
};

export default function projectReducer(state = init, action) {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      let array = [action.notification, ...state.notifications];
      array.splice(3, array.length);
      return {
        ...state,
        isConnected: true,
        notifications: array
      };

    case "GET_NOTIFICATIONS":
      return {
        ...state,
        isConnected: true,
        notifications: action.notifications
      };

    case "CONNECTION_ERROR":
      return {
        ...state,
        isConnected: false
      };

    default:
      return state;
  }
}