import {
    ADD_NOTIFICATION,
    RESET_NOTIFICATION
} from '../actions/actionTypes';

export default function notification(state = {}, action) {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return Object.assign({}, state, {
                message: action.message,
                level: action.level
            });
        case RESET_NOTIFICATION:
            return {}
        default:            
            return state;
    }
} 