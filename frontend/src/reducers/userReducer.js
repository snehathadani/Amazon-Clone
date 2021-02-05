import { USER_SIGNIN_FAIL, USER_SIGNOUT, USER_SIGNIN_SUCCESS, USER_SIGNIN_REQUEST } from "../constants/userConstants";

export const userSigninReducer = (state={}, action)=> {
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {loading:true};
        case USER_SIGNIN_SUCCESS:
            return {loading:false, userInfo: action.payload};
        case USER_SIGNIN_FAIL:
            return {loading:false, error: action.payload};
        case USER_SIGNOUT:
            return {};// by setting an empty object iserInfo from localStorage should be removed
            default:
                return state;
    }
}