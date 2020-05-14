import { combineReducers } from 'redux';
import auth from './auth';
import posts, {getPostIds, getPostById} from './posts';
import app from './app';
import users, { getUserById } from './users';
import ui from './ui';
import comments, {getCommentIdsByPost, getCommentById} from './comments';

// combine all module reducers into one root reducer
const rootReducer = combineReducers({
    app: app,
    users: users,
    auth: auth,
    posts: posts,
    ui: ui,
    comments: comments
});

export default rootReducer;

// complex selectors
export const getPostListWithAuthors = state => {
    const postIds = getPostIds(state);
    return postIds.map(id => {
        const post = getPostById(state, id);
        const auth = getUserById(state, post.author);
        return {...post, author: auth};
    });
}

export const getPostDetail = (state, id) => {
    const post = getPostById(state, id);
    return post ? {...post, author: getUserById(state, post.author)} : null;
}

export const getCommentsWithAuthors = (state, postId) => {
    const commentIds = getCommentIdsByPost(state, postId);
    if(commentIds){
        return commentIds.map(id => {
            const comment = getCommentById(state, id);
            return { ...comment, author: getUserById(state, comment.author) };
        });
    }
    else{
        return [];
    }
};