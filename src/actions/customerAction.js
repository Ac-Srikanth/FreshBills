import axios from '../config/axios'


export const getCustomer = (customers) => {
    return {type: 'SET_CUSTOMERS', payload: customers}
}

export const addCustomer = (customer) => {
    return {type: 'ADD_CUSTOMER', payload: customer}
}

export const updateCustomer = (id, customer) => {
    return {type: 'EDIT_CUSTOMER', payload:{id, customer}}
}

export const deleteCustomer = (id) => {
    return {type: 'DELETE_CUSTOMER', payload: id}
}



export const startGetCustomer = () => {
    return ((dispatch) => {
       let loginInfo = localStorage.getItem('userDetails')
       axios.get('/customers',{
           headers: {
               'Authorization': `Bearer ${loginInfo}`
           }
       })
       .then((response) =>{
           console.log(response.data)
           const customers = response.data
           dispatch(getCustomer(customers))
       }) 
       .catch((error) =>{
           console.log(error)
       })
    })
}
export const startAddCustomer = (formData) => {
        return((dispatch) => {
        let loginInfo = localStorage.getItem('userDetails')    
        axios.post('/customers',formData,
        {
            headers: {
                'Authorization': `Bearer ${loginInfo}`
            }
        })
        .then((response) =>{
            console.log(response)
            const customer = response.data
            dispatch(addCustomer(customer))
        })
        .catch((error) =>{
            console.log(error)
        })
    })
}

export const startDeleteCustomer = (id) => {
    return ((dispatch)=>{
        let loginInfo = localStorage.getItem('userDetails')
        axios.delete(`/customers/${id}`,{
            headers: {
                'Authorization': `Bearer ${loginInfo}`
            }
        })
        .then((response) => {
            const customer = response.data
            dispatch(deleteCustomer(id, customer))
        })
    })
}

export const startUpdateCustomer = (id, customer) => {
    return ((dispatch)=> {
        let loginInfo = localStorage.getItem('userDetails')
        axios.put(`/customers/${id}`, customer, {
            headers: {
                'Authorization': `Bearer ${loginInfo}`
            }
        })
        .then((response) => {
            // const user = response.data
            dispatch(updateCustomer(id, customer))
        })
        .catch((error) => {
            console.log('Error in Updating', error)
        })
    })
}