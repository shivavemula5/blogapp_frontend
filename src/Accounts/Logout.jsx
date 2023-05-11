import React, { useContext , useEffect } from 'react'
import { AuthTokenContext } from './AccountsApi';
import { Link } from 'react-router-dom';
 
const Logout = () => {

    const paragraphStyles = {
        margin : '3rem 0rem',
        fontWeight : '400'
    }

    const LinkStyles = {
        textDecoration : 'none',
    }

    const {value} = useContext(AuthTokenContext)
    const {handleLogout} = value

    useEffect(()=>{
        handleLogout()
    },[handleLogout])

    return ( 
        <div>
            <h2 style={paragraphStyles}>Thank you for spending time on this website ,click <Link style={LinkStyles} to='/login'>here</Link> to login again</h2>
        </div>
     );
}
 
export default Logout