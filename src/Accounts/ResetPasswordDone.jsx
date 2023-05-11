import React from 'react'
import { Link } from 'react-router-dom';

const ResetPasswordDone = () => {
    return ( 
        <p>
            Your password has been reset successfully <Link to='/login'>login</Link> to continue 
        </p>
     );
}
 
export default ResetPasswordDone;