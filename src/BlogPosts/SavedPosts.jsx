import React, { useContext, useEffect, useState } from 'react'
import BlogPostAbstract from './BlogPostAbstract'
import { BlogPostContext } from './BlogPostApi'
import { Spinner } from 'react-bootstrap'

const SavedPosts = () => {

    const {values} = useContext(BlogPostContext)
    const {handleMySavedPostSummary,handleMyLikedPostSummaryId} = values

    const [data,setPosts] = useState([])
    const [liked,setLikedPosts] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        const response = async()=>{
            const {saved} = await handleMySavedPostSummary()
            const {liked} = await handleMyLikedPostSummaryId()
            let likeId = liked.map(like => like.id)
            setPosts(saved)
            setLikedPosts(likeId)
            setLoading(false)
        }
        response()
    },[])

    if(loading){
        return (
            <div className='spinnerContainer'>
                <Spinner className='spinner' animation="border" />
            </div>)
    }

    return ( 
        <section className='savedPostsSection'>
                        {
                            data.map( (post) => (
                                <div key={post.id}>
                                        {
                                            localStorage.getItem('id') ?
                                            (
                                                liked.includes(post.id) ?
                                                    <BlogPostAbstract posts={post} saved={true} liked={true} /> :
                                                    <BlogPostAbstract posts={post} saved={true} liked={false} />
                                            ):
                                            <BlogPostAbstract posts={post} saved={false} liked={false} />
                                        }
                                </div>
                            ))
                        }
        </section>
 
     )
}
 
export default SavedPosts