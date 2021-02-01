import React, { useEffect} from 'react';
import Product from '../components/Product'
//import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
//import { productListReducer } from '../reducers/productListReducer';
import { listProducts } from '../actions/productActions';
import {useSelector, useDispatch} from 'react-redux';

export default function HomeScreen() {
const dispatch = useDispatch()
  //const [products, setProducts] = useState([]);
  //const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(false);
  const productList = useSelector(state => state.productList)
  const {loading, error, products} = productList

  useEffect(()=> {
    dispatch(listProducts())
    
  }, [dispatch])
    return ( 
      <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className = "row center" >
        {products.map(product=>{
            return (
              <Product key={product._id} product ={product} numReviews={product.numReviews} rating ={product.rating}/>
            )
          })
        }
       
      </div>
      )}
       </div>
    )
}
