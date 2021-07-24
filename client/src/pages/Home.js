import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Grid } from 'semantic-ui-react'
import PostCard from '../component/PostCard'

function Home() {
    const { loading, data, error } = useQuery(FETCH_POSTS_QUERY)
    if (loading) {
        return (<h1>Loading...</h1>)
    }
    const { getPosts: posts } = data
    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recently Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {posts && posts.map(post => (
                    <Grid.Column key={post.id}>
                        <PostCard post={post} />
                    </Grid.Column>
                ))}
            </Grid.Row>
        </Grid>
    )
}

const FETCH_POSTS_QUERY = gql`
{
    getPosts{
        id
        body
        createdAt
        username
        likeCount
        likes {
            username
        }
        commentCount
        comments {
            id username createdAt body
        }
    }
}
`

export default Home
