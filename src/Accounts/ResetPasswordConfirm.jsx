import React, { useContext, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { AuthTokenContext } from './AccountsApi'
import { Card } from 'react-bootstrap'


const ResetPasswordConfirm = () => {
    
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


    const urlParameters = useParams()
    const {value} = useContext(AuthTokenContext)
    const {handleResetPasswordConfirm,createSpinner} = value
    const navigate = useNavigate()

    const [password,setPassword] = useState('')
    const [confirmpassword,setConfirmPassword] = useState('')

    const handleChange = (e) => {
        if(e.target.name === 'password') 
            setPassword(e.target.value)
        else
            setConfirmPassword(e.target.value)
    } 

    const handleSubmit = (e,uid,token,password,confirmpassword,callback=()=>{return navigate('/password/reset/done')}) => {
        handleResetPasswordConfirm(e,uid,token,password,confirmpassword,callback)
    }

    return ( 
        <div>
            <Card style={cardStyles}>
                <Card.Title style={titleStyles}>Password Reset</Card.Title>
                <Card.Body>
                    <Form onSubmit={(e,uid=urlParameters.uid,token=urlParameters.token,Rpassword=password,Rconfirmpassword=confirmpassword)=>handleSubmit(e,uid,token,Rpassword,Rconfirmpassword)}>
                    
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={(e)=>handleChange(e)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" name="confirmpassword" onChange={(e)=>handleChange(e)}/>
                        </Form.Group>

                        <Button variant="primary" type="submit" style={buttonStyles}>
                            {createSpinner('Reset Password')}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
     );
}
 
export default ResetPasswordConfirm;