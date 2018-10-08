import React, { Component } from 'react'
import LoginForm from '../view/LoginForm'
import {loginUser} from '../actions/sessionAction'
import {Col} from 'react-bootstrap';
import {connect} from "react-redux";
import 'react-notifications/lib/notifications.css';
// import * as sessionActions from "../actions/sessionAction";
import { NotificationContainer, NotificationManager } from 'react-notifications';

  class Login extends Component {
    constructor(props){
      super()
      this.state={
        user_name:''
      }
      // sessionStorage.removeItem('jwt');
      console.log("users",props.adduser.users.addUser)
      if(props.adduser.users.addUser === true){
        console.log('Successfully registered');
        NotificationManager.success('You have successfully registered');  
      }
    }
   
    /**
     * Pass username and password in loginUser Action to check authenctication
     */
    formsubmit = (values) => {
      
      this.props.loginUser(values);
      this.setState({user_name:values.userName})
    }

    /**
     * If username & password is wrong then redirect to display page
     */
    componentDidUpdate()
    {
      if (this.props.state.login_once === true) {
        this.props.state.login_once = false;
        this.props.history.push('/display');
      }
    }

    render() {
      const session = this.props.state.error   
 
      return (
        <div>
          <LoginForm onSubmit={this.formsubmit} sessionData={session}/>
          <NotificationContainer/>
          <br/>
          
          <div className="content" style={{ marginLeft:500,marginTop:215,position:"inherit" }}>
            <Col md={5}>
            </Col>
          </div>
        </div>
      )
  }
}
 
const mapStateToProps = state => {
  console.log("Csdkjfakjfhsakjdfh",state.session.message);
  return {
      state : state.session,
      adduser : state
  }
}
function mapDispatchToProps(dispatch) {
  return {
      //actions: bindActionCreators(sessionActions, dispatch)
      loginUser : (values) => {
        dispatch(loginUser(values));
      },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
//export default withRouter(Login)