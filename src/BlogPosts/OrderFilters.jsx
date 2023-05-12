import React from 'react'
import { Card , ListGroup } from 'react-bootstrap';

const OrderFilters = (props) => {

    const {
        handleCreatedAscending,
        handleCreatedDescending,
        handleTimeRequiredAscending,
        handleTimeRequiredDescending
    } = props

    const filters= [
        'created',
        '-created',
        'time_required',
        '-time_required'
    ]

    return ( 
        <div>
             <Card className='filterCards'>
                <ListGroup variant="flush">
                    <ListGroup.Item className='filterTiles' onClick={(e,Created=filters[0])=>handleCreatedAscending(Created)}>date ascending</ListGroup.Item>
                    <ListGroup.Item className='filterTiles' onClick={(e,Created=filters[1])=>handleCreatedDescending(Created)}>date decending</ListGroup.Item>
                    <ListGroup.Item className='filterTiles' onClick={(e,time_required=filters[2])=>handleTimeRequiredAscending(time_required)}>read time ascending</ListGroup.Item>
                    <ListGroup.Item className='filterTiles' onClick={(e,time_required=filters[3])=>handleTimeRequiredDescending(time_required)}>read time decending</ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
     );
}
 
export default OrderFilters;