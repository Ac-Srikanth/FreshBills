import axios from '../config/axios'

export const getProducts = (products) => {
    return {type: 'SET_PRODUCTS', payload: products}
}

export const addProduct = (product) => {
    return {type: 'ADD_PRODUCT', payload: product}
}

export const deleteProduct = (id) => {
    return {type: 'DELETE_PRODUCT', payload: id}
}
export const updateProduct = (id, product) => {
    return {type: 'EDIT_PRODUCT', payload:{id, product}}
}


export const startGetProducts = () => {
    return ((dispatch) => {
        let loginInfo = localStorage.getItem('userDetails')
        axios.get('/products', {
            headers: {
                'Authorization': `Bearer ${loginInfo}`
            }
        })
        .then((response) =>{
            console.log(response.data)
            const products = response.data
            dispatch(getProducts(products))
        })
        .catch((error) =>{
            console.log(error)
        })
    })
}

export const startAddProduct = (formData) => {
    return((dispatch)=> {
        let loginInfo = localStorage.getItem('userDetails')
        axios.post('/products', formData, {
            headers: {
                'Authorization': `Bearer ${loginInfo}`
            }
        })
        .then((response)=>{
            console.log(response)
            const product = response.data
            dispatch(addProduct(product))
        })
        .catch((error)=>{
            console.log(error)
        })
    })
}

export const startDeleteProduct = (id) => {
    return ((dispatch) => {
        let loginInfo = localStorage.getItem('userDetails')
        axios.delete(`/products/${id}`, {
            headers: {
                'Authorization': `Bearer ${loginInfo}`
            }
        })
        .then((response) => {
            const product = response.data
            dispatch(deleteProduct(id, product))
        })
        .catch((error)=>{
            console.log(error)
        })
    })
}

export const startUpdateProduct = (id, product) => {
    return((dispatch) => {
        let loginInfo = localStorage.getItem('userDetails')
        axios.put(`/products/${id}`, product, {
            headers: {
                'Authorization': `Bearer ${loginInfo}`
            }
        })
        .then((response) => {
            const responseproduct = response.data
            dispatch(updateProduct(id, responseproduct))
        })
        .catch((error) =>{
            console.log('Error updating product', error)
        })
    })
}