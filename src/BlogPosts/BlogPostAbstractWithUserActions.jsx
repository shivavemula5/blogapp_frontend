import React from 'react'
import { Card , Button } from 'react-bootstrap'

const BlogPostAbstractWithUserActions = (props) => {

   const {posts} = props
   const {handleClickDelete} = props

    return ( 
        <Card className='myBlogPostCard'>
            <section className='bodyAndImageSections'>
                <section>
                    <Card.Body>
                        <Card.Title>{posts.title}</Card.Title>
                        <Card.Text>{posts.body}</Card.Text>
                        <section className='miscellaneous'>
                            <div className='miscellaneousMargin'>{posts.created}</div>
                            <div className='miscellaneousDot'>.</div>
                            <div className='miscellaneousMargin'>{posts.time_required} min read</div>
                        </section>
                    </Card.Body>
                </section>
                <section className='placeBlogPostImageToEnd'>
                    <Card.Img className='blogPostImage' variant="top" src={posts.image} />
                </section>
            </section>
            <Card.Footer> 
                <Button variant='primary' style={{margin:'0rem 1rem'}}>Edit</Button>
                <Button variant='danger' onClick={(e,Posts=posts)=>handleClickDelete(e,Posts)}>Delete</Button>
            </Card.Footer>
        </Card>
     )
}
 
export default BlogPostAbstractWithUserActions