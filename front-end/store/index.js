import {createStore, combineReducers, applyMiddleware} from 'redux';

import thunkMiddleWare from 'redux-thunk';
import snapshotReducer from './snapshots';
import userReducer from './user';
import friendsReducer from './friends';

const reducer = combineReducers({
  snapshots: snapshotReducer,
  user: userReducer,
  friends: friendsReducer
});

const store = createStore(reducer, applyMiddleware(thunkMiddleWare));

export default store;
