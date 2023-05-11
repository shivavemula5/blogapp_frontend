import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { AuthTokenContext } from './AccountsApi'
import { Card } from 'react-bootstrap'

const ResendActivationMail = () => {
        
    const cardStyles = {
        width : '25rem',
        margin : '3rem auto',
    }

    const buttonStyles = {
        width : '100%'
    }

    const titleStyles = {
        textAlign : 'center',
        padding : '.5rem '
    }

    const {value} = useContext(AuthTokenContext)
    const {handleResendActivation,createSpinner,loading} = value

    const [email,setEmail] = useState('')

    const handleChange = (e) => {
        if(e.target.name === 'email') 
            setEmail(e.target.value)
    }
    
    const handleSubmit = (e,email) => {
        e.preventDefault()
        handleResendActivation(email)
    }   

    return ( 
        <div>
            <Card style={cardStyles}>
                <Card.Title style={titleStyles}>Resend Activation Link</Card.Title>
                <Card.Body>
                    <Form onSubmit={(e,Email=email)=>handleSubmit(e,Email)}>
                    
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" name="email" onChange={(e)=>handleChange(e)}/>
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={loading} style={buttonStyles}>
                        {createSpinner('Resend Activation Link')}
                    </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
     );
}
 
export default ResendActivationMail;