import React from 'react'
import BlogPostAbstractWithUserActions from './BlogPostAbstractWithUserActions'

const MyPosts = (props) => {
    
    const {data,handleClickDelete} = props

    return ( 
        <section className='overallMyPosts'>
            <section className='mainPosts'>
                {
                    data ? (data.map( (post) => (
                            <div key={post.id}>
                                <BlogPostAbstractWithUserActions handleClickDelete = {handleClickDelete} posts={post} />
                            </div>))):
                        <></>
                }
            </section>
        </section>
     )
}
 
export default MyPosts