import * as types from '../actions/actionTypes'
import intialState from './intialState'

export default function (state = intialState.users, action) {
    switch (action.type) {
        case types.ADD_USER_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.ADD_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                addUser: true
            }
        case types.ADD_USER_FAILURE:
            return {
                ...state,
                isFetching: false,
                addUser: false
            }     
        case types.SAVE_NOTES_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case types.SAVE_NOTES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                saveNotes: true
            }
        case types.SAVE_NOTES_FAILURE:
            return {
                ...state,
                isFetching: false,
                saveNotes: false
            }

      


            case types.SEND_EMAIL_REQUEST:
            return {
                ...state,
                isSending: true,
                sentEmail : false,
            }
        case types.SEND_EMAIL_SUCCESS:
            return {
                ...state,
                isSending: false,
                sentEmail : true,
                sendEmail: action.payload
            
            }
        case types.SEND_EMAIL_FAILURE:
            return {
                ...state,
                isSending: false,
                sentEmail : false,
                sendEmail: false
            } 

        case types.SEND_SMS_REQUEST:
            return {
                ...state,
                isSendingSms: true,
                sentSms : false,
            }
        case types.SEND_SMS_SUCCESS:
            return {
                ...state,
                isSendingSms: false,
                sentSms : true,
                sendSms: action.payload
            
            }
        case types.SEND_SMS_FAILURE:
            return {
                ...state,
                isSendingSms: false,
                sentSms : false,
                sendSms: false
            } 
            
        case types.INPUT_RANGE_VALUE:
        return {
            ...state,
            input_range_value: action.payload
        }
        default:
            return state
    }
}