const { UserInputError } = require("apollo-server")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { validateLoginInput, validateRegisterInput } = require("./validators")
const User = require('../models/User');
const { JWT_SECRET_KEY } = require("../config");

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, username: user.username }, JWT_SECRET_KEY, { expiresIn: '1h' });
}
module.exports = {
    login: async function (username, password) {
        // Validate user data
        const { errors, valid } = validateLoginInput(username, password)
        if (!valid) {
            throw new UserInputError('Errors', { errors })
        }

        const user = await User.findOne({ username })
        if (!user) {
            errors.general = "User not found"
            throw new UserInputError('User not found', { errors })
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            errors.general = "Wrong Credentials"
            throw new UserInputError('Wrong Credentials', { errors })
        }

        const token = generateToken(user)
        return { ...user._doc, id: user._id, token }
    },

    register: async function ({ username, email, password, confirmPassword }) {
        const { errors, valid } = validateRegisterInput(username, email, password, confirmPassword)
        if (!valid) {
            throw new UserInputError('Errors', { errors })
        }
        // make sure user doesn;t exists
        const user = await User.findOne({ username })
        if (user) {
            throw new UserInputError("Username is taken", { errors: { username: "This username is taken" } })
        }
        // hash password and create an auth token
        password = await bcrypt.hash(password, 12);
        const newUser = new User({
            email, username, password, createdAt: new Date().toISOString()
        })
        const result = await newUser.save()
        const token = generateToken(result);
        return { ...result._doc, id: result._id, token }
    }
}