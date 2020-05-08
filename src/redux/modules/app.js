const initialState = {
    requestQuantity: 0,
    error: null
};

// action types
export const types = {
    START_REQUEST: "APP/START_REQUEST",
    FINISH_REQUEST: "APP/FINISH_REQUEST",
    SET_ERROR: "APP/SET_ERROR",
    REMOVE_ERROR: "APP/REMOVE_ERROR"
};

// action creators 
export const actions = {
    startRequest: () => {
        return {
            type: types.START_REQUEST
        };
    },
    finishRequest: () => {
        return {
            type: types.FINISH_REQUEST
        };
    },
    setError: (error) => {
        return {
            type: types.SET_ERROR,
            error: error
        };
    },
    removeError: () => {
        return {
            type: types.REMOVE_ERROR
        };
    }
};

// reducers
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.START_REQUEST:
            // everytime receive a request, increase requestQuantity
            return { ...state, requestQuantity: state.requestQuantity + 1 };
        case types.FINISH_REQUEST:
            return { ...state, requestQuantity: state.requestQuantity - 1 };
        case types.SET_ERROR:
            return { ...state, error: action.error };
        case types.REMOVE_ERROR:
            return { ...state, error: null };
        default:
            return state;
    }    
};

export default reducer;

// selectors
export const getError = (state) => {
    return state.app.error;
};

export const getRequestQuantity = (state) => {
    return state.app.requestQuantity;
};