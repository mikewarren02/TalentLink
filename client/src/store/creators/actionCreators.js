import * as actionTypes from '../actions/actionTypes'


// Login User
export const login = (credentials, props) => {
    return (dispatch) => {

        fetch('localhost:3030/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(credentials)
        }).then(response => response.json())
        .then(result => {
            dispatch({type: actionTypes.ON_LOGIN, payload: result.success})
            // if user is logged in successfully then take user to dashboard page 
            if(result.success) {
                props.history.push('/dashboard')
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
                props.history.push('/login')
            }
        })

    }
}

// LOADS ALL POST
export const loadPosts = (props) => {
    return (dispatch) => {

        const type = props.type

        fetch(`localhost:3030/post/${type}`)
        .then(response => response.json())
        .then(posts => {
            dispatch({type: actionTypes.POST_LOADED, payload: posts})
        })

    }
}


// LOADS MEMBERSHIP REQUESTS
export const loadMessages = (credentials) => {
    return (dispatch) => {

        fetch(`localhost:3030/mess/mems/${credentials}`)
        .then(response => response.json())
        .then(memberships => {
            dispatch({type: actionTypes.MEMBERSHIP_LOADED, payload: memberships})
        })

    }
}

// LOADS COLLAB REQUESTS
export const loadCollabs = (credentials) => {
    return (dispatch) => {

        fetch(`localhost:3030/mess/colls/${credentials}`)
        .then(response => response.json())
        .then(collabs => {
            dispatch({type: actionTypes.COLLAB_LOADED, payload: collabs})
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
export const collabReq = (credentials) => {
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



// ACCEPT MESSAGE REQUESTS




// DECLINE MESSAGE REQUESTS



