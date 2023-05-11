import React from 'react'
import userImage from '../Images/user.png'
import { Link } from 'react-router-dom'

const UserComment = (props) => {
    const {commentObj} = props
    return ( 
        <section className='commentSection'>
            <section className='imageAndName'>
                <img  className='userImage' alt='user profile' src={userImage} />
                <p className='userName'>{commentObj.user}</p>
            </section>
            <section className='commentArea'>
                <p>{commentObj.comment}</p>
                <section className='commentOptions'>
                    {
                        localStorage.getItem('id') ?
                        (<div>
                            <Link className='options'>Edit</Link>
                            <Link className='options'>Delete</Link>
                        </div>):
                        ''
                    }
                </section>
            </section>
        </section>
     )
}
 
export default UserComment