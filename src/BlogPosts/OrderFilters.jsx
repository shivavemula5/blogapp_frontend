import React from 'react'
import { Card , ListGroup } from 'react-bootstrap';

const OrderFilters = (props) => {

    const {
        handleCreatedAscending,
        handleCreatedDescending,
        handleTimeRequiredAscending,
        handleTimeRequiredDescending
    } = props

    return ( 
        <div>
             <Card className='filterCards'>
                <ListGroup variant="flush">
                    <ListGroup.Item className='filterTiles' onClick={(e)=>handleCreatedAscending()}>date ascending</ListGroup.Item>
                    <ListGroup.Item className='filterTiles' onClick={(e)=>handleCreatedDescending()}>date decending</ListGroup.Item>
                    <ListGroup.Item className='filterTiles' onClick={(e)=>handleTimeRequiredAscending()}>read time ascending</ListGroup.Item>
                    <ListGroup.Item className='filterTiles' onClick={(e)=>handleTimeRequiredDescending()}>read time decending</ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
     );
}
 
export default OrderFilters;