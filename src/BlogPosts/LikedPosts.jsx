import React, { useContext, useEffect, useState } from 'react'
import { BlogPostContext } from './BlogPostApi'
import BlogPostAbstract from './BlogPostAbstract'
import { Spinner } from 'react-bootstrap'

const LikedPosts = () => {

    const {values} = useContext(BlogPostContext)
    const {handleMyLikedPostSummary,handleMySavedPostSummaryId} = values

    const [data,setPosts] = useState([])
    const [saved,setSavedPosts] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        const response = async()=>{
            const {liked} = await handleMyLikedPostSummary()
            const {saved} = await handleMySavedPostSummaryId()
            let saveId = saved.map(save => save.id)
            setPosts(liked)
            setSavedPosts(saveId)
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
        <section className='likedPostsSection'>
                        {
                            data.map( (post) => (
                                <div key={post.id}>
                                        {
                                            localStorage.getItem('id') ? 
                                            (
                                                saved.includes(post.id) ?
                                                <BlogPostAbstract posts={post} liked={true} saved={true} /> :
                                                <BlogPostAbstract posts={post} liked={true} saved={false} /> 
                                            ):
                                            <BlogPostAbstract posts={post} saved={false} liked={false}/>
                                        }
                                </div>
                            ))
                        }
        </section>
 
     )
}
 
export default LikedPosts