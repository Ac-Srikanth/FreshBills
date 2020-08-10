import React from 'react'
import {connect} from 'react-redux'
import {startGetProducts} from '../../actions/productAction'
import {startGetCustomer} from '../../actions/customerAction'
import {startAddBill} from '../../actions/billAction'
import { ToastContainer } from "react-toastify";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {Form, Card, Input, Button, DatePicker, Select, Space} from 'antd'
import './newBill.css'

const { Option } = Select;
const layout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 9,
    span: 16,
  },
};
const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };


class NewBill extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            date: '',
            customer: '',
            lineItems: [],
            product: '',
            quantity: 0,
            qty: 0
            
        }
    }
    componentDidMount () {
        if(this.props.products.length == 0) {
            this.props.dispatch(startGetProducts())
        }
        if(this.props.customers.length == 0){
            this.props.dispatch(startGetCustomer())
        }
    }
    formRef = React.createRef()

    onChangeDate = (d, dateString) => {
        console.log('Date', d)
        console.log('dateString', dateString)
        this.setState({ date: dateString})
    }

    onChangeCustomer = (customer) => {
        console.log('Customer', customer)
        this.setState({ customer})
    }

    onChangeProduct = (e) => {
        let id = e
       this.setState({ product: id})      
    }

    onChangeQuantity = (e) => {
        console.log(e.target.value)       
        this.setState({ quantity: e.target.value})
        
    }
    
    add = () => {
        console.log('clicked')               
        
    }

    onFinish = (values) => {
        console.log(values)
        const finalBill = {
          ...values,
          'date': values['date'].format('YYYY-MM-DD')
        }
       console.log(finalBill)
       const redirect = () => {
        return this.props.history.push('/bills')
      }
       this.props.dispatch(startAddBill(finalBill, redirect))
    }

    render() { 
        return (
            <div>
                <h1 className='page-title'>CREATE BILL</h1>
                <Card className="bill-card" style={{width: '50vw'}}>
                <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                    <Form.Item name="date" label="Date" >
                        <DatePicker onChange={this.onChangeDate} />
                    </Form.Item>
                    <Form.Item name="customer" label="Select Customer">
                        <Select 
                          showSearch style={{width: 200}} 
                          placeholder="Select Customer" 
                          onChange={this.onChangeCustomer} 
                          optionFilterProp="children" 
                          filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {this.props.customers.map(customer => {
                            return  <Option key={customer._id} value={customer._id}>{customer.name}</Option>
                          })}
                        </Select>
                    </Form.Item>
                <Form.List name="lineItems">
                {(fields, {add, remove}) => {
                    return (
                        <div className='dynamic-form'>
                            {fields.map(field => (
                            <Space key={field.key}  style={{  marginBottom: 8,display: 'flex', justifyContent: 'center', marginLeft:'10vw'}} align="start">    
                              <Form.Item
                                  {...field}
                                  name={[field.name, 'product']}
                                  fieldKey={[field.fieldKey, 'product']}
                                  rules={[{ required: true, message: 'Missing product' }]}
                                >
                                <Select 
                                  showSearch style={{width: 200}} 
                                  placeholder="Select Product" 
                              //   onChange={this.onChangeCustomer} 
                                  optionFilterProp="children" 
                                  filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                  }
                                >
                                  {this.props.products.map(product => {
                                    return  <Option key={product._id} value={product._id}>{product.name}</Option>
                                  })}
                                </Select>
                              </Form.Item>
                              <Form.Item
                                {...field}
                                name={[field.name, 'quantity']}
                                fieldKey={[field.fieldKey, 'quantity']}
                                rules={[{ required: true, message: 'quantity required' }]}
                              >
                                <Input type="Number" placeholder="Select Quantity" min="1" max="10"/>
                              </Form.Item>
                              <MinusCircleOutlined
                                  onClick={() => {
                                      remove(field.name);
                                  }}
                              />
                            </Space>
                            ))}
                            <Form.Item className="add-products-form-item">
                            <Button
                              type="dashed"
                              onClick={() => {
                                add();
                                this.add();
                              }}
                              style={{ width: '30%'}}
                              className='add-products-button'
                            >
                              <PlusOutlined/> Add Products
                            </Button>
                          </Form.Item>
                        </div>
                    )
                }}                
                </Form.List>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>                
              </Form>
              <ToastContainer containerId="successBill" autoClose={5000} />
              </Card>      
            </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        customers: state.customers,
        products: state.products
    }
}


export default connect(mapStateToProps)(NewBill)