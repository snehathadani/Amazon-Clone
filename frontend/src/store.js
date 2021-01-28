import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk';

import { productDetailsReducer, productListReducer } from "./reducers/productListReducer";
//for the store first define an intial state
const initialState = {};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails:productDetailsReducer
})
//to connect to redux store first update the compose function
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//craete redux store takes in initial state and reducer
const store = createStore(
    reducer,
     initialState,
      compose(applyMiddleware(thunk))
      );

export default store;