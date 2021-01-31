import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state ={ cartItems:[]}, action)=> {
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload; // add this item to the cart
            //first determine if an item with this id already exists in the cart
            const existItem = state.cartItems.find(x=> x.product === item.product)
            //if it already exists then replace it with the current information to update the new state of a cart
            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x=> x.product === existItem.product ? item : x )//if they are equal toeach other then return a new value, if they aren't equal then return previous value
                }
            } else {
                return {...state, cartItems:[...state.cartItems, item]}// concat new item at the end of items. only change whats relevant
            }
            //filter out the product whose id is equal to action.payload
            case CART_REMOVE_ITEM:
                return {...state, 
                    cartItems: state.cartItems.filter(x=> x.product !== action.payload)}
        default:
            return state;
    }
}