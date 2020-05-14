import { get, put, post } from '../../utils/request';
import url from '../../utils/url';
import { actions as appActions } from './app';
import { combineReducers } from 'redux';

const initialState = {
    byId: {},
    allIds: []
};

// action types
export const types = {
    FETCH_ALL_POSTS: "POSTS/FETCH_ALL_POSTS",
    FETCH_POST: "POSTS/FETCH_POST",
    UPDATE_POST: "POSTS/UPDATE_POST",
    CREATE_POST: "POSTS/CREATE_POST"
};

// action creators
export const actions = {
    // get post list
    fetchAllPosts: () => {
        return (dispatch, getState) => {
            if (shouldFetchAllPosts(getState())) {
                dispatch(appActions.startRequest());
                return get(url.getPostList()).then(data => {
                    dispatch(appActions.finishRequest());
                    if (!data.error) {
                        const { posts, postsIds, authors } = convertPostsToPlain(data);
                        dispatch(fetchAllPostsSuccess(posts, postsIds, authors));
                    }
                    else {
                        dispatch(appActions.setError(data.error));
                    }
                });
            }
        }
    },
    // fetch post details
    fetchPost: id => {
        return (dispatch, getState) => {
            if (shouldFetchPost(id, getState())) {
                dispatch(appActions.startRequest());
                return get(url.getPostById(id)).then(data => {
                    dispatch(appActions.finishRequest());
                    if (!data.error && data.length === 1) {
                        const { post, author } = convertSinglePostToPlain(data[0]);
                        dispatch(fetchPostSuccess(post, author));
                    }
                    else {
                        dispatch(appActions.setError(data.error));
                    }
                });
            }
        }
    },
    // update post
    updatePost: (id, post) => {
        return dispatch => {
            dispatch(appActions.startRequest());
            return put(url.updatePost(id), post).then(data => {
                dispatch(appActions.finishRequest());
                if (!data.error) {
                    dispatch(updatePostSuccess(data));
                }
                else {
                    dispatch(appActions.setError(data.error));
                }
            });
        };
    },

    // create post
    createPost: (title, content) => {
        return (dispatch, getState) => {
            const state = getState();
            const author = state.auth.userId;
            const params = {
                author: author,
                title: title,
                content: content,
                vote: 0
            };

            dispatch(appActions.startRequest());
            return post(url.createPost(), params).then(data => {
                dispatch(appActions.finishRequest());
                if(!data.error){
                    dispatch(createPostSuccess(data));
                }
                else {
                    dispatch(appActions.setError(data.error));
                }
            });
        };
    }
};

// action creators - only for internal use, no need to export, so not put them into the "actions" object
const fetchAllPostsSuccess = (posts, postIds, authors) => ({
    type: types.FETCH_ALL_POSTS,
    posts: posts,
    postIds: postIds,
    users: authors
});

const fetchPostSuccess = (post, author) => {
    return {
        type: types.FETCH_POST,
        post: post,
        user: author
    };
};

const updatePostSuccess = (post) => {
    return {
        type: types.UPDATE_POST,
        post: post
    };
};

const createPostSuccess = (post) => {
    return {
        type: types.CREATE_POST,
        post: post
    };
};

const convertPostsToPlain = posts => {
    let postsById = {};
    let postsIds = [];
    let authorsById = {};

    posts.forEach(item => {
        if(!item.author) return;
        postsById[item.id] = { ...item, author: item.author.id };
        postsIds.push(item.id);
        if (!authorsById[item.author.id]) {
            authorsById[item.author.id] = item.author;
        }
    });

    return {
        posts: postsById,
        postsIds: postsIds,
        authors: authorsById
    };
}

const convertSinglePostToPlain = post => {
    const plainPost = { ...post, author: post.author.id };
    const author = { ...post.author };
    return {
        post: plainPost,
        author: author
    };
};

// P175， redux的缓存作用. 不是每次re-render都要获取数据. 至于刷新操作，可以加另外一个state field来辨别
const shouldFetchAllPosts = state => {
    return !state.posts.allIds || state.posts.allIds.length === 0;
};

const shouldFetchPost = (id, state) => {
    return !state.posts.byId[id] || !state.posts.byId[id].content;
};

// reducers
const allIds = (state = initialState.allIds, action) => {
    switch (action.type) {
        case types.FETCH_ALL_POSTS:
            return action.postIds;
        case types.CREATE_POST:
            return [action.post.id, ...state];
        default:
            return state;
    }
};

const byId = (state = initialState.byId, action) => {
    switch (action.type) {
        case types.FETCH_ALL_POSTS:
            return action.posts;
        case types.FETCH_POST:
        case types.UPDATE_POST:
        case types.CREATE_POST:
            return {
                ...state,
                [action.post.id]: action.post
            };
        default:
            return state;
    }
}

const reducer = combineReducers({
    allIds,
    byId
});

export default reducer;

// selectors
export const getPostIds = state => {
    return state.posts.allIds;
}

export const getPostById = (state, id) => {
    return state.posts.byId[id];
};

export const getPostList = state => state.posts.byId;