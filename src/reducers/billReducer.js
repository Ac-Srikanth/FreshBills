const billInitialState = []

const billReducer = (state=billInitialState, action) => {
    switch (action.type) {
       case 'GET_BILLS': {
           return [...action.payload]
       }
       case 'ADD_BILL': {
           return [...state, action.payload]
       }
       case 'GET_BILL' : {
            return [action.payload]
       }
       case 'DELETE_BILL': {
           return state.filter(bill=>bill._id != action.payload)
       }       
        default: {
            return [...state]
        }
    }

}

export default billReducer
