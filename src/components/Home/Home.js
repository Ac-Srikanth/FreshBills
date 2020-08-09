import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card} from 'antd'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import customerslogo from '../../assets/images/customers.svg'
import billslogo from '../../assets/images/bills.svg'
import productslogo from '../../assets/images/products.svg'
import profilelogo from '../../assets/images/profile.svg'
import './home.css'


class Home extends React.Component {
    render() {
        return (
            <div>                
                <ToastContainer containerId="successlogin" autoClose={5000} />
                <div className="profile-container">                  
                  <Card className="profile-card" title="USER PROFILE" style={{ width: 640}}>
                    <div className="profile-info">
                       <div>
                            <p>USERNAME - {this.props.user.username}</p>
                            <p>EMAIL - {this.props.user.email}</p>
                            <p>ADDRESS - {this.props.user.address}</p>
                            {this.props.user.businessName ? (<p>BUSINESSNAME - {this.props.user.businessName}</p>): ''}
                        </div>
                        <div>
                            <img style={{'width': '100px'}} src={profilelogo} alt="profile" />
                        </div>
                    </div>                   
                  </Card>
                </div>
                <div className="container-items">
                    <Link to="/customers">
                        <Card className="card-item" title="Customers" bordered={false} style={{ width: 200 }} hoverable>
                            <img style={{'width': '100px', 'height': '95px'}} src={customerslogo} alt="logo" />
                        </Card>
                    </Link>
                    <Link to="/products">
                        <Card className="card-item" title="Products" bordered={false} style={{ width: 200 }} hoverable>
                            <img style={{'width': '100px', 'height': '95px'}} src={productslogo} alt="logo" />
                        </Card>
                    </Link>
                    <Link to="/bills">
                        <Card className="card-item" title="Bills" bordered={false} style={{ width: 200 }} hoverable>
                            <img style={{'width': '100px', 'height': '95px'}} src={billslogo} alt="logo" />
                        </Card>
                    </Link>
                </div>                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Home)