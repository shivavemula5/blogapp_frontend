import React from 'react'
import { Card } from 'react-bootstrap'
import blogPost from '../Images/BlogPost.png'
import { Link } from 'react-router-dom'

const Home = () => {

    return ( 
        <div className='applicationCards'>
            <Card className='applicationCard'>
                <Card.Img variant="top" src={blogPost} className='blogpostImage' />
                <Card.Body>
                    <Card.Title>Blog Post</Card.Title>
                    <Card.Text>Exploring the untold stories of the world.</Card.Text>
                    <Link to='/blogpost/list' className='btn btn-primary'>View Application</Link>
                </Card.Body>
            </Card>
        </div>
     )
}
 
export default Home