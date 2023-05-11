import React, { useContext, useEffect, useState } from 'react'
import heart from '../Images/heart.png'
import fullHeart from '../Images/FullHeart (1).png'
import axios from 'axios'
import { toast } from 'react-toastify'
import { BlogPostContext } from './BlogPostApi'
import { Spinner } from 'react-bootstrap'

const LikeSymbol = ({liked,postId}) => {

    const {values} = useContext(BlogPostContext)
    const {HandleLikedPosts} = values

    let [like,setLike] = useState(liked)
    let [classValue,setClassValue] = useState(heart)
    let [likeCount,setLikeCount] = useState(0)
    const [loading,setLoading] = useState(true) 

    const handleLikeState = async() => {
        if(localStorage.getItem('id') && like){
            toast('post has already been liked')
            return 
        }
        if(localStorage.getItem('id') && like===false){
            setLike(true)
            setClassValue(fullHeart)    
            setLikeCount(likeCount+1)
            const message = await HandleLikedPosts(postId)
            if(typeof message === 'string' && message === 'error'){
                setLike(false)
                setClassValue(heart)
                setLikeCount(likeCount-1)
            }
        }
        else
            toast('you must be logged in to react for this post')
    }

    useEffect(()=>{
        
        if(localStorage.getItem('id') && like)
            setClassValue(fullHeart)

        const response = async() => {
            const response = await axios(`/api/getlikesforpost/${postId}/`)
            const {likes} = await response.data
            setLikeCount(likes)
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
        <div onClick={handleLikeState} className='likeSymbol'>
            <img className='likeSymbol' src={classValue} />
            <span className='likeCount'>{likeCount}</span>
        </div>
     )
}
 
export default LikeSymbol