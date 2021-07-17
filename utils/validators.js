module.exports = {
    validateRegisterInput: function (username, email, password, confirmPassword) {
        const errors = {}
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if (username.trim() === '') {
            errors.username = "Username must not be empty"
        }
        if (email.trim() === '') {
            errors.email = "Email must not be empty"
        }
        if (!email.match(emailRegex)) {
            errors.email = "Email must be a valid email address"
        }
        if (password === '') {
            errors.password = "Password must not be empty"
        }
        if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match"
        }
        return {
            errors,
            valid: Object.keys(errors).length < 1
        }
    },

    validateLoginInput: function (username, password) {
        const errors = {}
        if (username.trim() === '') {
            errors.username = "Username must not be empty"
        }
        if (password.trim() === '') {
            errors.password = "Password must not be empty"
        }
        return {
            errors,
            valid: Object.keys(errors).length < 1
        }
    }
}