/* eslint-disable no-console */
import axios from 'axios';
import getEnvVars from '../environment';

const {apiUrl} = getEnvVars();

// initial State
const initialState = {
  userId: null,
  friends: []
};

// Action Types
const GOT_FRIENDS = 'GOT_FRIENDS';

// Action Creator
const gotFriends = friends => {
  return {
    type: GOT_FRIENDS,
    friends
  };
};

// Thunk Creator
export const getFriendsThunk = userId => async dispatch => {
  try {
    const tempUserId = 1;
    const {data} = await axios.get(`${apiUrl}/api/friends/${tempUserId}`);

    dispatch(gotFriends(data));
  } catch (error) {
    console.error(error);
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_FRIENDS: {
      return {...state, friends: action.friends};
    }
    default:
      return state;
  }
};

export default userReducer;
