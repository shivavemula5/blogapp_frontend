import { useContext, useState } from 'react'
import {Button,Form,Card} from 'react-bootstrap'
import { BlogPostContext } from './BlogPostApi'
import { useNavigate } from 'react-router-dom'

function BlogPostCreate() {

    const {values} = useContext(BlogPostContext)
    const {handleCreatePost,loading,createSpinner} = values

    const [image,setImage] = useState('')
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [readTime,setReadTime] = useState('')

    const navigate = useNavigate()

    const handleChange = (e) => {
        if(e.target.name==='image')
            setImage(e.target.value)
        else if(e.target.name==='title')
            setTitle(e.target.value)
        else if(e.target.name==='content')
            setContent(e.target.value)
        else if(e.target.name==='time')
            setReadTime(e.target.value)
    }

    const handleSubmit = (e,image,title,content,time,callback=()=>{return navigate('/blogpost/list')}) => {
        e.preventDefault()
        handleCreatePost(image,title,content,time,callback)
    }

    return (
        <Card className='blogPostCreateForm'>
            <Form onSubmit={(e,Image=image,Title=title,Content=content,Time=readTime)=>handleSubmit(e,Image,Title,Content,Time)}>
                <Form.Group className="mb-3" controlId="formBasicImage">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="text" placeholder="Image link" name='image' onChange={(e)=>handleChange(e)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" name='title' onChange={(e)=>handleChange(e)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicContent">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" placeholder="Enter content here" name='content' onChange={(e)=>handleChange(e)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicTimeRequired">
                    <Form.Label>Read Time</Form.Label>
                    <Form.Control type="number" placeholder="Enter time " name='time' onChange={(e)=>handleChange(e)}/>
                </Form.Group>
        
                <Button variant="primary" type="submit" disabled={loading} style={{width:'100%'}}>
                    {createSpinner('create')}
                </Button>
            </Form>
        </Card>
    )
}

export default BlogPostCreate