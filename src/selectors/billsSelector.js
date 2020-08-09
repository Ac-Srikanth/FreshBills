export const newBills  = (bills, customers, products) => {
   return bills.map(bill => {       
        let customer = customers.filter(customer => customer._id == bill.customer)        
        if(customer.length !== 0) {           
            bill['customerName'] = customer[0]['name']           
            return bill
        } else {
            bill['customerName'] ='CUSTOMER NOT FOUND'
            return bill
        }

        
    })
}