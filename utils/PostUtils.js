const Post = require('../models/Post')

module.exports = {
    getPosts: async function () {
        try {
            const posts = await Post.find()
            return posts
        }
        catch (err) {
            throw new Error(err)
        }
    }
}