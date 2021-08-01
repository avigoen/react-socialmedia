import React, { useState, useContext } from 'react'
import { useQuery } from '@apollo/client'
import { FETCH_POST_QUERY } from '../utils/graphql/queries'
import { Button, Card, Grid, Icon, Image, Label } from 'semantic-ui-react'
import moment from 'moment'

import { AuthContext } from '../context/auth'
import LikeButton from '../component/buttons/LikeButton'
import DeleteButton from '../component/buttons/DeleteButton'
import ViewComment from '../component/comments/ViewComment'
import CreateComment from '../component/comments/CreateComment'

function Post(props) {
    const { user } = useContext(AuthContext)
    const [errorMessage, setError] = useState("")
    const [showCommentForm, setCommentForm] = useState(false)
    const postId = props.match.params.postId
    const { data, loading } = useQuery(FETCH_POST_QUERY, {
        variables: { postId },
        onError(err) {
            setError(err.graphQLErrors[0].message)
        }
    })

    if (loading) {
        return (
            <h1>Loading Post...</h1>
        )
    }

    if (errorMessage) {
        return (
            <div className="ui error message">
                {errorMessage}
            </div>
        )
    }

    const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = data.getPost
    const deletePostCallback = () => props.history.push("/")
    const enableComment = () => setCommentForm(true)
    const disableCommentForm = () => setCommentForm(false)
    return (
        <Grid className="no-margin">
            <Grid.Row>
                <Grid.Column width={2}>
                    <Image
                        src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                        size="small" float="right" />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>{username}</Card.Header>
                            <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                            <Card.Description>{body}</Card.Description>
                        </Card.Content>
                        <hr />
                        <Card.Content extra>
                            <LikeButton id={id} user={user} likes={likes} likeCount={likeCount} />
                            <Button as="div" onClick={enableComment} labelPosition='right'>
                                <Button color='blue' basic>
                                    <Icon name='comments' />
                                </Button>
                                <Label as='div' basic color='blue' pointing='left'>
                                    {commentCount}
                                </Label>
                            </Button>
                            {user && user.username === username && (
                                <DeleteButton postId={id} callback={deletePostCallback} />
                            )}
                        </Card.Content>
                    </Card>
                    {user && showCommentForm && <CreateComment postId={id} callback={disableCommentForm} />}
                    {comments && comments.map(comment => (
                        <ViewComment key={comment.id} postId={id} user={user} comment={comment} />
                    ))}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Post

