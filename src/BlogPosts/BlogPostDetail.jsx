import React from 'react'
import { Card } from 'react-bootstrap'
import LikeSymbol from './LikeSymbol'
import CommentSymbol from './CommentSymbol'
import CommentForm from './CommentForm'
import { useLocation, useParams } from 'react-router-dom'

const BlogPostDetail = () => {

    const location = useLocation()

    const {id} = useParams()
    const {liked} = location.state

    return ( 
        <section className='blogDetailMainSection'> 
            <section>
                <Card className='contentCard'>
                    
                    <Card.Header className='contentCardHeader'>
                            <h1>Get inspired by the winners of Wiki Loves Monuments, the world’s largest photo contest</h1>
                            <p className='contentCardHeaderText'>
                                Out of more than 150,000 submissions from 3,700 participants in 30+ countries, fifteen winning images were announced today in the thirteenth annual Wiki Loves Monuments photography contest
                            </p>
                    </Card.Header>

                    <Card.Img variant="top" src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*UnNH6DgmtzcebE3BarqhFQ.jpeg" />
                    
                    <Card.Body>
                        <Card.Text className='contentCardBodyText'>
                            
                                The contest serves as a platform for global collaboration in providing free access to mesmerizing photos of monuments from all over the planet. As part of the competition, photographers donate their images to Wikimedia Commons, the free repository that holds most of the images used on Wikipedia, to ensure that the world’s most visible cultural heritage is documented and held in trust for future generations.
                                Since the first edition of Wiki Loves Monuments in 2010, more than 2.8 million photos were submitted by over 60,000 participants all around the world. This year, the competition elicited 150,000 image submissions uploaded by 3,700 people.

                                The 2023 winners come from 11 different countries, including Thailand, Poland, Malaysia, Brazil, Armenia, and others, and were selected from a group of national winners by an international jury of experts. You can see them all below.
                            
                        </Card.Text>
                    </Card.Body>

                    <Card.Footer className='likeCommentDetail'> 
                        <LikeSymbol className='like' liked={liked} postId={id} />
                        <CommentSymbol className='comment' postId={id} />
                    </Card.Footer>

                </Card>
            </section>
            <section className='commentForm'>
                <CommentForm postId={id} />
            </section>
        </section>
     )
}
 
export default BlogPostDetail