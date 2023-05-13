import React from 'react'
import coffee from '../Images/coffee.png'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const SupportMe = () => {
    return ( 
            <Card className='supportMeCard'>
                <Card.Img variant="top" src={coffee} />
                <Card.Body>
                    <Card.Title>Coffee</Card.Title>
                    <Card.Text>
                        Buy me coffee , your gratitude means a lot to me 
                        <span className='supportMePrice'>$20</span>      
                    </Card.Text>
                    <form action={`https://blogapp-frontend-8los.onrender.com/api/stripe/create-checkout-session`} method="POST">
                        <Button variant='primary' type="submit">Checkout</Button>
                    </form>
                </Card.Body>
            </Card>
     );
}
 
export default SupportMe;