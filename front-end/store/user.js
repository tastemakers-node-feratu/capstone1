/* eslint-disable no-console */
import axios from 'axios';
import getEnvVars from '../environment';

const {apiUrl} = getEnvVars();

// initial State
const initialState = {
  user: {},
  userId: null,
  friends: []
};

// Action Types
const GOT_USER = 'GOT_USER';
const GOT_FRIENDS = 'GOT_FRIENDS';

// Action Creator
const gotUser = user => {
  return {
    type: GOT_USER,
    user
  };
};
const gotFriends = friends => {
  return {
    type: GOT_FRIENDS,
    friends
  };
};

// Thunk Creator
export const getUserThunk = authData => async dispatch => {
  try {
    const {data} = await axios.put(`${apiUrl}/auth/login`, {authData});
    dispatch(gotUser(data));
  } catch (error) {
    console.error(error);
  }
};
export const getFriendsThunk = userId => async dispatch => {
  try {
    // for now, i'm making an axios call to my computer's ip address, with
    // the server running on it (npm start within back-end), and I've hardcoded
    // id of 1 since we don't have a user logged in on the state yet.
    const tempUserId = 1;
    const {data} = await axios.get(`${apiUrl}/api/friends/${tempUserId}`);

    // const {data} = await axios.get(`/api/friends/${userId}`);

    dispatch(gotFriends(data));
  } catch (error) {
    console.error(error);
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER: {
      return {...state, user: action.user};
    }
    case GOT_FRIENDS: {
      return {...state, friends: action.friends};
    }
    default:
      return state;
  }
};

export default userReducer;
