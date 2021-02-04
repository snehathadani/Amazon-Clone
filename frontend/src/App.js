import React from 'react';
import { useSelector } from 'react-redux';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';

function App() {
  //add a badge to show number of items in the cart, for that get access to cart items from redux
  const cart = useSelector(state=> state.cart);
  const {cartItems} = cart;
  return (
    <BrowserRouter>
    <div className = "grid-container">
    <header className ="row">
        <div>
            <Link className = "brand" to = "/" >Amazon</Link>
        </div>
        <div>
            <Link to ="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className ="badge">{cartItems.length}</span>
              )}
              </Link>
            <Link to ="/Signin">Sign In</Link>
        </div>
    </header>
    <main>
      <Route path = "/cart/:id?" component ={CartScreen}></Route>
    <Route path = "/product/:id" component = {ProductScreen} exact></Route>
    <Route path = "/signin" component ={SigninScreen}></Route>
      <Route path = "/" component = {HomeScreen} exact></Route>
    </main>
    <footer className="row center" >All Rights Reserve</footer>
</div>
</BrowserRouter>
  );
}

export default App;
