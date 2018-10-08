import * as apiConstant from './apiConstant'
class sessionApi {

    /**
     * Api for login
     * @param Login Details credentials 
     */
    static login(credentials) { 
      console.log('credentials>>>>>',credentials.password);
      console.log('credentials>>>>>',credentials.userName);       
        return fetch(`${apiConstant.API_LOGIN_URL}login`, {
            method: 'post',
            headers: {
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `email=${credentials.userName}&password=${credentials.password}`
          })
          .then(function (response) {
            return response.json();
          })
          .catch(function (error) {
            return error;
          });
    }
}

export default sessionApi;