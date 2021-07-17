const UserUtils = require('../../utils/UserUtils')

module.exports = {
    Mutation: {
        login(_, { username, password }) {
            return UserUtils.login(username, password)
        },
        register(_, { registerInput }) {
            return UserUtils.register(registerInput)
        }
    }
}