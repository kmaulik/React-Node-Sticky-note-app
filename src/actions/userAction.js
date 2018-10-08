import * as types from './actionTypes';
import userApi from '../api/userApi';
import { addNotification } from "./notificationActions";

// import { addNotification } from "./notificationActions";

export function addUserRequestInit(){
    return { type: types.ADD_USER_REQUEST }
}

export function addUserRequestSuccess(payload){
    return {type: types.ADD_USER_SUCCESS, payload}
}

export function addUserRequestFail(){
    return { type: types.ADD_USER_FAILURE }
}

/**
 * This Action is used to pass new user's data to api if it is valid
 * @param {String} request 
 * @param {String} callback 
 */
export function addUser(request,callback) {
    return function(dispatch) {
        dispatch(addUserRequestInit())
        return userApi.addUser(request).then(response => {
            console.log("sdfsdfsdf",response.message);
            if(response.message === 'success'){   
                console.log("respnmse meshhage",response.message);          
                dispatch(addUserRequestSuccess());
                dispatch(addNotification(response,'success'));
                callback();
            }
            else{
                dispatch(addUserRequestFail());
                dispatch(addNotification(response, 'error'));
            }
        }).catch(error => {
            dispatch(addNotification(error.message, 'error'));
        })
    }
}


export function saveNotesRequestInit(){
    return { type: types.SAVE_NOTES_REQUEST }
}

export function saveNotesRequestSuccess(payload){
    return {type: types.SAVE_NOTES_SUCCESS, payload}
}

export function saveNotesRequestFail(){
    return { type: types.SAVE_NOTES_FAILURE }
}
/**
 * This action is used to save new & existing notes
 * @param String request 
 * @param String callback 
 */
export function saveNotes(request,callback) {
  
    return function(dispatch) {
        dispatch(saveNotesRequestInit())
        return userApi.saveNotes(request).then(response => {
            console.log("sdfsdfsdf",response.message);
            if(response.message === 'success'){   
                console.log("respnmse meshhage",response.message);          
                dispatch(saveNotesRequestSuccess());
                dispatch(addNotification(response,'success'));
                callback();
            }
            else{
                dispatch(saveNotesRequestFail());
                dispatch(addNotification(response, 'error'));
            }
        }).catch(error => {
            dispatch(addNotification(error.message, 'error'));
        })
    }
}



export function editProfileRequestInit(){
    return { type: types.SAVE_NOTES_REQUEST }
}

export function editProfileRequestSuccess(payload){
    return {type: types.SAVE_NOTES_SUCCESS, payload}
}

export function editProfileRequestFail(){
    return { type: types.SAVE_NOTES_FAILURE }
}

/**
 * To pass updated profile data to editProfile api
 * @param String request 
 * @param String callback 
 */
export function editProfile(request,callback) {
  
    return function(dispatch) {
        dispatch(editProfileRequestInit())
        return userApi.editProfile(request).then(response => {
            console.log("sdfsdfsdf",response.message);
            if(response.message === 'success'){   
                console.log("respnmse meshhage",response.message);          
                dispatch(editProfileRequestSuccess());
                dispatch(addNotification(response,'success'));
                callback();
            }
            else{
                dispatch(editProfileRequestFail());
                dispatch(addNotification(response, 'error'));
            }
        }).catch(error => {
            dispatch(addNotification(error.message, 'error'));
        })
    }
}