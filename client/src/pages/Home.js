import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Grid, Transition } from 'semantic-ui-react'

import PostCard from '../component/PostCard'
import { AuthContext } from '../context/auth'
import PostForm from '../component/PostForm'
import { FETCH_POSTS_QUERY } from '../utils/graphql/queries'

function Home() {
    const { user } = useContext(AuthContext)
    const { loading, data } = useQuery(FETCH_POSTS_QUERY)
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
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
            </Grid.Row>
            <Transition.Group as={Grid.Row}>
                {posts && posts.map(post => (
                    <Grid.Column key={post.id} className="card-padding">
                        <PostCard post={post} />
                    </Grid.Column>
                ))}
            </Transition.Group>
        </Grid>
    )
}

export default Home
