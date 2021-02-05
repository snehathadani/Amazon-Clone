//import { config } from 'dotenv';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function RegisterScreen(props){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split('=')[1]
                        : '/'; //props.location.search props are parameters of signin
    //Now get the userInfo from the redux store
    const userRegister = useSelector((state)=> state.userRegister)
    const {userInfo, loading, error} = userRegister;
    
    const submitHandler = (e)=> {
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Password and confirm password are not a match')
        } else {
            dispatch(register(name,email, password))
        }
        
    }
    useEffect(()=> {
        if(userInfo) { //if userInfo exists then the logging was successful
            props.history.push(redirect);
        }
    }, [userInfo, props.history, redirect]);//whenever the value of userInfo has changed
    
    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Register</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="error">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type = "text" id ="name" placeholder="Enter Name" required
                        onChange = {e=> setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type = "email" id ="email" placeholder="Enter Email" required
                        onChange = {e=> setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type = "password" id ="password" placeholder="Enter Password" required
                        onChange = {e=> setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type = "password" id ="confirmPassword" placeholder="Enter Confirm Password" required
                        onChange = {e=>setConfirmPassword(e.target.value)}></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type ="submit">Register</button>
                </div>
                <div>
                    <label/>
                    <div>
                        Already have an account? {' '}
                        <Link to ={`/signin?redirect=${redirect}`}>Sign-In</Link>/
                    </div>
                </div>
            </form>
        </div>
    )
}
/*pass redirect to sign in */