/* eslint-disable no-console */
import axios from 'axios';
import getEnvVars from '../environment';

const { apiUrl } = getEnvVars();

// initial State
const initialState = {
  friends: [],
  singlefriend: {},
  singleFriendLoading: true,
  friendStatus: ''
};

// Action Types

const GOT_FRIENDS = 'GOT_FRIENDS';

const GOT_ONE_FRIEND = 'GOT_ONE_FRIEND';

const ADD_FRIEND = 'ADD_FRIEND';
// Action Creator
const gotAddFriend = status => {
  return {
    type: ADD_FRIEND,
    status
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
// TODO:
export const addFriendThunk = friendIds => async dispatch => {
  try {
    const {data} = await axios.post(
      `${apiUrl}/api/friends/addfriend${friendIds}`
    );
    console.log('what is data from magic method, data should be status', data);
    dispatch(gotAddFriend(data));
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

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_FRIENDS: {
      return { ...state, friends: action.friends };
    }
    case GOT_ONE_FRIEND: {
      return {
        ...state,
        singlefriend: action.friend,
        singleFriendLoading: false
      };
    }
    // case GOT_FRIENDSHIP: {
    //   return { ...state, singleFriendship: action.friendship, friendshipLoading: false }
    // },
    case ADD_FRIEND: {
      return {...state, friendStatus: action.status};
    }
    default:
      return state;
  }
};

export default friendsReducer;
