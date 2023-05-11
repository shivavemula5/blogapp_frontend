import React, { useContext } from 'react'
import { AuthTokenContext } from '../Accounts/AccountsApi'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {value} = useContext(AuthTokenContext)
    const {token} = value
    return ( token ? children: <Navigate to='/login'/>)
}
 

export default PrivateRoute;