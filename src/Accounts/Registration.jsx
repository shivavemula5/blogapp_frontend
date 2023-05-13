import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { AuthTokenContext } from './AccountsApi'
import { Link, useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { toast } from 'react-toastify'


const Register = () => {

    const {value} = useContext(AuthTokenContext)
    const {handleRegister,createSpinner} = value 

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmpassword,setConfirmPassword] = useState('')

    const navigate = useNavigate()

    useEffect(()=>{
        if(value.token)
            return navigate('/dashboard')
    },[])

    const handleChange = (e) => {
        if(e.target.name === 'name')
            setName(e.target.value)
        else if(e.target.name === 'email')
            setEmail(e.target.value)
        else if(e.target.name === 'password')
            setPassword(e.target.value)
        else if(e.target.name === 'confirmpassword') 
            setConfirmPassword(e.target.value)
    }

    const Register = (e,name,email,password,conformpassword,callback=()=>(navigate('/login'))) => {
        e.preventDefault()
        handleRegister(name,email,password,conformpassword,callback)
    }   

    return ( 
            <Card className='registerCard'>
                <Card.Title className='registerCardTitle'>Register</Card.Title>
                <Card.Body>
                    <Form onSubmit={(e,Email=email,Name=name,Password=password,ConfirmPassword=confirmpassword)=>Register(e,Name,Email,Password,ConfirmPassword)}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Enter name" onChange={(e)=>handleChange(e)} />
                        </Form.Group>
                
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" onChange={(e)=>handleChange(e)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={(e)=>handleChange(e)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name="confirmpassword" placeholder="ConfirmPassword" onChange={(e)=>handleChange(e)} />
                        </Form.Group>
                        <Link className='resendActivation' to='/resend/activation/link'>Already registered ? resend activation link </Link>
                        <Button variant="primary" type="submit" className='registerCardButton'>
                            {createSpinner('Register')}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
     )
}
 
export default Register
