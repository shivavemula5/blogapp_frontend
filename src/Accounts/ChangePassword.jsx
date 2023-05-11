import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { AuthTokenContext } from './AccountsApi'
import Card from 'react-bootstrap/Card'
import { Spinner } from 'react-bootstrap'

const ChangePassword = () => {

    const [currentpassword,setCurrentPassword] = useState('')
    const [password,setPassword] = useState('')
    const [confirmpassword,setConfirmPassword] = useState('')

    const {value} = useContext(AuthTokenContext)
    const {handleChangePassword,createSpinner,loading} = value

    const handleChange = (e) => {
        if(e.target.name === 'password') 
            setPassword(e.target.value)
        else if(e.target.name === 'confirmpassword')
            setConfirmPassword(e.target.value)
        else
            setCurrentPassword(e.target.value)
    } 

    const handleSubmit = (e,currentpassword,password,confirmpassword) => {
        e.preventDefault()
        handleChangePassword(currentpassword,password,confirmpassword)
    }

    return ( 
         <Card className='changePasswordCard'>
            <Card.Title className='changePasswordCardTitle'>Change Password</Card.Title>
            <Card.Body>
                <Form onSubmit={(e,Rcurrentpassword=currentpassword,Rpassword=password,Rconfirmpassword=confirmpassword)=>handleSubmit(e,Rcurrentpassword,Rpassword,Rconfirmpassword)}>

                    <Form.Group className="mb-3" controlId="formBasicCurrentPassword">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control type="password" placeholder="Current Password" name="currentpassword" onChange={(e)=>handleChange(e)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={(e)=>handleChange(e)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" name="confirmpassword" onChange={(e)=>handleChange(e)}/>
                    </Form.Group>

                    <Button variant="primary" className='changePasswordCardButton' disabled={loading} type="submit">
                        {createSpinner('Change Password')}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
     );
}
 
export default ChangePassword