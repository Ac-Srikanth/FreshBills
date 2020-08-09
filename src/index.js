import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'

import App from './App'

import configureStore from './store/configureStore.js'
import {startGetUser} from './actions/userAction'
import {startGetCustomer} from './actions/customerAction'
import {startGetProducts} from './actions/productAction'

const store = configureStore()

console.log('Initial state',store.getState())

store.subscribe(()=>{
    console.log('Subscribe', store.getState())
})

//for handling page reloads
if(localStorage.getItem('userDetails')) {   
    store.dispatch(startGetUser())
    store.dispatch(startGetCustomer())
    store.dispatch(startGetProducts())
}

const jsx = (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)



ReactDOM.render(jsx, document.getElementById('root'))