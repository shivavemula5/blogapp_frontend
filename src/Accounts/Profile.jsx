import React, { useContext, useEffect, useState } from 'react'
import { AuthTokenContext } from './AccountsApi'
import user from '../Images/user.png'
import mail from '../Images/mail.png'
import MyPosts from '../BlogPosts/MyPosts'
import { Spinner } from 'react-bootstrap'

const Profile = () => {

    const {value} = useContext(AuthTokenContext)
    const {handleProfile} = value 
    const followers = ['ram','shiva','vemula','dullu','ranjan']
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        const response = async() => {
            await handleProfile()
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
        <section className='container profileSection'>
            <section className='profilePostsSection'>
                <h1 className='profileHeading'>{localStorage.getItem('name')}</h1>
                <hr/>
                <h2>My posts</h2>
                <MyPosts/>
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