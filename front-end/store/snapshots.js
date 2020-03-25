/* eslint-disable no-console */
import axios from 'axios';
import getEnvVars from '../environment';

const { apiUrl } = getEnvVars();

// initial State
const initialState = {
  allSnapshots: [],
  allLoading: true,
  selectedSnapshot: {},
  oneLoading: true
};

// Action Types
const GOT_ALL = 'GOT_ALL';
const GOT_ONE = 'GOT_ONE';

// Action Creator
const gotAllSnapshots = info => {
  return {
    type: GOT_ALL,
    info
  };
};
const gotSingleSnapshot = info => {
  return {
    type: GOT_ONE,
    info
  };
};

// Thunk Creator
export const allSnapshotsThunk = () => {
  return async dispatch => {
    try {
      const tempUserId = 1;
      const { data } = await axios.get(`${apiUrl}/api/snapshots/${tempUserId}`);
      dispatch(gotAllSnapshots(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const singleSnapshotThunk = (userId, placeId) => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/snapshots/snapshot/${userId}/${placeId}`);
      dispatch(gotSingleSnapshot(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const snapshotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL:
      return { ...state, allSnapshots: action.info, allLoading: false };
    case GOT_ONE:
      return { ...state, selectedSnapshot: action.info, oneLoading: false };
    default:
      return state;
  }
};

export default snapshotReducer;
