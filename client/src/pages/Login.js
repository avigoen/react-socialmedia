import { useMutation } from '@apollo/client'
import React, { useContext, useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

import { useForm } from '../utils/hooks'
import { AuthContext } from '../context/auth'
import { LOGIN_USER } from '../utils/graphql/mutations'

const formFields = [
    {
        label: "Username",
        placeholder: "Username...",
        name: "username",
        type: "text"
    },
    {
        label: "Password",
        placeholder: "Password...",
        name: "password",
        type: "password"
    },
]

function Login() {
    const context = useContext(AuthContext)
    const history = useHistory()
    const [errors, setErrors] = useState({})

    const { onChange, onSubmit, values } = useForm(loginUser, {
        username: "",
        password: "",
    })

    const [login, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData)
            history.push("/")
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors)
        },
        variables: values
    })

    function loginUser() { login() }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
                <h1>Login</h1>
                {formFields.map((field, index) => (
                    <Form.Input
                        key={index}
                        error={errors[field.name] ? true : false}
                        label={field.label}
                        placeholder={field.placeholder}
                        name={field.name}
                        type={field.type}
                        value={values[field.name]}
                        onChange={onChange} />
                ))}
                <Button type="submit" primary>Login</Button>
            </Form>
            {Object.keys(errors).length === 0 ? null :
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(err => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    )
}

export default Login
