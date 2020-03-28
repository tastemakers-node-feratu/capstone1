/* eslint-disable no-console */
import axios from 'axios';
import getEnvVars from '../environment';

const {apiUrl} = getEnvVars();

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
const GOT_FRIENDS_STATUS = 'GOT_FRIENDS_STATUS';
const ADD_FRIEND = 'ADD_FRIEND';
// Action Creator
const gotAddFriend = newFriend => {
  return {
    type: ADD_FRIEND,
    newFriend
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
const gotFriendsStatus = status => {
  return {
    type: GOT_FRIENDS_STATUS,
    status
  };
};
// Thunk Creator
export const addFriendThunk = friendIds => async dispatch => {
  try {
    const {data} = await axios.post(`${apiUrl}/api/friends/addFriend`);
    dispatch(gotAddFriend(data));
  } catch (error) {
    console.error(error);
  }
};
export const getFriendStatus = friendsIds => async dispatch => {
  try {
    const {data} = await axios.get(`${apiUrl}/api/friends/friendStatus`, {
      params: {
        userId: friendsIds.userId,
        selectedFriendId: friendsIds.selectedFriendId
      }
    });
    dispatch(gotFriendsStatus(data));
  } catch (error) {
    console.error(error);
  }
};
export const getFriendsThunk = userId => async dispatch => {
  try {
    // added '/all' to distinguish this route from other axios.get routes
    const {data} = await axios.get(`${apiUrl}/api/friends/all/${userId}`);
    dispatch(gotFriends(data));
  } catch (error) {
    console.error(error);
  }
};

export const getSingleFriendThunk = id => async dispatch => {
  try {
    const {data} = await axios.get(`${apiUrl}/api/users/${id}`);

    dispatch(gotSingleFriend(data));
  } catch (error) {
    console.error(error);
  }
};

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_FRIENDS: {
      return {...state, friends: action.friends};
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
    case GOT_FRIENDS_STATUS: {
      return {...state, friendStatus: action.status};
    }
    case ADD_FRIEND: {
      return {...state, friends: [...this.state.friends, action.newFriend]};
    }
    default:
      return state;
  }
};

export default friendsReducer;
