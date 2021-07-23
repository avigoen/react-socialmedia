const Post = require('../models/Post')
const { AuthenticationError, UserInputError } = require('apollo-server')

const { generateCreatedAt } = require('./DateUtils')

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

        if (args.body.trim() === '')
            throw new Error("Post Body must not be empty")

        const newPost = new Post({ body, user: user.id, username: user.username, createdAt: generateCreatedAt() })
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
    },
    createComment: async function (postId, body, { username }) {
        if (body.trim() === "") {
            throw new UserInputError('Empty Comment', {
                errors: {
                    body: "Comment body must not be empty"
                }
            })
        }

        const post = await this.getPost(postId)
        if (!post) {
            throw new UserInputError('Post not found')
        }

        post.comments.unshift({ body, username, createdAt: generateCreatedAt() })
        await post.save()
        return post;
    },
    deleteComment: async function (postId, commentId, { username }) {
        const post = await this.getPost(postId)
        if (!post) {
            throw new UserInputError('Post not found')
        }

        const commentIndex = post.comments.findIndex(c => c.id === commentId)
        if (post.comments[commentIndex].username !== username) {
            throw new AuthenticationError('Action not allowed')
        }

        post.comments.splice(commentIndex, 1)
        await post.save()
        return post;
    },
    likePost: async function (postId, { username }) {
        const post = await this.getPost(postId)
        if (!post) {
            throw new UserInputError('Post not found')
        }

        const likeIndex = post.likes.findIndex(l => l.username === username)
        if (likeIndex !== -1) {
            post.likes.splice(likeIndex, 1)
        }
        else {
            post.likes.unshift({ username, createdAt: generateCreatedAt() })
        }
        await post.save()
        return post;
    }
}