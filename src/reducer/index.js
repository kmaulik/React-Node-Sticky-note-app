import { combineReducers } from "redux";
import { reducer as formReducers } from "redux-form";
import userReducer from "./userReducer";
import notificationReducer from './noticationReducer'
import sessionReducer from "./sessionReducer";

const rootReducer = combineReducers({    
    form: formReducers, 
    users: userReducer, 
    notification: notificationReducer,
    session: sessionReducer,
})

export default rootReducer;