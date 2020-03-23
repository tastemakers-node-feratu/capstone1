/* eslint-disable no-console */
import axios from 'axios';

// initial State
const initialState = {
  allSnapshots: [],
  selectedSnapshot: {}
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
      const {data} = await axios.get('/api/snapshots');
      dispatch(gotAllSnapshots(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const singleSnapshotThunk = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/snapshots/${id}`);
      dispatch(gotSingleSnapshot(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const snapshotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL:
      return {...state, allSnapshots: action.info};
    case GOT_ONE:
      return {...state, selectedSnapshot: action.info};
    default:
      return state;
  }
};

export default snapshotReducer;