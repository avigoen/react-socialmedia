import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from "@apollo/client/link/context";

import App from './App'

const httpLink = createHttpLink({ uri: "http://localhost:5000" });

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken')
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ""
        }
    }
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});


export default function ApProvider() {
    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    )
}