/* eslint-disable no-console */
import axios from 'axios';
import getEnvVars from '../environment';

const { apiUrl } = getEnvVars();

// initial State
const initialState = {
  allSnapshots: [],
  allLoading: true,
  selectedSnapshot: {},
  oneLoading: true,
  catFilter: 'all',
  userSnaps: [],
  curatedSnaps: []
};

// Action Types
const GOT_ALL = 'GOT_ALL';
const GOT_ONE = 'GOT_ONE';
const ADD_ONE = 'ADD_ONE';
const ADD_FILTER = 'ADD_FILTER';
const GOT_USER_SNAPS = 'GOT_USER_SNAPS';
const GOT_CURATED_SNAPS = 'GOT_CURATED_SNAPS';

const addOneSnapshot = snapshot => ({
  type: ADD_ONE,
  snapshot
})

// Action Creator
const gotAllSnapshots = info => ({
  type: GOT_ALL,
  info
});
const gotSingleSnapshot = info => ({
  type: GOT_ONE,
  info
});

const gotFilter = boxes => ({
  type: ADD_FILTER,
  boxes
});

const gotUserSnaps = info => ({
  type: GOT_USER_SNAPS,
  info
})

const gotCuratedSnaps = info => {
  return{
    type: GOT_CURATED_SNAPS,
    info
  }
}

// Thunk Creator
export const allSnapshotsThunk = snapshotData => {
  return async dispatch => {
    try {
      const {catFilter, userId} = snapshotData;
      const { data } = await axios.get(`${apiUrl}/api/snapshots/${userId}?categories=${catFilter}`);
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

export const snapFilterThunk = (checkboxes) => {
  return dispatch => {
    let boxes = checkboxes.checkboxes.reduce((accum, curr) => {
      if (curr.checked === true) {
        accum.push(curr.name);
      }
      return accum;
    }, []);
    boxes = boxes.join(',')
    dispatch(gotFilter(boxes));
  };
};

export const addSnapshotThunk = (snapshot, userId) => {
  return async dispatch => {
    try {
      const category = snapshot.checkboxes.reduce((accum, curr) => {
        if (curr.checked === true) {
          accum.push(curr.name);
        }
        return accum;
      }, []);

      const tags = snapshot.tags.split(' ');

      const snapshotInfo = {
        description: snapshot.description,
        location: snapshot.location,
        name: snapshot.placeName,
        tags,
        category,
        imageURL: snapshot.imageURL
      }
      const { data } = await axios.put(`${apiUrl}/api/users/snapshot/${userId}`, snapshotInfo)
      dispatch(addOneSnapshot(data));
    } catch (err) {
      console.error(err);
    }
  }
}

export const getUserSnapsThunk = (userId) => {
  return async dispatch => {
    try{
      const { data } = await axios.get(`${apiUrl}/api/users/snapshots/${userId}`)
      dispatch(gotUserSnaps(data));
    } catch(err) {
      console.error(err);
    }
  }
}

export const getCuratedSnapsThunk = userId => {
  return async dispatch => {
    try{
      const { data } = await axios.get(`${apiUrl}/api/snapshots/explore/${userId}`);
      dispatch(gotCuratedSnaps(data));
    } catch(err){
      console.error(err)
    }
  }
}

const snapshotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CURATED_SNAPS:{
      // console.log('i got it');
      return {...state, curatedSnaps: [...action.info] }
    }

    case GOT_USER_SNAPS:
      return {...state, userSnaps: action.info}
    case ADD_ONE:
      return {
        ...state,
        selectedSnapshot: action.snapshot
      }
    case GOT_ALL:
      return { ...state, allSnapshots: action.info, allLoading: false };
    case GOT_ONE:
      return { ...state, selectedSnapshot: action.info, oneLoading: false };
    case ADD_FILTER:
      return { ...state, catFilter: action.boxes }
    default:
      return state;
  }
};

export default snapshotReducer;
