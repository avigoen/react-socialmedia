import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

import { useForm } from '../utils/hooks'
import { FETCH_POSTS_QUERY } from '../utils/graphql/queries'
import { CREATE_POST_MUTATION } from '../utils/graphql/mutations'

function PostForm() {
    const { onChange, onSubmit, values } = useForm(createPostCallback, {
        body: ''
    })
    const [errorMessage, setError] = useState("")

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({ query: FETCH_POSTS_QUERY })
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY, data: {
                    getPosts: [result.data.createPost, ...data.getPosts]
                }
            })
            values.body = "";
        },
        onError(err) {
            setError(err.graphQLErrors[0].message)
        }
    })

    function createPostCallback() {
        setError("");
        createPost()
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <h2>Create a Post:</h2>
                <Form.Field>
                    <Form.Input error={error ? true : false} placeholder="Hi World!" name="body" onChange={onChange} value={values.body} />
                    <Button type="submit" color="teal">Submit</Button>
                </Form.Field>
            </Form>
            {errorMessage && (
                <div className="ui error message">
                    <ul className="list">
                        <li>{errorMessage}</li>
                    </ul>
                </div>
            )}
        </>
    )
}

export default PostForm
