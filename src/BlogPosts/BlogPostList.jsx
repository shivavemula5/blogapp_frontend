import React, { useContext, useEffect, useState } from 'react'
import BlogPostAbstract from './BlogPostAbstract'
import { BlogPostContext } from './BlogPostApi'
import { Form, Spinner  } from 'react-bootstrap'
import { InputGroup } from 'react-bootstrap'
import { toast } from 'react-toastify'
import OrderFilters from './OrderFilters'

const BlogPostList = () => {

    const {values} = useContext(BlogPostContext)
    const {handleGetPosts,
           handleSearchByTitle , 
           HandleCreatedAscending,
           HandleCreatedDescending,
           HandleTimeRequiredAscending,
           HandleTimeRequiredDescending,
           handleMySavedPostSummaryId,
           handleMyLikedPostSummaryId,
        } = values

   const [posts,setPosts] = useState([])
   const [saved,setSavedPosts] = useState([])
   const [liked,setLikedPosts] = useState([])
   const [loading, setLoading] = useState(true)
   const [search,setSearch] = useState('')

   useEffect(() => {
       const response = async() => {
        const {data} =  await handleGetPosts()
        if(localStorage.getItem('id')){
            const {saved} = await handleMySavedPostSummaryId()
            const {liked} = await handleMyLikedPostSummaryId()
            let saveId = saved.map(save => save.id)
            let likeId = liked.map(like => like.id)
            setSavedPosts(saveId)
            setLikedPosts(likeId)
        }
        setPosts(data)
        setLoading(false)
       }
       response()
    }, []);

    if (loading) {
        return (
            <div className='spinnerContainer'>
                <Spinner className='spinner' animation="border" />
            </div>)
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }
 
    const handleSubmit = async(e,search)=>{
        e.preventDefault()
        const data = await handleSearchByTitle(search)
        if ( data === 'error' || data.length === 0){
         setPosts([])
         toast('no matched posts found .....')
         return 
        }
        const newPosts = [...data]
        setPosts(newPosts)
      }

    const handleCreatedAscending = async(field) => {
        const data = await HandleCreatedAscending(field)
        const postsCreatedbyAsc = [...data]
        setPosts(postsCreatedbyAsc) 
    }  
    const handleCreateDescending = async(field) => {
        const data = await HandleCreatedDescending(field)
        const postsCreatedbyDsc = [...data]
        setPosts(postsCreatedbyDsc) 
    }      
    const handleTimeRequiredAscending = async(field) => {
        const data = await HandleTimeRequiredAscending(field)
        const postsTimeRequiredbyAsc = [...data]
        setPosts(postsTimeRequiredbyAsc) 
    }      
    const handleTimeRequiredDescending = async(field) => {
        const data = await HandleTimeRequiredDescending(field)
        const postsTimeRequiredbyDsc = [...data]
        setPosts(postsTimeRequiredbyDsc) 
    }  

    return ( 
        <section className='mainSection'> 
            <section className='adsSection'>

            </section>
            <section>
                <section className='inputStyles'>
                    <Form onSubmit={(e,Search=search)=>handleSubmit(e,Search)}>
                        <InputGroup>
                            <Form.Control placeholder="Search by title" value={search} onChange={handleChange} aria-label="title"/>
                            <InputGroup.Text id="basic-addon1">
                            <button className="fa fa-search inputButtonStyles" aria-hidden="true" type="submit"></button>
                            </InputGroup.Text>
                        </InputGroup>
                    </Form> 
                </section>
                <section className='summaryAndOrderingSections'>
                    <section className='summarySection'>
                        {
                            posts.map( (post) => (
                                <div key={post.id}>
                                        {
                                            localStorage.getItem('id') ?
                                            (saved.includes(post.id) && liked.includes(post.id) ? 
                                                <BlogPostAbstract posts={post} saved={true} liked={true} /> :
                                                saved.includes(post.id) ? 
                                                    <BlogPostAbstract posts={post} saved={true} liked={false} /> :
                                                liked.includes(post.id)? 
                                                    <BlogPostAbstract posts={post} liked={true} saved={false} /> :
                                                <BlogPostAbstract posts={post} saved={false} liked={false} />):
                                            <BlogPostAbstract posts={post} saved={false} liked={false} />
                                        }
                                </div>
                            ))
                        }
                    </section>
                    <section className='orderingSection'>
                        <OrderFilters handleCreatedAscending={handleCreatedAscending} handleCreatedDescending={handleCreateDescending}
                            handleTimeRequiredAscending={handleTimeRequiredAscending} handleTimeRequiredDescending={handleTimeRequiredDescending}/>
                    </section>           
                </section>
            </section>
        </section>
     )
}
 
export default BlogPostList