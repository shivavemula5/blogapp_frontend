import React, { useEffect, useState } from 'react'
import comment from '../Images/comment.png'
import axios from 'axios'

const CommentSymbol= (props) => {
    const [commentCount,setCommentCount] = useState(0)
    const {postId} = props

    useEffect(() => {
        const response = async() => {
            const response = await axios(`/api/getcommentsforpost/${postId}/`)
            const {comments} = await response.data
            setCommentCount(comments)
        }
        response()
    },[commentCount,postId])

    return ( 
        <div className='commentSymbolDiv'>
            <img className="commentSymbol" alt='comment icon' src={comment} />
            <span className='commentCount'>{commentCount}</span>
        </div>
     )
}
 
export default CommentSymbol