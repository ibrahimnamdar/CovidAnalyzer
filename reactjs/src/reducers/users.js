import { SET_USERS, SET_TOKEN, SET_USERNAME } from '../constants';

const initialState = { users: [], token:'', username: '' };

export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users
      };
      case SET_TOKEN:
      return {
        ...state,
        token: action.token
      };
      case SET_USERNAME:
      return {
        ...state,
        username: action.username
      };
    default:
      return state;
  }
}
