import { gql } from '@apollo/client'
import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

const formFields = [
    {
        label: "Username",
        placeholder: "Username...",
        name: "username",
        type: "text"
    },
    {
        label: "Email",
        placeholder: "Email...",
        name: "email",
        type: "email"
    },
    {
        label: "Password",
        placeholder: "Password...",
        name: "password",
        type: "password"
    },
    {
        label: "Confirm Password",
        placeholder: "Confirm Password...",
        name: "confirmPassword",
        type: "password"
    }
]
const InitialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
}
function Register() {
    const history = useHistory()
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState(InitialValues)

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, result) {
            setValues(InitialValues)
            console.log(result)
            history.push("/")
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors)
            setValues(InitialValues)
        },
        variables: values
    })

    const onChange = ({ target: { name, value } }) => setValues({ ...values, [name]: value })
    const onSubmit = (event) => {
        event.preventDefault();
        addUser()
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
                <h1>Register</h1>
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
                <Button type="submit" primary>Register</Button>
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

const REGISTER_USER = gql`
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
    }
`

export default Register
