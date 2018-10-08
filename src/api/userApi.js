import * as apiConstant from './apiConstant'
// import _ from 'lodash'

class userApi {

    /**
     * Api for create new user
     * @param String req {fordata of user}
     */
    static addUser(req){
        let form = document.getElementById('registrationFrom');
        let formData = new FormData(form);
        return fetch(`${apiConstant.API_URL}registration`, {
            method: 'post',                
            body: formData
            })
            .then(function (response) {
                return response.json();
            })
            .catch(function (error) {
                return error;
            });
    }

    /**
     * Api for editProfile
     * @param String req Formdata of new updated data of existing user 
     */
    static editProfile(req){
        let id=sessionStorage.getItem('user_id');
        let form = document.getElementById('ProfileForm');
        let formData = new FormData(form);
        return fetch(`${apiConstant.API_URL}profile/${id}`, {
            method: 'post',                
            body: formData
            })
            .then(function (response) {
                return response.json();
            })
            .catch(function (error) {
                return error;
            });
    }

    /**
     * Api for save new & existing notes in to database
     * @param String req 
     */
    static saveNotes(req){
        console.log("Note Request",req);
        let id=sessionStorage.getItem('user_id');
        return fetch(`${apiConstant.API_URL+'notes/save/'+id}`, {
            method: 'post',  
            headers: {
                'Content-Type': 'application/json'
              },              
            body: JSON.stringify(req)
            })
            .then(function (response) {
                return response.json();
            })
            .catch(function (error) {
                return error;
            });
    }
     
    /**
     * Api for fetch notes by user id
     * @param String id 
     */
    static getNotes_by_id(id){
        return fetch(`${apiConstant.API_URL+'notes'}/${id}`, {
            method: 'get',
        }).then(function (response) {
            console.log("called");
            return response.json();
        }).catch(function (error) {
                throw error;
        });
    }
     
    /**
     * Api for fetch data of user by its unique ID
     * @param String id 
     */
    static getUser_by_id(id){
        return fetch(`${apiConstant.API_URL+'profile'}/${id}`, {
            method: 'get',
        }).then(function (response) {
            console.log("called");
            return response.json();
        }).catch(function (error) {
                throw error;
        });
    }
}

export default userApi