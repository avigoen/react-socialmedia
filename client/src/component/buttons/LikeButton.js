import React, { useState, useEffect, useCallback } from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { LIKE_POST_MUTATION } from '../../utils/graphql/mutations'

function LikeButton({ id, likes, likeCount, user }) {
    const [liked, setLiked] = useState(false)
    const memoizedCallback = useCallback(() => {
        let postLiked = user && likes.find(like => like.username === user.username)
        setLiked(postLiked)
    }, [user, likes])

    useEffect(memoizedCallback)

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id }
    })

    const label = { basic: true, color: 'teal', pointing: 'left', content: likeCount }

    return (
        <>
            {user ?
                <Button onClick={likePost} color="teal" content="" basic={!liked} icon="heart" label={label} />
                :
                <Button as={Link} to="/login" basic content="" color="teal" icon="heart" label={label} />
            }
        </>
    )
}

export default LikeButton
