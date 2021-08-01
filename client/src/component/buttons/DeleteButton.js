import React, { useState } from 'react'
import { Button, Confirm, Icon } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

import { DELETE_COMMENT_MUTATION, DELETE_POST_MUTATION } from '../../utils/graphql/mutations'
import { FETCH_POSTS_QUERY } from '../../utils/graphql/queries'
import { updatePostsOnPostDelete } from '../../utils/UpdateCache'

function DeleteButton({ postId, commentId, callback }) {
    const [confirmOpen, setConfirmOpen] = useState(false)

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

    const [deletePost] = useMutation(mutation, {
        variables: { postId, commentId },
        update(proxy) {
            toggleConfirm()
            if (!commentId) {
                const data = proxy.readQuery({ query: FETCH_POSTS_QUERY })
                const updatedData = updatePostsOnPostDelete(postId, data.getPosts)
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY, data: {
                        getPosts: updatedData
                    }
                })
            }
            if (callback) callback();
        }
    })

    const toggleConfirm = () => setConfirmOpen(!confirmOpen)
    const onDelete = () => toggleConfirm()

    return (
        <>
            <Button floated="right" as="div" color="red" onClick={onDelete}>
                <Icon name="trash" style={{ margin: 0 }} />
            </Button>
            <Confirm
                header={commentId ? 'Delete Comment' : 'Delete Post'}
                content={`Do you want to delete this ${commentId ? 'comment' : 'post'}?`}
                open={confirmOpen}
                onCancel={toggleConfirm}
                onConfirm={deletePost}
            />
        </>
    )
}

export default DeleteButton
