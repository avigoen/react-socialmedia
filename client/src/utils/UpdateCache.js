export const updatePostsOnPostDelete = (postId, posts) => {
    return posts.filter(post => post.id !== postId)
}

export const updatePostsOnCommentDelete = (commentId, postId, posts) => {
    let postIndex = posts.findIndex(post => post.id === postId)
    const updatedPostComments = posts[postIndex].comments.filter(comment => comment.id !== commentId)
    const updatedPost = { ...posts[postIndex], comments: updatedPostComments }
    let newPosts = [
        ...posts.slice(0, postIndex),
        updatedPost,
        ...posts.slice(postIndex + 1)
    ]
    return newPosts
}

export const updatePostsOnAddPost = (posts, post) => {
    return [...posts, post]
}

export const updatePostsOnAddComment = (posts, postId, { comments }) => {
    let postIndex = posts.findIndex(post => post.id === postId)
    const updatedPost = { ...posts[postIndex], comments }
    let newPosts = [
        ...posts.slice(0, postIndex),
        updatedPost,
        ...posts.slice(postIndex + 1)
    ]
    return newPosts
}