import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { AuthTokenContext } from './AccountsApi'
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

const Login = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {value} = useContext(AuthTokenContext)

    const {token , handleLogin , createSpinner} = value
    const navigate = useNavigate()

    const handleChange = (e) => {
        if(e.target.name === 'email')
            setEmail(e.target.value)
        else
            setPassword(e.target.value)
    }

    const Login = async(e,email,password , callback =()=>(navigate('/profile'))) => {
        e.preventDefault()
        handleLogin(email,password,callback)
    }

    useEffect(()=>{
        if(token)
            return navigate('/profile')
    },[])


    return ( 
            <Card className='loginCard'>
                <Card.Title className='loginCardTitle'>Login</Card.Title>
                <Card.Body>
                    <Form onSubmit={(e,Email=email,Passowrd=password)=>Login(e,Email,Passowrd)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e)=>handleChange(e)} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={(e)=>handleChange(e)} required />
                        </Form.Group>

                        <Button variant="primary" className='loginCardButton' type="submit">
                            {createSpinner('Login')}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
     );
}
 
export default Login;