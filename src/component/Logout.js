import React, { Component } from 'react'
// import Login from '../component/Login'
import {Redirect} from 'react-router-dom'

class Logout extends Component {
  render() {
    console.log('hellodsfjhsadljfsakfsjk');
    sessionStorage.removeItem('jwt')  
    sessionStorage.removeItem('user_id')  
    // this.props.history.push('/login');
    return(
        <Redirect from="/" to="/login"/>
    )
  }
}

export default Logout
