import {actions as appActions} from "./app";
import { post } from '../../utils/request';
import url from "../../utils/url";

const initialState = {
    userId: null,
    userName: null
};

// action types
export const types = {
    LOGIN: "AUTH/LOGIN",
    LOGOUT: "AUTH/LOGOUT"
};

// action creators 
export const actions = {
    // async action, login
    login: (userName, password) => {
        return (dispatch) => {
            dispatch(appActions.startRequest());

            const params = {username: userName, password: password};
            return post(url.login(), params).then(data => {
                dispatch(appActions.finishRequest());

                if(!data.error){
                    dispatch(actions.setLoginInfo(data.userId, data.username));
                }
                else{
                    dispatch(appActions.setError(data.error));
                }
            });
        };
    },
    logout: () => {
        return {
            type: types.LOGOUT
        };
    },
    setLoginInfo: (userId, userName) => {
        return {
            type: types.LOGIN,
            userId: userId,
            userName: userName
        };
    }
};

// reducers
const reducer = (state = initialState, action) => {
    switch(action.type){
        case types.LOGIN:
            return {...state, userId: action.userId, userName: action.userName};
        case types.LOGOUT:
            return {...state, userId: null, userName: null};
        default: 
            return state;
    }
};

export default reducer;

// selectors 
export const getLoggedUser = (state) => {
    return state.auth;
};