import * as types from '../actions/actionTypes'
import intialState from './intialState'

export default function(state = intialState.session, action) {
    switch(action.type){
        case types.LOG_IN_REQUEST:
             return {
                 ...state,
                 loggingIn: true
             }
        case types.LOG_IN_SUCCESS:     
            return{
                ...state,
                loggingIn: false,
                login_once : true,
                has_token : !!sessionStorage.jwt
            }            
        case types.LOG_OUT:
            return{
                ...state,
                loggingIn: false,
                has_token : !!sessionStorage.jwt
            }             
        case types.LOG_IN_FAILURE:
            return {
                ...state,
                loggingIn : false,
                error: action.payload,
                message:"Email and pasword is wrong !!"
            }
        default:
            return state    
    }
}