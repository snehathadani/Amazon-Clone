import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import Product from '../components/Product';
import Rating from '../components/Rating';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProduct } from '../actions/productActions';

export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
   // const product = data.products.find(element=> element._id === props.match.params.id) no need for this line as we will get product details from redux store
    const[qty, setQty] = useState(1)
   const productDetails = useSelector(state => state.productDetails)
   const{ loading, error, product } = productDetails;
  
useEffect(()=> {
    dispatch(detailsProduct(productId))
}, [dispatch, productId])

//redirect user to cart screen
const addtoCartHandler = ()=> {
    props.history.push(`/cart/${productId}?qty={qty}`)
}
    return (
        <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
        <Link>Back to result</Link>
        <div className ="row top">
            <div className ="col-2" >
                <img className ="large" src ={product.image} alt ={product.name} />
            </div>
            <div className = "col-1" >
                <ul>
                    <li>
                        <h1>{product.name}</h1>
                    </li>
                    <li>
                        <Rating rating = {product.rating} numReviews ={product.numReviews}/>
                    </li>
                    <li>Price: ${product.price}</li>
                    <li><p>Description: {product.description}</p></li>
                </ul>
            </div>
            <div className = "col-1" >
                <div>
                    <div className ="card card-body">
                        <ul>
                            <li>
                                <div className = "row" >
                                    <div>Price</div>
                                    <div className="price"> ${product.price}</div>
                                </div>
                            </li>
                            <li>
                                <div className = "row" >
                                    <div>Price</div>
                                    <div className="price"> {product.countInStock>0? 
                                    (
                                    <span className="success">In Stock</span>
                                    ) : (
                                        <span className="danger"> Unavailable</span>
                                    )}
                                    </div>
                                </div>
                            </li>
                            {
                                product.countInStock > 0 && (
                                    <>
                                    <li>
                                        <div className ="row">
                                            <div>Qty</div>
                                            <div>
                                                <select value = {qty} onChange = {e => setQty(e.target.value)}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map(x => (
                                                            <option key ={x+1} value = {x+1}> {x+1} </option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                    <button className="primary block" onClick={addtoCartHandler}>Add to Cart</button>
                                </li>
                                </>
                                    
                                )
                            }
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </div>
      )}
       </div>
        
    )
}
