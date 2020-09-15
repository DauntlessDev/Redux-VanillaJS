const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const reduxLogger = require('redux-logger')
const thunkMiddleWay = require('redux-thunk').default
const axios = require('axios')

const initialState = {
    loading: false,
    users: [],
    error: '',
}

const FETCH_USER_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USER_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USER_ERROR = 'FETCH_USERS_ERROR'

const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST,
    }
}

const fetchUserSuccess = users => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users
    }
}

const fetchUserError = error => {
    return {
        type: FETCH_USER_ERROR,
        payload: error
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USER_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USER_ERROR:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }
    }
}

const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
            const users = response.data.map(user => user.id)
            dispatch(fetchUserSuccess(users))
        }).catch(error => {
            dispatch(fetchUserError(error.message))
        })
    }

}

const store = createStore(reducer, applyMiddleware(thunkMiddleWay))
store.subscribe(() => { console.log(store.getState()) })
store.dispatch(fetchUsers())

