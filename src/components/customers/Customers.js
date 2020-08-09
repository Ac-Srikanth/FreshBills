import React from 'react'
import {connect} from 'react-redux'
import {startAddCustomer,startGetCustomer, startDeleteCustomer ,startUpdateCustomer} from '../../actions/customerAction'
import { Collapse , Button, Popconfirm, message, Modal, Typography, Input } from 'antd';
import './customers.css'
const { Panel } = Collapse;
const { Text} = Typography;
const {Search} = Input;


class Customer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            formtoggle: false,
            name: '',
            mobile: '',
            email: '',
            id: '',
            editformtoggle: false,
            visible: false,
            editVisible: false,
            searchField: ''            
        }
    }
    componentDidMount () {
         if(this.props.customers.length == 0) {
            this.props.dispatch(startGetCustomer())
        }

    }
    
    handleToggle = () => {
        this.setState({formtoggle: true})
    }
    handleChange =(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formdata = {
            name: this.state.name,
            mobile: this.state.mobile,
            email: this.state.email
        }
        this.props.dispatch(startAddCustomer(formdata))
        this.setState({ name: '', mobile: '', email: '', visible: false})
    }

    handleDeleteCustomer = (id) => {
        this.props.dispatch(startDeleteCustomer(id))
    }

    handleEditToggle = (customer) => {
        this.setState({
            editformtoggle: true,
            id: customer._id,
            name: customer.name,
            mobile: customer.mobile,
            email: customer.email
        })
    }
    handleEditSubmit = (e) => {
        e.preventDefault()
        const formdata = {
            name: this.state.name,
            mobile: this.state.mobile,
            email: this.state.email
        }
        this.props.dispatch(startUpdateCustomer(this.state.id, formdata))
        this.setState({
            editVisible: false
        })
        message.success('Edited Customer Successfully');
    }
    callback = (key) => {
        console.log(key);
    }
    confirm =(id)  => {
        console.log(id);
        this.handleDeleteCustomer(id);
        setTimeout(() =>{
            message.error('Deleted');
        },1000)
       
    }
      
    cancel=(e)=> {
        console.log(e);
        message.success('Data Safe');
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
    };
    showEditModal = (customer) => {
        this.setState({
            editVisible: true,
            id: customer._id,
            name: customer.name,
            mobile: customer.mobile,
            email: customer.email
        })
    }
    
      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
          editVisible: false,
          id: '',
          name:'',
          mobile: '',
          email: ''
        });
      };

      handleSearch = (val) => {
          console.log(val)
      }

      searchCustomers = (e) => {         
        this.setState({
            searchField: e.target.value          
        })
      }
    
    
    
    render() {   
        let filteredCustomers = this.props.customers.filter((customer) => {
            return customer.name.toLowerCase().indexOf(this.state.searchField.toLowerCase()) !== -1;
        })
        return (
            <div>
                <div className="customer-header">
                    <h1>Customers Page</h1>
                    <Search className="search-box" value={this.state.searchField} placeholder="search customers" onChange={(val)=>this.searchCustomers(val)}  onSearch={(val)=>this.handleSearch(val)} enterButton />
                    <Button className="add-new-button" type="primary" onClick={this.showModal}>+ Add Customer</Button>
                </div>
                <Modal
                    title="ADD A NEW CUSTOMER"
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <form>
                        <div className="group-form">   
                            <label>Name</label>
                            <input className="group-input-customer" type="text" value={this.state.name} name="name" placeholder="name" onChange={this.handleChange}/><br />
                         </div>
                        <div className="group-form">
                            <label>Mobile</label>
                            <input className="group-input-customer" id="mobile" type="text" value={this.state.mobile} name="mobile" placeholder="mobile" onChange={this.handleChange}/><br />
                        </div>
                        <div className="group-form">
                            <label>Email</label>
                            <input className="group-input-customer" type="text" value={this.state.email} name="email" placeholder="email" onChange={this.handleChange}/><br />
                        </div>                               
                    </form>
                </Modal>        
                {               
                filteredCustomers && filteredCustomers.map((customer) => {
                    return (
                        <div className="accordian-panel"  key={customer._id}>
                            <div>
                            <Collapse accordion className="accordian-dropdown" onChange={this.callback}>              
                                <Panel header={customer.name.toUpperCase()} >
                                    <p><Text type="warning">Mobile:-</Text>{customer.mobile}</p>
                                    <p><Text type="danger">Email:-</Text>{customer.email}</p>
                                </Panel>
                            </Collapse>
                            </div>
                            <div>
                                <div className="actionButtons">
                                <Popconfirm
                                    title="Are you sure to delete this Customer?"
                                    onConfirm={()=>{this.confirm(customer._id)}}
                                    onCancel={this.cancel}
                                    okText="Yes"
                                    cancelText="No"
                                > 
                                <Button className="action-button" danger type="primary" >Delete</Button></Popconfirm>
                                <Button className="action-button" onClick={()=>{this.showEditModal(customer)}}>EDIT</Button>
                                </div>
                            </div>   
                        </div>                     
                    )
                })                    
                }
                <Modal
                    title="EDIT CUSTOMER"
                    visible={this.state.editVisible}
                    onOk={this.handleEditSubmit}
                    onCancel={this.handleCancel}
                >
                    <form>
                        <div className="group-form">   
                            <label>Name</label>
                            <input className="group-input" type="text" value={this.state.name} name="name" placeholder="name" onChange={this.handleChange}/><br />
                         </div>
                        <div className="group-form">
                            <label>Mobile</label>
                            <input className="group-input" type="text" value={this.state.mobile} name="mobile" placeholder="mobile" onChange={this.handleChange}/><br />
                        </div>
                        <div className="group-form">
                            <label>Email</label>
                            <input className="group-input" type="text" value={this.state.email} name="email" placeholder="email" onChange={this.handleChange}/><br />
                        </div>                               
                    </form>
                </Modal> 
            </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        customers: state.customers
    }
}

export default connect(mapStateToProps)(Customer)