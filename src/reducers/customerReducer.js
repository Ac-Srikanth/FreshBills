const customerInitialState = []
const customerReducer = (state=customerInitialState, action) => {
    switch(action.type) {
        case 'SET_CUSTOMERS' : {
            return [...action.payload]
        }
        case 'ADD_CUSTOMER' : {
            return [...state, action.payload]
        }
        case 'DELETE_CUSTOMER' : {
            return state.filter(customer => customer._id != action.payload)
        }
        case 'EDIT_CUSTOMER' : {
            return state.map((customer) => {
                if(customer._id == action.payload.id) {
                    return {...customer, ...action.payload.customer}
                }else {
                    return {...customer}
                }
            })
        }
        default: {
            return [...state]
        }
    }
}

export default customerReducer