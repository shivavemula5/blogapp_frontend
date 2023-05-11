import React, { useContext, useEffect, useState } from 'react'
import savedPost from '../Images/SavedPost.png'
import unsavedPost from '../Images/UnsavedPost.png'
import axios from 'axios'
import { BlogPostContext } from './BlogPostApi'
import { toast } from 'react-toastify'

const SavePostSymbol = ({saved,postId}) => {

    const {values} = useContext(BlogPostContext)
    const {HandleSavedPosts} = values

    const [postStatus,setPostStatus] = useState(saved)
    const [postType,setPostType] = useState(unsavedPost)
    const [savedCount,setSavedCount] = useState(0)

    const handlePostStatus = async() => {
        if(postStatus && localStorage.getItem('id')){
            toast('post has already been saved')
            return 
        }
        if(postStatus===false && localStorage.getItem('id')){
            setPostStatus(true)
            setPostType(savedPost)
            const savedcount = savedCount
            setSavedCount(savedcount+1)
            const message = await HandleSavedPosts(postId)
            if(typeof message === 'string' && message === 'error'){
                setPostStatus(false)
                setPostType(unsavedPost)
                setSavedCount(savedcount)
            }
        }
        else
            toast('you must be logged in to react fot this post')
    }

    useEffect(()=>{
        if(postStatus && localStorage.getItem('id'))
            setPostType(savedPost)
        const response = async() => {
            const response = await axios(`/api/getsavedcountforpost/${postId}/`)
            const {saved} = await response.data
            setSavedCount(saved)
        }
        response()
    },[])

    return ( 
        <section className='saveSection' onClick={handlePostStatus}>
            <img className='savePost' src={postType} />
            <span className='savedCount'>{savedCount}</span>
        </section>
     )
}
 
export default SavePostSymbol