import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

export default function ShippingAddressScreen(props) {
    //Only sign in users should see the shipping screen so extract the userInfo from state to validate this
    const userSignin = useSelector((state)=> state.userSignin);
    const {userInfo} = userSignin;
    if(!userInfo) {
        props.history.push('/signin');
    }
    //similarly get columns for address prefilled by the previously enteretd address so user doesnt have to retype everything
    const cart = useSelector(state=> state.cart);
    const {shippingAddress} = cart;
    const [fullName, setFullName] = useState(shippingAddress.fullName)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const dispatch = useDispatch();
//bcoz you are passing inside cartAction as a single object "data" you need to wrap it arounf curlu braces {}
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city,postalCode,country}))
        props.history.push('/payment');
    }
    
    return (
        <div>
            <CheckoutSteps step1 step2 ></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input 
                    type = "text"
                    id= "fullName"
                    placeholder="Enter Full Name"
                    value = {fullName}
                    onChange= {(e)=> setFullName(e.target.value)}
                    required
                    >
                    </input>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input 
                    type = "text"
                    id= "address"
                    placeholder="Enter Full Address"
                    value = {address}
                    onChange= {(e)=> setAddress(e.target.value)}
                    required
                    >
                    </input>
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input 
                    type = "text"
                    id= "city"
                    placeholder="Enter City"
                    value = {city}
                    onChange= {(e)=> setCity(e.target.value)}
                    required
                    >
                    </input>
                </div>
                <div>
                    <label htmlFor="postalCode">Poastal Code</label>
                    <input 
                    type = "text"
                    id= "postalCode"
                    placeholder="Enter Postal Code"
                    value = {postalCode}
                    onChange= {(e)=> setPostalCode(e.target.value)}
                    required
                    >
                    </input>
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input 
                    type = "text"
                    id= "country"
                    placeholder="Enter Country"
                    value = {fullName}
                    onChange= {(e)=> setCountry(e.target.value)}
                    required
                    >
                    </input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Continue</button>
                </div>
                </form>

        </div>
    )
}
