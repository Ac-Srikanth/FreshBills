import React from 'react'
import {connect} from 'react-redux'
import {startRegisterUser} from '../../actions/userAction'
import { Card, Button } from 'antd';
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import './register.css'

 class Register extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            username: '',
            email: '',
            password: '',
            businessName: '',
            address: '',
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let {username, email, password, businessName, address} = this.state
        let formData = {
            username,
            email,
            password,
            businessName,
            address
        }
        const redirect = () => {
            return this.props.history.push('/')
        }
        // console.log(formData)
        this.props.dispatch(startRegisterUser(formData, redirect))
    }

    render () {
    return (
        <div className='register-div'>
            <div className='register-title'>
                <span className="register-main-title">Built for</span>
                <span className="register-main-title">business</span>
                <p className="register-sub-info">FreshBills is a  platform inspired by the way you work.</p><p className="register-sub-info">The one place for all your bills, customers and products.</p>
            </div>            
            <div className="register-align-div">
            <Card className="register-card" style={{border: '1px solid #d8dee2'}}>
                <form className="register-form" onSubmit={this.handleSubmit}>
                    <label className="register-group-label" htmlFor="username">UserName*</label>
                    <input className="register-group-input" type="text" id="username" name="username" value={this.state.username} onChange={this.handleChange} />
                    <label className="register-group-label" htmlFor="email">Email*</label>
                    <input className="register-group-input" type="text" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    <label className="register-group-label" htmlFor="password">Password</label>
                    <input className="register-group-input" type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <label className="register-group-label" htmlFor="business">Business Name</label>
                    <input className="register-group-input" type="text" id="business" name="businessName" value={this.state.businessName} onChange={this.handleChange} />
                    <label className="register-group-label" htmlFor="address">Address</label>
                    <textarea className="register-textarea" id="address" name="address" type="text" value={this.state.address} onChange={this.handleChange}/>
                     <Button block size="medium" id="register-green-button" type="primary" htmltype="submit" onClick={this.handleSubmit} >Sign up for FreshBills</Button>           
                </form>
                <ToastContainer containerId="errorRegister" autoClose={5000} />
            </Card>
            </div>
        
        </div>
    )
    }
}

export default connect()(Register)