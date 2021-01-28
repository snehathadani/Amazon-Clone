import React from 'react'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import Product from '../components/Product';
import Rating from '../components/Rating';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductScreen(props) {
   // const product = data.products.find(element=> element._id === props.match.params.id) no need for this line as we will get product details from redux store

   const productDetails = useSelector(state => state.productDetails)
   const{ loading, error, product } = productDetails;
  
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
                            <li>
                                <button className="primary block">Add to Cart</button>
                            </li>
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
