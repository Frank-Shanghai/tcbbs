import { combineReducers } from 'redux';
import auth from './auth';
import posts, {getPostIds, getPostById} from './posts';
import app from './app';
import users, { getUserById } from './users';

// combine all module reducers into one root reducer
const rootReducer = combineReducers({
    app: app,
    users: users,
    auth: auth,
    posts: posts
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