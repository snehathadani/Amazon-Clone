import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

export default function ShippingAddressScreen(props) {
    const [fullName, setFullName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')
    const dispatch = useDispatch();
//bcoz you are passing inside cartAction as a single object "data" you need to wrap it arounf curlu braces {}
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city,postalCode,country}))
        
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