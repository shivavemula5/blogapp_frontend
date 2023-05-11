import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { BlogPostContext } from './BlogPostApi'
import UserComment from './UserComment'
import { toast } from 'react-toastify'

const CommentForm = (props) => {
    
    const [comment,setComments] = useState('')
    const [comments,setGetComments] = useState([])

    const {postId} = props
    const {values} = useContext(BlogPostContext)
    const {handlePostComments,handleGetComments} = values

    useEffect(()=>{
        const response = async()=>{
            const data = await handleGetComments(postId)
            setGetComments(data)
        }
        response()
    },[handleGetComments,postId])

    const handleChange = (e) => {
        setComments(e.target.value)
    }

    const handleSubmit = (e,postid,comment) => {
        e.preventDefault()
        if(localStorage.getItem('id')){
        const response = async() => {
            const data = await handlePostComments(postid,comment)
            if(data && typeof(data) ==='object'){
                const newComments = [...comments]
                newComments.push(data)
                setGetComments(newComments)
                setComments('')
            }
            else
                toast('some error has occurred while adding comments')
        }
        response()
        }else{
            setComments('')
            toast('you must be logged in to react for this post')
        }
    }

    return ( 
        <section>
            <section>
                <Form onSubmit={(e,PostId = postId , Comment=comment)=>(handleSubmit(e,PostId,Comment))}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Comments</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder='Enter comments here' value={comment} onChange={handleChange} />
                    </Form.Group>
                    <Button className='btn btn-primary' type='submit'>submit</Button>
                </Form>
            </section>
            <section>
                {
                    comments ? 
                    comments.map((comment)=>(<UserComment commentObj = {comment} key={comment.id}/>)):
                    ''
                } 
            </section>
        </section>
    )
}
 
export default CommentForm