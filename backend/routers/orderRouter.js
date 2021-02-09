import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();
//by calling next() inside isAuth where isAuth is a middleware
//by calling next() inside isAuth user infor will be filled inside user:req.user._id
orderRouter.post('/',isAuth, expressAsyncHandler(async(req,res)=>{
    //first check if order items contains items or not
    if(req.body.orderItems.length=== 0){
        res.status(400).send({message:'Cart is Empty'});
    } else {
        const order= new Order({
            orderItems:req.body.orderItems,
            shippingAddress:req.body.shippingAddress,
            paymentMethod:req.body.paymentMethod,
            itemsPrice:req.body.itemsPrice,
            shippingPrice:req.body.shippingPrice,
            taxPrice:req.body.taxPrice,
            totalPrice:req.body.totalPrice,
            //at this point we dont have any infor on user, so to define the user we need to create a middleware
            //at utils.js
            //create a middleware to authenticate a user
            user:req.user._id, //we only need the id of the user for orderModel
        });
        //we don't have the order in DB YET
        const createdOrder = await order.save();
        res.status(201)
        .send({message: 'New Order Created', order: createdOrder});
    }
}))
//create get orders screen
//need a middleware  isAuth as user needs to be authenticated to see orders
orderRouter.get('/:id', isAuth, expressAsyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id);// this is the id that comes from /:id
    if(order){
        res.send(order)
    } else {
        res.status(404).send({message:'Order not Found'});
    }
}));
export default orderRouter;