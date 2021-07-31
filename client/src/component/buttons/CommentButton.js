import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Label } from 'semantic-ui-react'

function CommentButton({ id, commentCount }) {
    return (
        <Button as={Link} to={`/posts/${id}`} labelPosition='right'>
            <Button color='blue' basic>
                <Icon name='comments' />
            </Button>
            <Label as='a' basic color='blue' pointing='left'>
                {commentCount}
            </Label>
        </Button>
    )
}

export default CommentButton
