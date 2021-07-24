import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import App from './App'

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:5000"
});

export default function ApProvider() {
    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    )
}