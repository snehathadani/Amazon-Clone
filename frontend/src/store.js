import { createStore } from "redux";
import data from "./data";
//for the store first define an intial state
const initialState = {};
const reducer = (state, action)=> {
    return{products:data.products};
}

//craete redux store takes in initial state and reducer
const store = createStore(reducer, initialState);

export default store;