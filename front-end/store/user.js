/* eslint-disable no-console */
import axios from 'axios';
import getEnvVars from '../environment';

const { apiUrl } = getEnvVars();

// initial State
const initialState = {
  user: {},
  userId: null,
  friends: [],
  singlefriend: {},
  singleFriendLoading: true
};

// Action Types
const GOT_USER = 'GOT_USER';
const GOT_FRIENDS = 'GOT_FRIENDS';
const SIGN_UP = 'SIGN_UP';
const LOG_OUT = 'LOG_OUT';
const GOT_ONE_FRIEND = 'GOT_ONE_FRIEND';


// Action Creator
const gotUser = user => {
  return {
    type: GOT_USER,
    user
  };
};
const gotSignUp = user => {
  return {
    type: SIGN_UP,
    user
  };
};
const gotLogOut = () => {
  return {
    type: LOG_OUT
  };
};
const gotFriends = friends => {
  return {
    type: GOT_FRIENDS,
    friends
  };
};

const gotSingleFriend = friend => {
  return {
    type: GOT_ONE_FRIEND,
    friend
  };
};

// Thunk Creator
export const getUserThunk = authData => async dispatch => {
  try {
    const {data} = await axios.put(`${apiUrl}/auth/login`, authData);
    dispatch(gotUser(data));
  } catch (error) {
    console.error(error);
  }
};
export const signUp = userData => async dispatch => {
  try {
    const {data} = await axios.post(`${apiUrl}/auth/signup`, userData);
    dispatch(gotSignUp(data));
  } catch (error) {
    console.error(error);
  }
};
export const logOut = () => async dispatch => {
  try {
    await axios.put(`${apiUrl}/auth/logout`);
    dispatch(gotLogOut());
  } catch (error) {
    console.error(error);
  }
};
export const getFriendsThunk = userId => async dispatch => {
  try {
    const tempUserId = 1;
    const { data } = await axios.get(`${apiUrl}/api/friends/${tempUserId}`);

    dispatch(gotFriends(data));
  } catch (error) {
    console.error(error);
  }
};

export const getSingleFriendThunk = id => async dispatch => {
  try {
    const { data } = await axios.get(`${apiUrl}/api/users/${id}`);

    dispatch(gotSingleFriend(data));
  } catch (error) {
    console.error(error);
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP: {
      return {...state, user: action.user};
    }
    case GOT_USER: {
      return {...state, user: action.user};
    }
    case GOT_FRIENDS: {
      return { ...state, friends: action.friends };
    }
    case GOT_ONE_FRIEND: {
      return { ...state, singlefriend: action.friend, singleFriendLoading: false }
    }
    case LOG_OUT: {
      return {...state, user: {}};
    }
    default:
      return state;
  }
};

export default userReducer;
