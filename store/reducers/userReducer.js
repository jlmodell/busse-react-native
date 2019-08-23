// USERS REDUCER
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const TOKEN_DETAILS = "TOKEN_DETAILS";

const initialState = {
  token: null,
  tokenDetails: {
    createdAt: null,
    expiresAt: null
  }
};

export const userReducer = async (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload.token || state.token
      };
    case TOKEN_DETAILS:
      return {
        ...state,
        tokenDetails: {
          createdAt: action.payload.createdAt || state.tokenDetails.createdAt,
          expiresAt: action.payload.expiresAt || state.tokenDetails.expiresAt
        }
      };
    case LOGOUT:
      return {
        initialState
      };
    default:
      return state;
  }
};
