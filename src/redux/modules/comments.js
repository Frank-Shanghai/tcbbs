import { combineReducers } from "redux";
import { get, post } from "../../utils/request";
import url from "../../utils/url";
import { actions as appActions } from "./app";

const initialState = {
    byPost: {},
    byId: {}
};

// action types
export const types = {
    FETCH_COMMENTS: "COMMENTS/FETCH_COMMENTS",
    CREATE_COMMENT: "COMMENTS/CREATE_COMMENT"
};

// action creators 
export const actions = {
    fetchComments: (postId) => {
        return (dispatch, getState) => {
            if (shouldFetchComments(postId, getState())) {
                dispatch(appActions.startRequest());
                get(url.getCommentList(postId)).then((data) => {
                    dispatch(appActions.finishRequest());
                    if (!data.error) {
                        const { comments, commentIds, users } = convertToPlainStructure(data);
                        dispatch(fetchCommentsSuccess(postId, commentIds, comments, users));
                    }
                    else {
                        dispatch(appActions.setError(data.error));
                    }
                });
            }
        };
    },

    createComment: comment => {
        return (dispatch) => {
            dispatch(appActions.startRequest);
            post(url.createComment(), comment).then(data => {
                dispatch(appActions.finishRequest());
                if(!data.error){
                    dispatch(createCommentSuccess(data.post, data));
                }
                else {
                    dispatch(appActions.setError(data.error));
                }
            });
        };
    },

    // No update comment support
};

const fetchCommentsSuccess = (postId, commentIds, comments, users) => {
    return {
        type: types.FETCH_COMMENTS,
        postId: postId,
        commentIds: commentIds,
        comments: comments,
        users: users
    };
};

const createCommentSuccess = (postId, comment) => {
    return {
        type: types.CREATE_COMMENT,
        postId: postId,
        comment: comment
    };
};

const shouldFetchComments = (postId, state) => {
    return !state.comments.byPost[postId];
};


const convertToPlainStructure = comments => {
    let commentsById = {};
    let commentIds = [];
    let authorsById = {};

    comments.forEach(item => {
        commentsById[item.id] = { ...item, author: item.author.id };
        commentIds.push(item.id);
        if (!authorsById[item.author.id]) {
            authorsById[item.author.id] = item.author;
        }
    });

    return {
        comments: commentsById,
        commentIds: commentIds,
        users: authorsById
    };
};

// reducers
const byPost = (state = initialState.byPost, action) => {
    switch (action.type) {
        case types.FETCH_COMMENTS:
            return { ...state, [action.postId]: action.commentIds };
        case types.CREATE_COMMENT:
            return {...state, [action.postId]: [action.comment.id, ...state[action.postId]]}
        default:
            return state;
    }
};

const byId = (state = initialState.byId, action) => {
    switch (action.type) {
        case types.FETCH_COMMENTS:
            return { ...state, ...action.comments };
        case types.CREATE_COMMENT:
            return { ...state, [action.comment.id]: action.comment };
        default:
            return state;
    }
};

const reducer = combineReducers({
    byPost: byPost,
    byId: byId
});

export default reducer;

// selectors
export const getCommentIdsByPost = (state, postId) => {
    return state.comments.byPost[postId];
};

export const getComments = (state) => {
    return state.comments.byId;
};

export const getCommentById = (state, id) => {
    return state.comments.byId[id];
};