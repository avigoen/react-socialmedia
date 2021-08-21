const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server')

const { JWT_SECRET_KEY } = require('../config')

module.exports = (context) => {
    const authHeader = context.req.headers.authorization
    if (!authHeader) {
        throw new Error("Authorization header must be provided")
    }
    const token = authHeader.split("Bearer ")[1]
    if (!token) {
        throw new Error("Authorization token must be \"Bearer [token]\"")
    }

    try {
        const user = jwt.verify(token, JWT_SECRET_KEY)
        return user;
    }
    catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
    }
}