import axios from '../config/axios'
import { toast } from "react-toastify";

export const setUser = (user) => {
    return {type: 'SET_USER', payload: user}
}

export const startRegisterUser = (formData, redirect) => {
    return () => {
        axios.post('/users/register', formData)
            .then((response)=> {
                if (response.data.hasOwnProperty('errors')) {
                    console.log(response.data)
                    toast.error(response.data.message, {
                        position: "top-center",
                        hideProgressBar: true,
                        containerId: "errorRegister"
                    })
                }else {
                    alert('success')
                    redirect()
                }
            })
            .catch((err)=>{
                console.log('error in catch section', err)
            })
    }
}

export const startLoginUser = (formData, redirect) => {
    return (dispatch) => {
        axios.post('/users/login', formData)
        .then((response) => {
            if(response.data.hasOwnProperty('errors')){
                console.log('Error in Login', response.data.errors)
                toast.error("Invalid Email Or Password", {
                    position: "top-center",
                    hideProgressBar: true,
                    containerId: "errorlogin"
                })
            }else {
                console.log(response.data)                
                localStorage.setItem('userDetails', response.data.token)
                let loginInfo = localStorage.getItem('userDetails')
                console.log('logininfo', loginInfo)
                toast.success('User successfully Logged IN' ,{
                    position: "top-center",
                    hideProgressBar: true,
                    containerId:"successlogin"
                })
                axios.get('/users/account', {
                    headers: {
                        'Authorization': `Bearer ${loginInfo}`
                    }
                })
                .then((response)=> {
                    const user = response.data
                    dispatch(setUser(user))                   
                    redirect()                    
                })
                .catch((err) => {
                    alert(err)
                })
               // redirect()
            }
        })
        .catch((err) => {
            console.log('error in catch section', err)
            toast.error(err);
        })
    }
}

export const startGetUser = () => {
    return ((dispatch)=>{
        let loginInfo = localStorage.getItem('userDetails')
        axios.get('/users/account', {
            headers: {
                'Authorization': `Bearer ${loginInfo}`
            }
        })
        .then((response) => {
            const user = response.data
            dispatch(setUser(user))
        })
        .catch((err) => {
            alert(err)
        })
    })
}