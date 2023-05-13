import React, { useContext, useEffect, useState } from 'react'
import { BlogPostContext } from './BlogPostApi'
import { toast } from 'react-toastify'
import BlogPostAbstractWithUserActions from './BlogPostAbstractWithUserActions'
import { Spinner } from 'react-bootstrap'

const MyPosts = () => {

    const {values} = useContext(BlogPostContext)
    const {handleMyPostSummary,handleDeletePosts} = values 
    const [data,setMyPosts] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        const response = async() => {
            const {data} = await handleMyPostSummary()
            setMyPosts(data)
        }
        response()
        setLoading(false)
    },[handleMyPostSummary])

    if(loading){
        return (
            <div className='spinnerContainer'>
                <Spinner className='spinner' animation="border" />
            </div>)
    }

    const handleClickDelete = (e,post) => {
        e.preventDefault()
        const response = async() => {
            const postid = await handleDeletePosts(post)
            const newPosts = data.filter(post =>(
                post.id!==postid
            ))
            setMyPosts(newPosts)
            toast('post deleted successfully',)
        }
        response()
   }

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