/* eslint-disable no-console */
import axios from 'axios';

// initial State
const initialState = {
  userId: null,
  friends: []
};

// Action Types
const GOT_FRIENDS = 'GOT_FRIENDS'

// Action Creator
const gotFriends = friends => {
  return {
    type: GOT_FRIENDS,
    friends
  };
};

// Thunk Creator
export const getFriendsThunk = (userId) => async dispatch  => {
    try {

      //for now, i'm making an axios call to my computer's ip address, with
      //the server running on it (npm start within back-end), and I've hardcoded
      //id of 1 since we don't have a user logged in on the state yet.
      const {data} = await axios.get('http://192.168.1.3:3000/api/friends/2');

      // const {data} = await axios.get(`/api/friends/${userId}`);

      dispatch(gotFriends(data));
    } catch (error) {
      console.error(error);
    }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_FRIENDS:{
      return {...state, friends: action.friends};
    }
    default:
      return state;
  }
};

export default userReducer;
