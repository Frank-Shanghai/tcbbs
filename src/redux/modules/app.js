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
        return types.START_REQUEST;
    },
    finishRequest: () => {
        return types.FINISH_REQUEST;
    },
    setError: (error) => {
        return {
            type: types.SET_ERROR,
            error: error
        };
    },
    removeError: () => {
        return types.REMOVE_ERROR;
    }
};