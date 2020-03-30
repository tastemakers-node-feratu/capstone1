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
const REMOVE_FRIEND = 'REMOVE_FRIEND';

// Action Creator
const gotRemoveFriend = (status, removeId) => {
  return {
    type: REMOVE_FRIEND,
    status,
    removeId
  };
};
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

// Thunk Creators
export const removeFriendThunk = friendsIds => async dispatch => {
  try {
    const {selectedFriendId} = friendsIds;
    const {data} = await axios.delete(`${apiUrl}/api/friends/unfriend`, {
      params: {
        userId: friendsIds.userId,
        selectedFriendId: friendsIds.selectedFriendId
      }
    });
    dispatch(gotRemoveFriend(data, selectedFriendId));
  } catch (error) {
    console.error(error);
  }
};
export const addFriendThunk = friendIds => async dispatch => {
  try {
    const {data} = await axios.post(
      `${apiUrl}/api/friends/addFriend`,
      friendIds
    );
    // only update friendStatus if they are not approved friend
    if (data === 'user sent req') {
      dispatch(gotFriendsStatus(data));
    } else {
      // if data === 'already friends'
      // got addFriend will update friendstatus and add new friend to friend array
      dispatch(gotAddFriend(data));
    }
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
    case GOT_FRIENDS_STATUS: {
      return {...state, friendStatus: action.status};
    }
    case ADD_FRIEND: {
      return {
        ...state,
        friends: [...state.friends, action.newFriend],
        friendStatus: action.status
      };
    }
    case REMOVE_FRIEND: {
      const remainingFriends = state.friends.filter(
        friend => friend.id !== action.removeId
      );
      return {
        ...state,
        friends: remainingFriends,
        friendStatus: action.status
      };
    }
    default:
      return state;
  }
};

export default friendsReducer;
