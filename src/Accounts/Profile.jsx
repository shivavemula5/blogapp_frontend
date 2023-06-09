import React, { useContext, useEffect, useState } from 'react'
import { AuthTokenContext } from './AccountsApi'
import user from '../Images/user.png'
import mail from '../Images/mail.png'
import BlogPostAbstractWithUserActions from '../BlogPosts/BlogPostAbstractWithUserActions'
import { Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { BlogPostContext } from '../BlogPosts/BlogPostApi'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

    const {value} = useContext(AuthTokenContext)
    const {handleProfile} = value 
    const {values} = useContext(BlogPostContext)
    const {handleDeletePosts,handleMyPostSummary} = values
    const [posts,setPosts] = useState([])
    const followers = ['ram','shiva','vemula','dullu','ranjan']
    const [loading,setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(()=>{
        const response = async() => {
            await handleProfile()
            setLoading(false)
        }
        response()
    },[])

    useEffect(()=>{
        const response = async() => {
            const {data} = await handleMyPostSummary()
            setPosts(data)
        }
        response()
        setLoading(false)
    },[])

    if(loading){
        return (
            <div className='spinnerContainer'>
                <Spinner className='spinner' animation="border" />
            </div>)
        }

        const handleClickDelete = (e,post) => {
            e.preventDefault()
            const oldData = posts
            const response = async() => {
                const postid = await handleDeletePosts(post)
                console.log(postid)
                const newPosts = posts.filter(post =>(
                        post.id!==postid
                ))
                setPosts(newPosts)
                toast('post deleted successfully')
                if(postid===null){
                    setPosts(oldData)
                    toast('some error has occured')
                }
            }
            response()
       }

    return ( 
        <section className='container profileSection'>
            <section className='profilePostsSection'>
                <h1 className='profileHeading'>{localStorage.getItem('name')}</h1>
                <hr/>
                <h2>My posts</h2>
                <section className='overallMyPosts'>
                    <section className='mainPosts'>
                        {
                            posts ? (posts.map( (post) => (
                                    <div key={post.id}>
                                        <BlogPostAbstractWithUserActions handleClickDelete = {handleClickDelete} posts={post} />
                                    </div>))):
                                <></>
                        }
                    </section>
                </section>
            </section>
            <section className='profileImageSection'>
                <img className='profileImage' src={user} alt='user profile' />
                <p className='profileName'>{localStorage.getItem('name')}</p>
                <p className='profileDescription'>Interested in backend technologies , I like to write blogs , answer qustions on quora , medium and many other sites</p>
                <section className='followAndMail'>
                    <button className='follow btn btn-success'>Follow</button>
                    <img src={mail} className='profileMail' alt='user mail'/>
                </section>
                <section className='following'>
                    <p>Following</p>
                    {
                        followers.map(user => (
                            <p key={user}>{user}</p>
                        ))
                    }
                </section>
            </section>
        </section>
     );
}
 
export default Profile