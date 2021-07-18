const Post = require('../models/Post')
const { AuthenticationError } = require('apollo-server')

module.exports = {
    getPosts: async function () {
        try {
            const posts = await Post.find()
            return posts
        }
        catch (err) {
            throw new Error(err)
        }
    },
    getPost: async function (postId) {
        try {
            const post = await Post.findById(postId)
            if (!post) {
                throw new Error('Post not found!!')
            }
            return post
        }
        catch (err) {
            throw new Error(err)
        }
    },
    createPost: async function (body, user) {
        const newPost = new Post({ body, user: user.id, username: user.username, createdAt: new Date().toISOString() })
        const post = await newPost.save()
        return post
    },
    deletePost: async function (postId, user) {
        const post = await this.getPost(postId)
        if (!post) {
            throw new Error('Post not found')
        }

        if (user.username !== post.username) {
            throw new AuthenticationError('Action not allowed')
        }

        await post.delete();
        return 'Post deleted successfully';
    }
}