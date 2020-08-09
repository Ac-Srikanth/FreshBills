import React from 'react'
import {connect} from 'react-redux'
import {Layout, Menu} from 'antd'
import {Link} from 'react-router-dom'
import { withRouter } from "react-router-dom"
import './header.css'
const {Header} = Layout



class HeaderComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state={}
    }
    
    handleLogout = () => {
        // let history = useHistory()
        localStorage.removeItem('userDetails')
        console.log('pathname', this.props.location.pathname)
        this.props.history.push('/')
    }

    goToLogin = () => {
        this.props.history.push('/')
    }

    render () {
        return(
            this.props.location.pathname == '/'  ? '': (
            <Layout>
                <Header className='header-component'>
                <div className="logo">
                    <ion-icon class='icon-book' name="book" size="medium"></ion-icon>
                </div>
                {this.props.location.pathname == '/register' ? (
                    <Menu className='menu-component'  mode="horizontal">
                        <Menu.Item className="logout" key="1" onClick={this.goToLogin}>Login</Menu.Item>
                    </Menu>
                ): ''}
                {Object.keys(this.props.user).length !== 0 && this.props.location.pathname !== '/register'  ?  
                <Menu className='menu-component'  mode="horizontal">
                    <Menu.Item className='nav-item' key="1"><Link className='menu-item' to="/home">Home</Link></Menu.Item>
                    <Menu.Item className='nav-item' key="2"><Link className='menu-item' to="/customers">Customers</Link></Menu.Item>
                    <Menu.Item className='nav-item' key="3"><Link className='menu-item' to="/products">Products</Link></Menu.Item>
                    <Menu.Item className='nav-item' key="4"> <Link className='menu-item' to="/bills">Bills</Link></Menu.Item>
                    <Menu.Item className="logout" key="5" onClick={this.handleLogout}> Logout</Menu.Item>
                </Menu>: ''}
                </Header>
            </Layout>)
        )
    }
} 
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps)(HeaderComponent))