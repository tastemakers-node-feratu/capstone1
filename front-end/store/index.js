import {createStore, combineReducers, applyMiddleware} from 'redux';

import thunkMiddleWare from 'redux-thunk';
import snapshotReducer from './snapshots';

const reducer = combineReducers({
  snapshots: snapshotReducer
});

const store = createStore(reducer, applyMiddleware(thunkMiddleWare));

export default store;
