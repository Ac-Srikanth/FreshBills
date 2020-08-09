import axios from '../config/axios'
import { toast } from "react-toastify";

export const getBills = (bills) => {
    return {type: 'GET_BILLS', payload: bills}
}

export const addBill = (bill) => {
    return {type: 'ADD_BILL', payload: bill}
}

export const getBill = (bill) => {
    return {type: 'GET_BILL', payload: bill}
}

export const deleteBill = (id) => {
    return {type: 'DELETE_BILL', payload: id}
}

export const startGetBills = () => {
    return ((dispatch) => {
        let loginInfo = localStorage.getItem('userDetails')
        axios.get('/bills', {
            headers: {
                'Authorization': `Bearer ${loginInfo}`
            }
        })
        .then((response) =>{
            console.log(response.data)
            const bills = response.data
            dispatch(getBills(bills))
        })
        .catch((error) => {
            console.log('Error in Fetching Bills', error)
        })
    })
}

export const startAddBill = (formData, redirect) => {
    return ((dispatch) => {
        let loginInfo = localStorage.getItem('userDetails')
        axios.post('/bills', formData, {
            headers: {
                'Authorization': `Bearer ${loginInfo}`
            }
        })
        .then((response)=> {
            console.log(response)
            const bill = response.data
            dispatch(addBill(bill))
            toast.success('Bill Added Successfully' ,{
                position: "top-center",
                hideProgressBar: true,
                containerId:"successBill"
            })
            setTimeout(() =>{
                redirect()
            },5000)
        })
        .catch((error) => {
            console.log(error)
        })
    })
}


export const startGetBill = (id) => {
    return (dispatch) => {
        let loginInfo = localStorage.getItem('userDetails')
        axios.get(`/bills/${id}`, {
            headers: {
                'Authorization': `Bearer ${loginInfo}`
            }
        })
        .then((response) => {
            console.log(response)
            const bill = response.data
            dispatch(getBill(bill))
        })
        .catch((error) =>{
            console.log(error)
        })

    }
}

export const startDeleteBill = (id) => {
    return((dispatch) => {
        let loginInfo = localStorage.getItem('userDetails')
        axios.delete(`/bills/${id}`, {
            headers: {
                'Authorization': `Bearer ${loginInfo}`
            }
        })
        .then((response)=> {
            // const bill = response.data
            dispatch(deleteBill(id))
        })
        .catch((error)=>{
            console.log(error)
        })
    })
}