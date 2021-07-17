import * as actionTypes from '../actions/actionTypes'
import { setAuthenticationHeader } from '../../utils/authenticate'
import history from '../../utils/history'

// Login User
export const login = (credentials) => {
    return (dispatch) => {
        fetch('http://localhost:3030/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(credentials)
        }).then(response => response.json())
        .then(result => {
            dispatch({type: actionTypes.ON_LOGIN, payload: result})
            // if user is logged in successfully then take user to dashboard page 
            if(result.success) {
                const token = result.token 
               
               
                // get the token and put it in local storage 
                localStorage.setItem("jsonwebtoken", token)
                localStorage.setItem("id", result.id)
                localStorage.setItem('name', result.name)
                localStorage.setItem('isBand', result.isBand)
               
                 // set the authentication header 
                 setAuthenticationHeader(token)

                    history.push('/dashboard')
            } 
        })

    }

  
}

// Register User
export const register = (credentials, props) => {
    return (dispatch) => {

        fetch('localhost:3030/login/register', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(credentials)
        }).then(response => response.json())
        .then(result => {
            dispatch({type: actionTypes.ON_REGISTER, payload: result.success})
            if(result.success) {
                history.push('/login')
            }
        })

    }
}

// LOADS ALL POST
export const loadPosts = (props) => {
    return (dispatch) => {

        // post/ talent or band
        const type = props.type

        fetch(`localhost:3030/post/${type}`)
        .then(response => response.json())
        .then(posts => {
            dispatch({type: actionTypes.POST_LOADED, payload: posts})
        })

    }
}


// LOADS MESSAGE REQUESTS
export const loadMessages = (credentials) => {
    return (dispatch) => {
        // mess / mems or colls / userId 
        const type = credentials.type

        fetch(`localhost:3030/mess/${type}/${credentials}`)
        .then(response => response.json())
        .then(memberships => {
            dispatch({type: actionTypes.MESSAGE_LOADED, payload: memberships})
        })

    }
}

// LOADS POST BY SEARCH 
export const searchPosts = (search) => {
    return (dispatch) => {

        fetch(`localhost:3030/post/search`, { 
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(search)
        })
        .then(response => response.json())
        .then(posts => {
            dispatch({type: actionTypes.POST_SEARCHED, payload: posts})
        })

    }
}


// POST MESSAGE REQUESTS
export const sendMessage = (credentials) => {
    return (dispatch) => {
        fetch('localhost:3030/mess/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(response => response.json())
        .then(send => {
            dispatch({type: actionTypes.SEND_MESSAGE, payload: send})
        })
    }
}



// HANDLE MESSAGE REQUESTS
export const optionRes = (message) => {
    return (dispatch) =>{

        // mess/acc or dec/ mess Id
        const option = message.option
        
        fetch(`localhost:3030/mess/${option}/${message}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(option => {
            dispatch({type: actionTypes.OPTION_RES, payload: option})
        })
    }
}


// LOAD USER RELATIONSHIPS
export const userRels = (user) => {
    return (dispatch) =>{

        // memco/req-m or req-c/ userId
        const type = user.type
        
        fetch(`localhost:3030/memco/${type}/${user}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(rels => {
            dispatch({type: actionTypes.LOAD_RELS, payload: rels})
        })
    }
}












