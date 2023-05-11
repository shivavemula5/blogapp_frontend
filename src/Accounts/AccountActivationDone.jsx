import React from 'react'
import { Link } from 'react-router-dom';

const AccountActivationDone = () => {

    const activationStyles = {
        margin : '2rem 0rem',
    }

    const linkStyles = {
        textDecoration : 'none',
    }

    return (
        <div style={activationStyles}>
            <h3>Your account has been activated successfully</h3>
            <h3><Link style={linkStyles} to='/login'>Login</Link> to continue</h3>
        </div>
      );
}
 
export default AccountActivationDone;