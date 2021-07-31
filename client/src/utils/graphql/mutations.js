import { gql } from '@apollo/client'

export const REGISTER_USER = gql`
mutation register(
    $username: String!,
    $email: String!,
    $password: String!,
    $confirmPassword: String!
    ){
        register(registerInput:
        {
            username: $username,
            email: $email,
            password: $password,
            confirmPassword: $confirmPassword
        })
        {
            id email username createdAt token
        }
    }`


export const LOGIN_USER = gql`
mutation login(
    $username: String!,
    $password: String!,
    ){
        login( username: $username, password: $password)
        {
            id email username createdAt token
        }
    }`

export const CREATE_POST_MUTATION = gql`
mutation createPost($body: String!){
    createPost(body: $body){
        id body createdAt username
        likes{
            id username createdAt
        }
        likeCount
        comments{
            id body username createdAt
        }
        commentCount
    }
}`

export const LIKE_POST_MUTATION = gql`
mutation likePost($postId: ID!){
    likePost(postId: $postId){
        id
        likes{
            id username
        }
        likeCount
    }
}`