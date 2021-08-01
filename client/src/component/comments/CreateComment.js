import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Card, Input } from 'semantic-ui-react'

import { SUBMIT_COMMENT_MUTATION } from '../../utils/graphql/mutations'

function CreateComment({ postId, callback }) {
    const [commentBody, setCommentBody] = useState("")
    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        variables: { postId, body: commentBody },
        update() {
            setCommentBody("")
            if (callback) callback();
        }
    })

    const handleCommentBody = e => setCommentBody(e.target.value)

    return (
        <Card fluid>
            <Card.Content>
                <p>Post a comment</p>
                <Input
                    fluid
                    action={{ color: "teal", content: "Submit", onClick: submitComment, disabled: commentBody.trim() === "" }}
                    placeholder="Add a comment..."
                    value={commentBody}
                    onChange={handleCommentBody} />
            </Card.Content>
        </Card>
    )
}

export default CreateComment
