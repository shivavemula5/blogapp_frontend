import React, { createContext, useContext, useState } from 'react'
import { AuthTokenContext } from '../Accounts/AccountsApi'
import getCookie from '../HelperClasses/CSRFHelper'
import { toast } from 'react-toastify'
import { Spinner } from 'react-bootstrap'

export const BlogPostContext = createContext()

const BlogPostApi = ({children}) => {

    const {value} = useContext(AuthTokenContext)
    const {token} = value
    const [loading,setLoading] = useState(false)

    let Request = async(path,{data=null,method='GET'}) => {
        try{
            const response = await fetch(path,{
                method ,
                headers : {
                    Authorization : token ? `Token ${token}` :'',
                    "content-type" : "application/json",
                    "X-CSRFToken" : getCookie("csrftoken"),
                },
                body : method!=='DELETE'&& method!=='GET' ? JSON.stringify(data) : null
            })
            if(response.status>=500){
                throw new Error('some error has occurred')
            }
            const json = method!=='DELETE' ? await response.json() : null
            console.log(response,json)
            if(json && response.status===400){
                Object.keys(json).map(key=>(
                    toast(json[key])
                ))
                throw new Error('some error has occurred')
            }
            if(json)
                return json
        }catch(error){
            console.log(error)
            return "error"
        }
    }

    /* Helper Method => PUBLIC */
    const handleError = (message) => {
        if(typeof message === 'string' && message === 'error') 
            return true
        return false
    }

    /* Helper Method => PUBLIC */ 
    const createSpinner = (message) =>{
        if(loading)
            return (<Spinner className='spinner' size='sm' animation="border" /> )
        else
            return message
    }

    /* Create Post => PRIVATE */
    const handleCreatePost = async(image,title,content,time,callback) => {
            setLoading(true)
            const path = '/api/posts/'
            const method = 'POST'
            const data = {'image':image, 'title':title, 'body':content,'time_required':time}
            const message = await Request(path,{data:data, method:method})
            if(handleError(message)){
                setLoading(false)
                return
            }
            setLoading(false)
            toast(`post with ${title} has been created !`)
            callback()
            return message
    }   

    /* Get Post =>  PUBLIC */
    const handleGetPosts = () => {
        const path = '/api/postsummary/'
        const method = 'GET'
        return Request(path,{data:null, method:method})
    }   

    /* Delete Post => PRIVATE */
    const handleDeletePosts = async(post) => {
        const path = `/api/posts/${post.id}`
        const method = 'DELETE'
        const message = await Request(path,{data:null, method:method})
        if(message)
            return
        return message
    }

    /* User Posts => PRIVATE */
    const handleMyPostSummary = () => {
        const path = '/api/my/postsummary/'
        const method = 'GET'
        return Request(path,{data:null, method:method})
    }

    /* User Saved Posts => PRIVATE */
    const handleMySavedPostSummary = () => {
        const path = '/api/my/saved/postsummary/'
        const method = 'GET'
        return Request(path,{data:null, method:method})
    }   

    /* User Liked Posts => PRIVATE */
    const handleMyLikedPostSummary = () => {
        const path = '/api/my/liked/postsummary/'
        const method = 'GET'
        return Request(path,{data:null, method:method})
    }

    /* User Saved Posts => PRIVATE */
    const handleMySavedPostSummaryId = () => {
        const path = '/api/my/saved/postsummary/id/'
        const method = 'GET'
        return Request(path,{data:null, method:method})
    }   

    /* User Liked Posts => PRIVATE */
    const handleMyLikedPostSummaryId = () => {
        const path = '/api/my/liked/postsummary/id/'
        const method = 'GET'
        return Request(path,{data:null, method:method})
    }

    /* Comments  PRIVATE  */
    const handlePostComments = (postid,comment) => {
        const path = `/api/posts/${postid}/comments/`
        const method = 'POST'
        const data = {'post':postid, 'comment':comment}
        return Request(path,{data:data, method:method})
    }

    /* Comments  PUBLIC */ 
    const handleGetComments = (postid) => {
        const path = `/api/posts/${postid}/comments/`
        const method = 'GET'
        return Request(path,{data:null, method:method})
    }

    /* Sorting  => PUBLIC */
    const handleSearchByTitle = (title) => {
        const path = `/api/posts/?search=${title}`
        const method = 'GET'
        return Request(path,{data:null, method:method})
    }

    /* Sorting  => PUBLIC */
    const HandleCreatedAscending = () => {
        const path = '/api/postsummary/orderbydateasc/'
        const method = 'GET'
        return Request(path,{data:null, method:method})
    }

    /* Sorting  => PUBLIC */    
    const HandleCreatedDescending = () => {
        const path = '/api/postsummary/orderbydatedesc/'
        const method = 'GET'
        return Request(path,{data:null, method:method})
    }

    /* Sorting  => PUBLIC */    
    const HandleTimeRequiredAscending = () => {
        const path = '/api/postsummary/orderbytimeasc/'
        const method = 'GET'
        return Request(path,{data:null, method:method})
    }

    /* Sorting  => PUBLIC */    
    const HandleTimeRequiredDescending = () => {
        const path = '/api/postsummary/orderbytimedesc/'
        const method = 'GET'
        return Request(path,{data:null, method:method})
    }

    /* Handle Reactions => PRIVATE */
    const HandleSavedPosts = async(postid) => {
        const userid = localStorage.getItem('id')
            const path = `/api/users/${userid}/saved_posts/`
            const method = 'POST'
            const data = {"saved":true,"user":userid,"post":postid}
            const message = await Request(path,{data:data,method:method})
            if(handleError(message))
                return 'error'
        }

    /* Handle Reactions => PRIVATE */
    const HandleLikedPosts = async(postid) => {
        const userid = localStorage.getItem('id')
        const path = `/api/users/${userid}/liked_posts/`
        const method = 'POST'
        const data = {"liked":true,"user":userid,"post":postid}
        const message = await Request(path,{data:data,method:method})
            if(handleError(message))
            return "error"
    }  

    /*Count Reactions => PUBLIC */
    const getLikeCountForPost = (postid) => {
        const path = `/api/getlikesforpost/${postid}/`
        const method = 'GET'
        return Request(path,{data:null,method:method})
    }
    /*Count Reactions => PUBLIC */
    const getCommentCountForPost = (postid) => {
        const path = `/api/getcommentsforpost/${postid}/`
        const method = 'GET'
        return Request(path,{data:null,method:method})
    }
    /*Count Reactions => PUBLIC */
    const getSaveCountForPost = (postid) => {
        const path = `/api/getsavedcountforpost/${postid}/`
        const method = 'GET'
        return Request(path,{data:null,method:method})
    }


    const values = {
        loading,
        createSpinner,
        handleCreatePost,
        handleGetPosts,
        handleDeletePosts,
        handlePostComments,
        handleGetComments,
        handleSearchByTitle,
        HandleCreatedAscending,
        HandleCreatedDescending,
        HandleTimeRequiredAscending,
        HandleTimeRequiredDescending,
        HandleSavedPosts,
        HandleLikedPosts,
        getLikeCountForPost,
        getCommentCountForPost,
        getSaveCountForPost,
        handleMyPostSummary,
        handleMySavedPostSummary,
        handleMyLikedPostSummary,
        handleMySavedPostSummaryId,
        handleMyLikedPostSummaryId,
    }

    return <BlogPostContext.Provider value = {{values}}> {children} </BlogPostContext.Provider>
}
 
export default BlogPostApi