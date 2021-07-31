import React, { useState } from 'react'
import { Button, Confirm, Icon } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { DELETE_POST_MUTATION } from '../../utils/graphql/mutations'
import { FETCH_POSTS_QUERY } from '../../utils/graphql/queries'

function DeleteButton({ postId, callback }) {
    const [confirmOpen, setConfirmOpen] = useState(false)

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        variables: { postId },
        update(proxy) {
            toggleConfirm()
            const data = proxy.readQuery({ query: FETCH_POSTS_QUERY })
            const updatedData = data.getPosts.filter(post => post.id !== postId)
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY, data: {
                    getPosts: updatedData
                }
            })
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
                header='Delete Post'
                content='Do you want to delete this post?'
                open={confirmOpen}
                onCancel={toggleConfirm}
                onConfirm={deletePost}
            />
        </>
    )
}

export default DeleteButton
