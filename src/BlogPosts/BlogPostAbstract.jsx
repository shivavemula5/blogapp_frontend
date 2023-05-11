import React, { useContext } from 'react'
import {  Card } from 'react-bootstrap'
import SavePostSymbol from './SavePostSymbol';
import LikeSymbol from './LikeSymbol';
import CommentSymbol from './CommentSymbol';
import { useNavigate } from 'react-router-dom';

const BlogPostAbstract = (props) => {

   const {posts,saved,liked} = props

   const navigate = useNavigate()

   const handleClick = (post) => {
    return navigate(`/blogpost/detail/${post.id}/`,{state:{liked:liked}})
   }

    return ( 
            <Card className='blogPostCard'>
                <section className='bodyAndImageSections'>
                    <section className='bodySection'>
                        <Card.Body className='cardBody'>
                            <Card.Title className='blogPostCardTitle' onClick={(e,Post=posts)=>handleClick(Post)}>{posts.title}</Card.Title>
                            <Card.Text>{posts.body}</Card.Text>
                            <section className='miscellaneous'>
                                <div className='miscellaneousMargin'>{posts.created}</div>
                                <div className='miscellaneousDot'>.</div>
                                <div className='miscellaneousMargin'>{posts.time_required} min read</div>
                            </section>
                            <hr />
                            <section className='likeCommentSave'>
                                <section className='like'><LikeSymbol liked={liked} postId={posts.id}/></section>
                                <section className='comment'><CommentSymbol postId={posts.id}/></section>
                                <section className='save'><SavePostSymbol saved={saved} postId={posts.id}/></section>
                            </section>
                        </Card.Body>
                    </section>
                    <section className='placeBlogPostImageToEnd'>
                        <img className='blogPostImage' variant="top" src={posts.image} />
                    </section>
                </section>
            </Card>
     );
}
 
export default BlogPostAbstract