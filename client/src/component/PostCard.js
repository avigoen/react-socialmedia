import React, { useContext } from 'react'
import moment from 'moment'
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'
import LikeButton from './buttons/LikeButton'
import DeleteButton from './buttons/DeleteButton'

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes, comments } }) {

    const { user } = useContext(AuthContext)
    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton id={id} user={user} likes={likes} likeCount={likeCount} />
                <Button as={Link} to={`/posts/${id}`} labelPosition='right'>
                    <Button color='blue' basic>
                        <Icon name='comments' />
                    </Button>
                    <Label as='div' basic color='blue' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
                {user && user.username === username && (
                    <DeleteButton postId={id} />
                )}
            </Card.Content>
        </Card>
    )
}

export default PostCard
