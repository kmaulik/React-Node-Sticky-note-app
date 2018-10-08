import * as types from './actionTypes';
import sessionApi from "../api/sessionApi";

export function loginSuccess() {
    return { type: types.LOG_IN_SUCCESS }
}

export function loginFailure(payload) {
    return { type: types.LOG_IN_FAILURE, payload }
}

export function loginRequest() {
    return { type: types.LOG_IN_REQUEST }
}

/**
 * Login user acrtion to check authenticated users
 * @param String credentials 
 */
export function loginUser(credentials) {    
    return function (dispatch) {
        dispatch(loginRequest())
        return sessionApi.login(credentials).then(response => { 
            if(response.status === true){
                //console.log("login",response);
                sessionStorage.setItem('jwt', response.token);
                sessionStorage.setItem('user_id', response.response[0]._id);
                sessionStorage.setItem('username', response.response[0].name);
                dispatch(loginSuccess())     
            }               
            if(response.status === false){
                sessionStorage.removeItem('jwt');
                dispatch(loginFailure(response))   
            }
        }).catch(error => {           
            throw error            
        })
    }
}

export function logOutUser() {
    sessionStorage.removeItem('jwt');
    return { type: types.LOG_OUT }
}