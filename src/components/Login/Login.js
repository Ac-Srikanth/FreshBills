import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {startLoginUser} from '../../actions/userAction'
import { Button, Card } from 'antd';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './login.css'


class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password: this.state.password
        }
        console.log({formData})
        const redirect = () => {
            return this.props.history.push('/home')
        }
        this.props.dispatch(startLoginUser(formData, redirect))
    }
    render () {
        return (
            <div className="login-main">
             <div className="login-container">
                <ion-icon class='icon-book' name="book"></ion-icon>   
                <h2 className="login-heading">Sign in to Fresh Bills</h2>
                    <div className="login-group">
                        <Card className="login-card" style={{border: '1px solid #d8dee2'}}>
                            <form onSubmit={this.handleSubmit}>
                                <label className="group-label" htmlFor="email">Email*</label><br /> 
                                <input  
                                 className="group-input" 
                                 type="text" 
                                 id="email" 
                                 placeholder="Enter Email" 
                                 name="email" 
                                 value={this.state.username} 
                                 onChange={this.handleChange} 
                                 required 
                                 />
                                 <br />
                                 <label className="group-label" htmlFor="password">Password*</label><br />
                                <input className="group-input" type="password" id="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} required={true} /><br />
                                <Button block size="medium" id="green-button" type="primary" htmltype="submit" onClick={this.handleSubmit}> Sign in </Button>         
                            </form>
                            <ToastContainer containerId="errorlogin" autoClose={5000} />
                        </Card>
                    </div>            
                    <div className="login-subcard-group">
                        <Card className="login-subcard" style={{border: '1px solid #d8dee2', paddingBottom: '20px', textAlign: 'center'}}>
                            <p>New to FreshBills? <Link to="/register">Create an account.</Link></p>
                            {/*   <p><Link to='/newform'>New Form</Link></p> */}
                        </Card>
                    </div>
                    </div>               
                 </div>
           
        )
    }
}

export default connect()(Login)