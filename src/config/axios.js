import Axios from 'axios'

const axios = Axios.create({
    baseURL: ' https://dct-billing-app.herokuapp.com/api'
})

export default axios