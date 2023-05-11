import React from 'react'
import { Button } from 'react-bootstrap';

const BlogPostDelete = () => {
    return ( 
        <div>
            <h3>Are you sure you want to delete this post ? </h3>
            <Button variant='primary'>Delete</Button>
        </div>
     );
}
 
export default BlogPostDelete