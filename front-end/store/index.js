import {createStore, combineReducers, applyMiddleware} from 'redux';

import thunkMiddleWare from 'redux-thunk';
import snapshotReducer from './snapshots';
import userReducer from './user';

const reducer = combineReducers({
  snapshots: snapshotReducer,
  user: userReducer
});

const store = createStore(reducer, applyMiddleware(thunkMiddleWare));

export default store;
