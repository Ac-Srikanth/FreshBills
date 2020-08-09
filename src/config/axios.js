import Axios from 'axios'

const axios = Axios.create({
    baseURL: ' http://dct-billing-app.herokuapp.com/api'
})

export default axios