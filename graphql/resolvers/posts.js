const PostUtils = require('../../utils/PostUtils')

module.exports = {
    Query: {
        getPosts() {
            return PostUtils.getPosts()
        }
    }
}