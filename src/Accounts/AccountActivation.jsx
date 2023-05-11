import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {  useNavigate, useParams } from 'react-router-dom'
import { AuthTokenContext } from './AccountsApi'

const AccountActivation = () => {

    const activationStyles = {
        margin : '2rem 0rem'
    }

    const {value} = useContext(AuthTokenContext)
    const {handleActivation,createSpinner} = value

    const navigate = useNavigate()
    const urlParameters = useParams()

    const handleSubmit = (e,uid,token,callback=()=>{return navigate('/account/activation/done')}) => {
        e.preventDefault()
        handleActivation(uid,token,callback)
    }

    return ( 
        <div style={activationStyles}>
            <h3>Click on the activate button to activate your account !</h3>
            <Form onSubmit={(e,Auid=urlParameters.uid,Atoken=urlParameters.token)=>handleSubmit(e,Auid,Atoken)}>
                <Button variant="primary" type="submit">{createSpinner('Activate')}</Button>
            </Form>
        </div>
     )
}
 
export default AccountActivation