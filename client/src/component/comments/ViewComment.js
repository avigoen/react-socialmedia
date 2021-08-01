import moment from 'moment'
import React from 'react'
import { Card } from 'semantic-ui-react'
import DeleteButton from '../buttons/DeleteButton'

function ViewComment({ postId, user, comment }) {
    const { id: commentId, username, createdAt, body } = comment
    return (
        <Card fluid>
            <Card.Content>
                {user && user.username === username && <DeleteButton postId={postId} commentId={commentId} />}
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
        </Card>
    )
}

export default ViewComment
