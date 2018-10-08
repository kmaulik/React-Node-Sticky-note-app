import _ from 'lodash'
import { ADD_NOTIFICATION, RESET_NOTIFICATION } from './actionTypes';

export function addNotification(text, level) {
  let notification = text;
  if(typeof text === 'object'){
     let { message } = text    
     notification = '' 
     try{
        message = JSON.parse(message)
      }catch(error){
        message = {};
      }
     _.map(message, (index, value) => {
        notification += message[value][0] + "\n\r"   
     })
  }
  return {
    type: ADD_NOTIFICATION,
    message:notification,
    level
  };
}

export function resetNotification(){
  return {
    type: RESET_NOTIFICATION
  }
}