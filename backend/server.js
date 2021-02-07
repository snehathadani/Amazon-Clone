import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv'
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';

dotenv.config();

const app = express();
//parse the body of http request as postman is giving error on POST with email and password can't read properety email of undefined
app.use(express.json());
app.use(express.urlencoded({extended:true}))
//connect with mongoDb database with .env
    mongoose.connect('mongodb://localhost:27017/amazon-clone?authSource=admin', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
});
/*
app.get('/api/products/:id', (req,res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if(product){
        res.send(product);
    } else {
        res.status(404).send({message:'product not found'})
    }
});

app.get('/api/products', (req, res) => {
    res.send(data.products);
})
*/
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.get('/', (req,res)=> {
    res.send('Server is ready.');
});
app.use((err, req,  res, next)=> {
    res.status(500).send({message: err.message});
});
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server at http://localhost:${port}`);
});