import React from 'react'
import {connect} from 'react-redux'
import { startGetBill } from '../../actions/billAction'
import {Card, Table} from 'antd'
import {newBills} from '../../selectors/billsSelector'
import moment from 'moment'
import './viewbill.css'
const {Column} = Table
// const { Text} = Typography


class ViewBill extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: ''
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        this.props.dispatch(startGetBill(id))
    }

    findProduct = (products, id) => {
        if(products.length !== 0 && id){
            return products.find(product => product._id == id).name.toUpperCase()
        }
    }
    

    render() {
        let bill = this.props.bill[0]
        return (
            <div>
                <h3 className="view-bill-header">BILL FOR CUSTOMER - {this.props.bill[0].customerName}</h3>
                    <div className="view-bill-card">
                        <Card style={{width: '80vw'}}>
                            <p>TOTAL - {bill.total.toLocaleString('en-IN')}</p>
                            <p>Date - {moment(bill.date).format('DD-MM-YYYY')}</p>
                            <h3>ITEMS</h3>
                            <Table rowKey={lineItems => lineItems._id} dataSource={bill.lineItems}  pagination={false} bordered={true}>
                                <Column title="PRODUCT" dataIndex="product" render = {(text, record)=>(<p>{this.findProduct(this.props.products, record.product)}</p>)}/>
                                <Column title="PRICE" dataIndex="price" />
                                <Column title="QUANTITY" dataIndex="quantity"/>
                                <Column title="SUBTOTAL" dataIndex="subTotal" />
                            </Table>              
                        </Card>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        bill: newBills(state.bills, state.customers, state.products),
        products: state.products
    }
   
}

export default connect(mapStateToProps)(ViewBill)