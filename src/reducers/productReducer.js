const productInitialState = []

const productReducer = (state=productInitialState, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS' : {
            return [...action.payload]
        }
        case 'ADD_PRODUCT' : {
            return [...state, action.payload]
        }
        case 'DELETE_PRODUCT' : {
            return state.filter(product => product._id != action.payload)
        }
        case 'EDIT_PRODUCT' : {
            return state.map((product) => {
                if(product._id == action.payload.id) {
                    return {...product, ...action.payload.product}
                }else {
                    return {...product}
                }
            })
        }
        default: {
            return [...state]
        }
    }
}

export default productReducer