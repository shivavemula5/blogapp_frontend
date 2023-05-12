import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import { ToastContainer   } from 'react-toastify'
import '../Global.css'

import AccountsApi from '../Accounts/AccountsApi.jsx'
import BlogPostApi from '../BlogPosts/BlogPostApi.jsx'
import Layout from './Layout.jsx'
import Register from '../Accounts/Registration.jsx'
import Login from '../Accounts/Login.jsx'
import AccountActivation from '../Accounts/AccountActivation.jsx'
import AccountActivationDone from '../Accounts/AccountActivationDone.jsx'
import ResendActivationMail from '../Accounts/ResendActivationMail.jsx'
import ResetPassword from '../Accounts/ResetPassword.jsx'
import ResetPasswordConfirm from '../Accounts/ResetPasswordConfirm.jsx'
import ResetPasswordDone from '../Accounts/ResetPasswordDone.jsx'
import ChangePassword from '../Accounts/ChangePassword.jsx'
import Logout from '../Accounts/Logout.jsx'
import PrivateRoute from '../HelperClasses/PrivateRoute.jsx'
import Profile from '../Accounts/Profile.jsx'
import Home from './Home.jsx'
import SupportMe from '../Payments/SupportMe.jsx'
import AcknowledgePayment from '../Payments/AcknowledgePayment.jsx'
import BlogPostCreate from '../BlogPosts/BlogPostCreate.jsx'
import BlogPostList from '../BlogPosts/BlogPostList.jsx'
import BlogPostDetail from '../BlogPosts/BlogPostDetail.jsx'
import BlogPostDelete from '../BlogPosts/BlogPostDelete.jsx'
import LikedPosts from '../BlogPosts/LikedPosts.jsx'
import SavedPosts from '../BlogPosts/SavedPosts'
import ErrorPage from '../Accounts/ErrorPage.jsx'

const App = () => {
    return ( 
        <AccountsApi>
            <BlogPostApi>
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route path='' element= {<Home/>} />

                            <Route path='/register' element={<Register/>} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/logout' element={<Logout />} />
                            <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>} />
                            <Route path='/password/reset' element={<PrivateRoute><ResetPassword/></PrivateRoute>} />
                            <Route path='/password/reset/confirm/:uid/:token' element={<PrivateRoute><ResetPasswordConfirm/> </PrivateRoute>}/>
                            <Route path='/password/reset/done' element={<PrivateRoute><ResetPasswordDone/></PrivateRoute> } />
                            <Route path='/password/change' element={<PrivateRoute><ChangePassword/> </PrivateRoute>} />
                            <Route path='/activate/:uid/:token' element={<AccountActivation/>} />
                            <Route path='/account/activation/done' element={<AccountActivationDone/>} />
                            <Route path='/resend/activation/link' element={<ResendActivationMail/>} />
                            <Route path='/support/me' element={<SupportMe/>} /> 
                            <Route path='/acknowledge/payment' element={<AcknowledgePayment/>} />
                            
                            <Route path='/blogpost/create' element={<BlogPostCreate/>} />
                            <Route path='/blogpost/list' element={<BlogPostList/>} />
                            <Route path='/blogpost/detail/:id' element={<BlogPostDetail />} />  
                            <Route path='/blogpost/:id/delete' element={<BlogPostDelete/>} />  
                            <Route path='/saved/posts' element={<SavedPosts/>} />
                            <Route path='/liked/posts' element={<LikedPosts/>} />  
                            <Route path='*' element={<ErrorPage/>} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
                <ToastContainer />
            </BlogPostApi>
        </AccountsApi>
     ); 
}
 
export default App