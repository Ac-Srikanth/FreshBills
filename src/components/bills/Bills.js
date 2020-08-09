import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {startGetBills, startDeleteBill} from '../../actions/billAction'
import {startGetCustomer} from '../../actions/customerAction'
import {startGetProducts} from '../../actions/productAction'
import {Table, Button, Popconfirm, message} from 'antd'
import {newBills} from '../../selectors/billsSelector'
import './bills.css'
const {Column} = Table;



class Bills extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            name: '' ,
            visible: false               
        }
    }
    gotoAddNew = () => { //redirect to add new bill page
        this.props.history.push('/bills/addnew')
    }

    goToViewBill = (id) => {
        this.props.history.push(`/bills/${id}`)
    }

    componentDidMount () {        
            this.props.dispatch(startGetBills())       
        
            this.props.dispatch(startGetCustomer())
      
      
            this.props.dispatch(startGetProducts())
       
    }

    findProduct = (products, id) => {
        // console.log('here')
        if(products.length !== 0 && id){
             return products.find(product => product._id == id).name.toUpperCase()
        }
       
    }

    confirm = (record) => { //for deleting bill (popup)
        this.handleDelete(record);
        setTimeout(() => {
            message.error('Deleted');
        },1000)
    }

    cancel = (e) => { //for cancelling of deletion (popup)
        message.success('Data Safe')
    }

    handleDelete = (record) => {
        console.log(record)
        this.props.dispatch(startDeleteBill(record._id))
    }



    render() {   
        return (
            <div>
                <div className='bills-header'>
                    <h1>BILLS</h1>
                    <Button className='add-new-button' onClick={this.gotoAddNew} type="primary">+ ADD NEW BILL</Button>
                </div>                
                <Table className="billsTable" rowKey={bills => bills._id}   dataSource={this.props.bills}  pagination={false} bordered={true}> 
                   
                    <Column title="CUSTOMER" dataIndex="customerName" />
                    <Column title="ITEMS" dataIndex = "lineItems" key ="lineItems" render = {
                        lineItems => (
                            <>
                            {
                                lineItems.map((item,index)=> {
                                    return <p key={index} className="ant-table-cell">{this.findProduct(this.props.products, item.product)}({item.quantity})</p> //to find product based on product id
                                })
                            }
                            </>
                        )
                    }
                    />                    
                    <Column title="CREATED" dataIndex="createdAt" render={createdAt => moment(createdAt).format('MMMM Do YYYY')} />                    
                    <Column title="TOTAL" dataIndex="total" render = {total => <p>&#8377;{total.toLocaleString('en-IN')}</p>} />
                    <Column title="ACTIONS" key='action'
                        render = {(text, record) => (
                            <>
                                <Popconfirm
                                title="Are you sure delete this bill?"
                                onConfirm={()=>{this.confirm(record)}} 
                                onCancel={this.cancel}
                                okText="Yes"
                                cancelText="No"
                                >
                                    <Button className='action-buttons' type="primary" danger>Delete</Button>
                                </Popconfirm>
                                <Button className='action-buttons' onClick={()=>{this.goToViewBill(record._id)}}>VIEW</Button>
 
                            </>
                        )                      
                        }
                    />
                </Table>                 
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        bills: newBills(state.bills, state.customers, state.products),
        products: state.products,        
    }

}

export default connect(mapStateToProps)(Bills)