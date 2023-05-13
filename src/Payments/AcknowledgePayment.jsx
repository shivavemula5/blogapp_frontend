import React, { useEffect , useState } from 'react'
import { useSearchParams } from 'react-router-dom';

const AcknowledgePayment = () => {

    const [searchParams] = useSearchParams()
    const [message,setMessage] = useState('')

    useEffect(()=>{
        if(searchParams.get('success'))
            setMessage('Your payment has been successfully processed')
        if(searchParams.get('cancel'))
            setMessage('Your payment has failed , please try again after some time')
    })

    return ( 
        <div>
            <h2>
                {message}
            </h2>
        </div>
     )
}
 
export default AcknowledgePayment