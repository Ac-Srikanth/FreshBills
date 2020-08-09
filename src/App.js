import React from 'react';
import { Route, Switch} from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Bills from './components/bills/Bills'
import newBill from './components/bills/newBill'
import viewBill from './components/bills/viewBill'
import Customers from './components/customers/Customers'
import Products from './components/products/Products'
import Header from './components/header/Header'
import Home from './components/Home/Home'
// import NewForm from './components/test/NewForm'
import './App.css'



class App extends React.Component {
    constructor () {
        super()
        this.state = {
            isAuthenticated: false
        }
    }
    componentDidMount () {
        let status = localStorage.getItem('userDetails') ? true: false
        this.setState({
            isAuthenticated: status
        })
    }

    changeStatus () {
        let status = localStorage.getItem('userDetails') ? true: false
        this.setState({
            isAuthenticated: status
        })
    }

    render () {
    return (        
            <div style={{overflow: 'hidden'}}>
                <Header isAuthenticated={this.state.isAuthenticated} />
                <Switch>               
                    <Route path="/" component={Login} exact={true}  />
                    <Route path="/register" component={Register} />
                    <Route path="/customers" component={Customers} />
                    <Route path="/home" component={Home} />  
                    <Route path="/products" component={Products} /> 
                    <Route path="/bills" component={Bills} exact={true} /> 
                    <Route path="/bills/addnew" component={newBill}/>
                    <Route path="/bills/:id" component={viewBill} />                    
                </Switch>        
            </div>   
    )}
}

export default App