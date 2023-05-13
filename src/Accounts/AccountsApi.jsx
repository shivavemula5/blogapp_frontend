 import React, { createContext, useState } from 'react'
import getCookie from '../HelperClasses/CSRFHelper'
import {toast} from 'react-toastify'
import { Spinner } from 'react-bootstrap'

export const AuthTokenContext = createContext()

const AccountsApi = ({children}) => {
    
    const [token,setToken] = useState(localStorage.getItem('token'))
    const [name,setName] = useState('')
    const [loading,setLoading] = useState(false)

    let Request = async(path,{data=null,method='GET'}) => {
        console.log(path,data)
        try{
            const response = await fetch(path,{
                method ,
                headers : {
                    Authorization : token ? `Token ${token}` :'',
                    "content-type" : "application/json",
                    "X-CSRFToken" : getCookie("csrftoken"),
                    'Access-Control-Request-Method': '*',
                    'Access-Control-Request-Headers': 'Content-Type',
                },
                body : method !== 'DELETE' && method !== 'GET' ? JSON.stringify(data) :null  
            })
            if(response.status>=500){
                toast(`server error: ${response.status}`)
                throw new Error('some error has occurred')
            }
            const json = response.status !== 204  ? await response.json() : null
            console.log(json)
            if(json && response.status===400){
                Object.keys(json).map(key=>(
                   toast(json[key][0])
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

    const createSpinner = (message) =>{
        if(loading)
            return (<Spinner className='spinner' size='sm' animation="border" /> )
        else
            return message
    }

    const handleError = (message) =>{
        if( typeof(message) === "string" && message==='error' )
            return true
        return false
    }

    const handleRegister = async(name,email,password,re_password,callback) => {
        setLoading(true)
        const path = 'https://blogapp-backend.herokuapp.com/auth/users/'
        const data = {'name':name,'email':email, 'password':password,'re_password':re_password}
        const method = 'POST'
        const message = await Request(path,{data:data,method:method})
        if(handleError(message)){
            setLoading(false)
            return 
        }
        setLoading(false)
        toast('Registration successful , please activate your account and continue to login')
        callback()
    } 
    
    const handleLogin = async(email,password,callback) => {
        setLoading(true)
        const path= 'https://blogapp-backend.herokuapp.com/auth/token/login/'
        const data = { 'email':email,'password':password }
        const method = 'POST'
        const message = await Request(path,{data:data,method:method})
        console.log(message.auth_token)
        if(handleError(message)){
            setLoading(false)
            return 
        }
        localStorage.setItem('token',message.auth_token)
        setToken(message.auth_token)
        setLoading(false)
        callback()
        toast('Login successfull')
    }

    const handleLogout = () => {
        setToken('')
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        localStorage.clear()
        toast('Logout successfull')
    }

    const handleProfile = async() => {
        setLoading(true)
        const path = 'https://blogapp-3f83.onrender.com/auth/users/me/'
        const method = 'GET'
        const message = await Request(path,{data:null,method})
        if(handleError(message))
            return      
        localStorage.setItem('id',message.id)
        localStorage.setItem('name',message.name)
        localStorage.setItem('email',message.email)
        setName(message.name)
        setLoading(false)
    }
    
    const handleResetPassword = async (email) => {
        setLoading(true)
        const path = 'https://blogapp-3f83.onrender.com/auth/users/reset_password/'
        const data = {'email':email}
        const method = 'POST'
        const message = await Request(path,{data:data,method: method})
        if(handleError(message)){
            setLoading(false)
            return 
        }
        setLoading(false)
        toast('An email with instructions about how to reset password has been sent')
    }
    
    const handleResetPasswordConfirm = async(emailUid,emailToken,password,confirmpassword,callback) => {
        setLoading(true)
        const path = 'https://blogapp-3f83.onrender.com/auth/users/reset_password_confirm/'
        const data = {'uid':emailUid,'token':emailToken,'new_password':password,'re_new_password':confirmpassword}
        const method = 'POST'
        const message = await Request(path,{data:data,method: method})
        if(handleError(message)){
            setLoading(false)
            return 
        }
        setLoading(false)
        callback()
        handleLogout()
    }

    const handleChangePassword = async(currentpassword,password,confirmpassword) => {
        setLoading(true)
        const path = 'https://blogapp-3f83.onrender.com/auth/users/set_password/'
        const data = {'current_password':currentpassword,'new_password':password,'re_new_password':confirmpassword}
        const method = 'POST'
        const message = await Request(path,{data:data,method:method})
        if(handleError(message)){
            setLoading(false)
            return
        }
        setLoading(false)
        toast('your pasword has been changed successfully')
        handleLogout()
    }

    const handleActivation = async(uid,token,callback) => {
        setLoading(true)
        const path = 'https://blogapp-3f83.onrender.com/auth/users/activation/'
        const data = {'uid':uid, 'token':token}
        const method = 'POST'
        const message = await Request(path,{data:data,method:method})
        if(handleError(message)){
            setLoading(false)
            return 
        }
        setLoading(false)
        callback()
    }

    const handleResendActivation = async(email) => {
        setLoading(true)
        const path = 'https://blogapp-3f83.onrender.com/auth/users/resend_activation/'
        const data= {'email':email }
        const method = 'POST'
        const message = await Request(path,{data:data,method:method})
        if(handleError(message)){
            setLoading(false)
            return 
        }
        setLoading(false)
        toast('an email with activation link has been sent to your mail box')
    }

    const value = {
        token,
        name,
        loading,
        createSpinner,
        handleRegister,
        handleLogin,
        handleLogout,
        handleChangePassword,
        handleResetPassword,
        handleResetPasswordConfirm,
        handleProfile,
        handleActivation,
        handleResendActivation,
    }

    return <AuthTokenContext.Provider value={{value}}> {children} </AuthTokenContext.Provider>
}
 
export default AccountsApi