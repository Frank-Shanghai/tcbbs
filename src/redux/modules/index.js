import { combineReducers } from 'redux';
import auth from './auth';

// combine all module reducers into one root reducer
const rootReducer = combineReducers({
    auth: auth
});

export default rootReducer;