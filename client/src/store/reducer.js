import * as actionTypes from './actions/actionTypes'


const initialState = {
    isAuthenticated: false,
    isBand: false,
    posts: [],
    messages: [],
    relationships: []
     
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.ON_LOGIN: 
            return {
                ...state, 
                isAuthenticated: action.payload != null ? true: false,
                isBand: action.payload.isBand !== true ? false: true
            }
        case actionTypes.POST_LOADED:
            return {
                ...state,
                posts: action.payload
            }
        case actionTypes.MESSAGE_LOADED:
             return {
                ...state,
                 messages: action.payload
            }
        case actionTypes.LOAD_RELS:
            return {
                ...state,
                relationships: action.payload
            }
            
        default: 
            return state
    }
}

export default reducer