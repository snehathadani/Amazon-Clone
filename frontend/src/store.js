import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk';
import { cartReducer } from "./reducers/cartReducers";

import { productDetailsReducer, productListReducer } from "./reducers/productListReducer";
import { userSigninReducer } from "./reducers/userReducer";
//for the store first define an intial state
const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            :null,
    },
    cart: {
        cartItems: localStorage.getItem('cartItems') 
            ? JSON.parse(localStorage.getItem('cartItems'))
            : []
    }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userSignin: userSigninReducer,
})
//to connect to redux store first update the compose function
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//craete redux store takes in initial state and reducer
const store = createStore(
    reducer,
     initialState,
      composeEnhancer(applyMiddleware(thunk))
      );

export default store;