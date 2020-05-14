const postListFilter = {
    fields: ["id", "title", "author", "vote", "updatedAt"],
    limit: 10,
    order: "updatedAt DESC",
    include: "authorPointer",
    // include, includefilter是api clound的规范，include应该是列表加pointer（related field类型)， 
    // includefilter中的user，应该是authorPointer指向的表名，也就是model name
    includefilter: { user: { fields: ["id", "username"] } }
};

const postByIdFilter = id => {
    return {
        fields: ["id", "title", "author", "vote", "updatedAt", "content"],
        where: { id: id },
        include: "authorPointer",
        includefilter: { user: { fields: ["id", "username"] } }
    };
};

const commentListFilter = (postId) => {
    return {
        fields: ["id", "author", "updatedAt", "content"],
        where: { post: postId },
        limit: 20,
        order: "updatedAt DESC",
        include: "authorPointer",
        includefilter: { user: { fields: ["id", "username"] } }
    }
};

function encodeFilter(filter) {
    return encodeURIComponent(JSON.stringify(filter));
}

export default {
    login: () => { return "user/login"; },
    getPostList: () => `/Post?filter=${encodeFilter(postListFilter)}`,
    getPostById: (id) => `/post?filter=${encodeFilter(postByIdFilter(id))}`,
    updatePost: id => `/post/${id}`,
    createPost: () => "/post",
    getCommentList: (postId) => {
        return `/comment?filter=${encodeFilter(commentListFilter(postId))}`
    },
    createComment: () => "/comment"
}