const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()


const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'


// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 20
// }

const initialIceCreamState = {
    numOfIceCreams: 20
}

const initialCakeState = {
    numOfCakes: 10
}

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        default:
            return state

    }

}


const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        default:
            return state

    }

}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})
const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Intial State', store.getState())

const unsubscribe = store.subscribe(() => {})
store.dispatch({
    type: BUY_CAKE
})
store.dispatch({
    type: BUY_CAKE
})
store.dispatch({
    type: BUY_CAKE
})
store.dispatch({
    type: BUY_ICECREAM
})
store.dispatch({
    type: BUY_ICECREAM
})

unsubscribe()

