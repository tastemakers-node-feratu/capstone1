/* eslint-disable no-console */
import axios from 'axios';

// initial State
const initialState = {
  allSnapshots: [],
  allLoading: true,
  selectedSnapshot: {}
};

// Action Types
const GOT_ALL = 'GOT_ALL';
const GOT_ONE = 'GOT_ONE';
const ADD_ONE = 'ADD_ONE';

const addOneSnapshot = snapshot => {
  return{
    type: ADD_ONE,
    snapshot
  }
}

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
      const { data } = await axios.get(`http://192.168.1.98:3000/api/snapshots/${tempUserId}`);
      dispatch(gotAllSnapshots(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const singleSnapshotThunk = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`http://192.168.1.98:3000/api/snapshots/${id}`);
      dispatch(gotSingleSnapshot(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addSnapshotThunk = (snapshot, userId) => {
  return async dispatch => {
    try {
      console.log('user id is', userId);
      const category = snapshot.checkboxes.reduce((accum, curr) => {
        if(curr.checked === true){
          accum.push(curr.name);
        }
        return accum;
      }, [])
      const snapshotInfo = {
        description: snapshot.description,
        location: snapshot.location,
        name: snapshot.name,
        tags: snapshot.tags,
        category
      }
      const {data} = await axios.put(`http://192.168.1.3:3000/api/users/snapshot/${userId}`, snapshotInfo)
      dispatch(addOneSnapshot(data));
    } catch(err){
      console.error(err);
    }
  }
}

const snapshotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL:
      return { ...state, allSnapshots: action.info, allLoading: false };
    case GOT_ONE:
      return { ...state, selectedSnapshot: action.info };
    default:
      return state;
  }
};

export default snapshotReducer;
