import axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../constants/orderConstants"

export const createOrder = (order)=> async(dispatch, getState)=> {
    dispatch({type:ORDER_CREATE_REQUEST, payload:order});
    try{
        //with getState get the entire redux store
        //from redux store get userSignin and from userSignin get userInfo
        const {userSignin : {userInfo}} = getState();
        const {data} = await axios.post('/api/orders', order, {
            headers: {
                //userInfo.token contains the token that has been filled in by the sign in process of the user
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({type: ORDER_CREATE_SUCCESS, payload: data.order});
        //dispatch another action after this which is to remove all items from the cart
        dispatch({type:CART_EMPTY});
        localStorage.removeItem('cartItems');
    } catch(error){
        dispatch({type:ORDER_CREATE_FAIL, 
                payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            });
    }
};

export const detailedOrder = (orderId) => async (dispatch, getState)=> {
    dispatch({type:ORDER_DETAILS_REQUEST, payload:orderId});
    const {userSignin: {userInfo}} = getState();
    try {
        const {data} = await axios.get(`/api/orders/${orderId}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type:ORDER_DETAILS_SUCCESS, payload:data})
    } catch (error) {
        const message = error.response && error.response.data.message
                    ? error.response.data.message
                    :error.message;
                dispatch({type: ORDER_DETAILS_FAIL, payload: message});
    }
}