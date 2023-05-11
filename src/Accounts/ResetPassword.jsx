import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import { AuthTokenContext } from './AccountsApi'


const ResetPassword = () => {

    const {value} = useContext(AuthTokenContext)
    const {handleResetPassword,loading,createSpinner} = value

    const [email,setEmail] = useState('')

    const handleChange = (e) => {
        setEmail(e.target.value)
    } 

    const handleSubmit = async(e,email) => {
        e.preventDefault()
        handleResetPassword(email)
    }

    return ( 
        <Card className='resetCard'>
            <Card.Title className='resetCardTitle'>Reset Password</Card.Title>
            <Card.Body>
                <Form onSubmit = {(e,Email=email)=>handleSubmit(e,Email)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange = {e=>handleChange(e)} />
                    </Form.Group>
                    <Button className='resetCardButton' variant="primary" type="submit" disabled={loading}>
                        {createSpinner('Reset Password')}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}
 
export default ResetPassword;