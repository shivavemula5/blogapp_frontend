import React, { useContext, useEffect, useState } from 'react'
import { AuthTokenContext } from './AccountsApi'
import user from '../Images/user.png'
import mail from '../Images/mail.png'
import MyPosts from '../BlogPosts/MyPosts'
import { Spinner } from 'react-bootstrap'

const Profile = () => {

    const {value} = useContext(AuthTokenContext)
    const {handleProfile} = value 
    const [data,setMyPosts] = useState([])
    const followers = ['ram','shiva','vemula','dullu','ranjan']
    const [loading,setLoading] = useState(true)

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
            setMyPosts(data)
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
            const oldData = data
            const response = async() => {
                const newPosts = data.filter(post =>(
                    post.id!==postid
                ))
                setMyPosts(newPosts)
                toast('post deleted successfully',)
                const postid = await handleDeletePosts(post)
                if(postid===null){
                    setMyPosts(oldData)
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
                <MyPosts handleClickDelete={handleClickDelete} data={data}/>
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