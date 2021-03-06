import axios from 'axios';
import {PaypalButton} from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { detailedOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

//create shipping payment and order details section
export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    const [sdkReady, setsdkReady]= useState(false);//get the status of paypal sdk
    const orderDetails = useSelector((state)=>state.orderDetails);
    const {order,loading,error} = orderDetails;
    const dispatch = useDispatch();

    useEffect(()=> {
        const addPayPalScript= async()=> {
            const {data} = await axios.get('/api/config/paypal');//data contains the client id
            //set the source of the script element to paypal sdk
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async= true;
            script.onload = ()=>{
                setsdkReady(true);
            };//the script will be added as a lastchild of the body of the html document
            document.body.appendChild(script)
        }
        if(!order) {
            dispatch(detailedOrder(orderId));
        } else {
            if (!order.isPaid) {
                if(!window.paypal) {
                    addPayPalScript();
                } else {
                    setsdkReady(true);
                }
            }
        }
       
    }, [dispatch,order, sdkReady, orderId]);//order and not order._id as it wont work if order is null

    const successPaymentHandler = ()=> {}
    return loading? (<LoadingBox></LoadingBox>) :
    error?(<MessageBox variant="danger">{error}</MessageBox>
    ):(
        <div>
            <h1>Order {order._id}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong>
                                    {order.shippingAddress.fullName} <br/>
                                    <strong>Address:</strong>
                                    {order.shippingAddress.address}
                                    {order.shippingAddress.city}
                                    {order.shippingAddress.postalCode}
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered? (
                                <MessageBox variant="success">
                                    Delivered at {order.deliveredAt}
                                    </MessageBox>
                                ) : (
                                    <MessageBox variant="error">{alert('Not Delivered')}</MessageBox>
                                )}
                                </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong>
                                    {order.paymentMethod} 
                                </p>
                             
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                       {order.orderItems.map(item => (
                               <li key = {item.product}>
                                   <div className = "row">
                                       <div>
                                           <img src = {item.image}
                                            alt = {item.name}
                                             className = "small">
                                             </img>
                                       </div>
                                       <div className = "min-30">
                                           <Link to ={`/product/${item.product}`}>{item.name}</Link>
                                       </div>
                                       <div>{item.qty} X ${item.price} = ${item.qty * item.price}</div>
                                   </div>
                               </li>
                           ))
                       }
                   </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">                                                
                    <div className = "card card-body">
                       <ul>
                           <li>
                               <h2>Order Summary</h2>
                               </li>
                               <li>
                                 <div className ="row">
                                     <div>Items</div>
                                     <div>${order.itemsPrice.toFixed(2)}</div>
                                     </div>  
                                </li>
                                <li>
                                 <div className ="row">
                                     <div>Shipping</div>
                                     <div>${order.shippingPrice.toFixed(2)}</div>
                                     </div>  
                                </li>
                                <li>
                                 <div className ="row">
                                     <div>Tax</div>
                                     <div>${order.taxPrice.toFixed(2)}</div>
                                     </div>  
                                </li>
                                <li>
                                 <div className ="row">
                                     <div><strong>Order Total</strong></div>
                                     <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                                     </div>  
                                </li>
                                { !order.isPaid && (
                                    <li>
                                        {!sdkReady ? (<LoadingBox></LoadingBox>):
                                        (
                                            <PaypalButton amount={order.totalPrice}
                                                          onSuccess ={successPaymentHandler}>

                                                          </PaypalButton>
                                        )}
                                    </li>
                                )}
                        </ul> 
                    </div>
                </div>
            </div>
        </div>
    )
}
