import React from 'react'
import {connect} from 'react-redux'
import {startGetProducts, startAddProduct, startDeleteProduct, startUpdateProduct} from '../../actions/productAction'
import { Collapse , Button, Popconfirm, message, Modal, Typography } from 'antd';
import './products.css'
const { Panel } = Collapse;
const { Text} = Typography;

class Products extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            editVisible: false,
            name: '',
            price: 0,
            id: ''
        }
    }

    componentDidMount () {
        if(this.props.products.length == 0) {
            this.props.dispatch(startGetProducts())
        }
    }
    handleChange =(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit =(e)=>{
        e.preventDefault()
        const formdata = {
            name: this.state.name,
            price: this.state.price
        }
        console.log('Products form data', formdata)
        this.props.dispatch(startAddProduct(formdata))
        this.setState({name: '', price: '', visible: false})
    }
    handleEditSubmit = (e) => {
        e.preventDefault()
        const formdata = {
            name: this.state.name,
            price: this.state.price
        }
        this.props.dispatch(startUpdateProduct(this.state.id, formdata))
        this.setState({
            editVisible: false,
            id: '',
            name: '',
            price: ''
        })
        message.success('Edited Product Successfully');
    }
    handleDeleteProduct = (id) => {
        this.props.dispatch(startDeleteProduct(id))
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
    }
    showEditModal = (product) => {
        this.setState({
            editVisible: true,
            id: product._id,
            name: product.name,
            price: product.price,
         
        })
    }
    handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
          editVisible: false,        
          name:'',
          price: '' 
        });
   }
   confirm = (id) =>{       
       this.handleDeleteProduct(id)
       setTimeout(() =>{
        message.error('Deleted');
        },1000)
   }
   cancel=(e)=> {
        console.log(e);
        message.success('Data Safe');
    }
    render() {
        return (
            <div>
                <div className="products-header">
                    <h1>Products Page</h1>
                    <Button className="add-new-button" type="primary" onClick={this.showModal}>+ Add Products</Button>
                </div>
                <Modal
                    title="ADD A NEW PRODUCT"
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <form>
                        <div className="group-form">   
                            <label>Product Name</label>
                            <input className="group-input-products" type="text" value={this.state.name} name="name" placeholder="product" onChange={this.handleChange}/><br />
                         </div>
                        <div className="group-form">
                            <label>Price</label>
                            <input className="group-input-products" id="price" type="number" value={this.state.price} name="price" placeholder="price" onChange={this.handleChange}/><br />
                        </div>                              
                    </form>
                </Modal>
                {
                    this.props.products && this.props.products.map((product)=>{
                        return (
                            <div className="accordian-panel"  key={product._id}>
                             <div>
                                <Collapse accordion className="accordian-dropdown" onChange={this.callback}>              
                                    <Panel header={product.name.toUpperCase()} >
                                        <p><Text type="warning">PRICE:-</Text>RS {product.price}</p>
                                        <p><Text type="danger">CREATED:-</Text>{product.createdAt}</p>
                                    </Panel>
                                </Collapse>
                             </div>
                             <div>
                                <div className="actionButtons">
                                    <Popconfirm
                                        title="Are you sure to delete this Product?"
                                        onConfirm={()=>{this.confirm(product._id)}}
                                        onCancel={this.cancel}
                                        okText="Yes"
                                        cancelText="No"
                                     > 
                                    <Button className="action-button" danger type="primary" >Delete</Button></Popconfirm>
                                    <Button className="action-button" onClick={()=>{this.showEditModal(product)}}>EDIT</Button>
                                </div>
                             </div>
                            </div>
                        )
                    })
                }
                <Modal
                    title="EDIT PRODUCT"
                    visible={this.state.editVisible}
                    onOk={this.handleEditSubmit}
                    onCancel={this.handleCancel}
                >
                    <form>
                        <div className="group-form">   
                            <label>Name</label>
                            <input className="group-input" type="text" value={this.state.name} name="name" placeholder="product name" onChange={this.handleChange}/><br />
                         </div>
                        <div className="group-form">
                            <label>Price</label>
                            <input className="group-input" type="number" value={this.state.price} name="price" placeholder="price" onChange={this.handleChange}/><br />
                        </div>                             
                    </form>
                </Modal> 
            </div>
        )
    }
    }
const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Products)