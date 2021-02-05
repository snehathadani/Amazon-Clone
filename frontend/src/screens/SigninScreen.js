import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function SigninScreen(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split('=')[1]
                        : '/'; //props.location.search props are parameters of signin
    //Now get the userInfo from the redux store
    const userSignin = useSelector((state)=> state.userSignin)
    const {userInfo, loading, error} = userSignin;
    
    const submitHandler = (e)=> {
        e.preventDefault();
        dispatch(signin(email,password))
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
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type = "email" id ="email" placeholder="Enter Email" required
                        onChange = {e=> setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Email Address</label>
                    <input type = "password" id ="password" placeholder="Enter Password" required
                        onChange = {e=> setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type ="submit">Sign In</button>
                </div>
                <div>
                    <label/>
                    <div>
                        New Customer? {' '}
                        <Link to ="/register">Create Your Account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}