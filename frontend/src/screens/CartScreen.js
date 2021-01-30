import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {addToCart} from '../actions/cartActions';
// if productId from params.id exists then call addToCart action to add this product to the cart
export default function CartScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    //get qty from url if the props.location.search value doesnt exists make it 1
    const qty = props.location.search ? Number (props.location.search.split('=')[1])
    : 1;
    //if productId exists dispatch addTocart action
    useEffect(()=> {
        if(productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch,productId, qty])
    return (
        <div>
            <h1> Cart Screen </h1>
            <p>ADD TO CART : ProductID:{productId} QTY: {qty}</p>
        </div>
    )
}
