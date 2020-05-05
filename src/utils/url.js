const postListFilter = {
    fields: ["id", "title", "author", "vote", "updatedAt"],
    limit: 10,
    order: "updatedAt DESC",
    include: "authorPointer",
    includefilter: {user: {fields: ["id", "username"]}}
};

function encodeFilter(filter) {
    return encodeURIComponent(JSON.stringify(filter));
}

export default {
    login: () => { return "user/login"; },
    getPostList: () => `/Post?filter=${encodeFilter(postListFilter)}`
}