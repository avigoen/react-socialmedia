const PostUtils = require('../../utils/PostUtils')
const checkAuth = require('../../utils/check-auth')

module.exports = {
    Mutation: {
        createPost(_, { body }, context) {
            const user = checkAuth(context)
            return PostUtils.createPost(body, user)
        },
        deletePost(_, { postId }, context) {
            const user = checkAuth(context)
            return PostUtils.deletePost(postId, user)
        },
        createComment(_, { postId, body }, context) {
            const user = checkAuth(context)
            return PostUtils.createComment(postId, body, user)
        },
        deleteComment(_, { postId, commentId }, context) {
            const user = checkAuth(context)
            return PostUtils.deleteComment(postId, commentId, user)
        },
        likePost(_, { postId }, context) {
            const user = checkAuth(context)
            return PostUtils.likePost(postId, user);
        }
    },
    Query: {
        getPosts() {
            return PostUtils.getPosts()
        },
        getPost(_, { postId }) {
            return PostUtils.getPost(postId);
        }
    }
}