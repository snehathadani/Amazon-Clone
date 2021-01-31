import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
import axios from 'axios';

//By patching this action ask redux store to add to the cart
export  const addToCart = (productId, qty) => async(dispatch, getState)=> {
    //after getting data dispatch an action
    const{data} = await axios.get(`/api/products/${productId}`);
    dispatch({ // by dispatching this action ask redux store to add the item to the cart
        type:CART_ADD_ITEM,
        payload:{
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            //use product as a key to add it to database
            product:data._id,
            qty,
        },
    });
    //after adding a product to the cart its going to be saved in your local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};


export const removeFromCart = (productId)=> (dispatch, getState) => {
    dispatch({type:CART_REMOVE_ITEM, payload: productId});
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}