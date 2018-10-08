import React, { Component } from 'react'
import RegistrationForm from '../view/RegistrationForm'
import { reset } from 'redux-form';
import {reduxForm } from 'redux-form'

import {addUser} from '../actions/userAction'
import {connect} from "react-redux";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

  class Registration extends Component {
    constructor(props){
      super()
      this.state={
        user_name:''
      }
    }
   
    /**
     * Submit form data to action with dispatch function
     */
    formsubmit = (values) => {
      const{dispatch} =this.props;
        let form = document.getElementById('registrationFrom');
        let request = new FormData(form);      
       // this.props.addUser(values);     
        this.props.addUser(values,()=>{
        NotificationManager.success('You have Succesfully Register:');
      });
      dispatch(reset('registrationFrom')); 
    }

    render() {
      const message = this.props

      return (
        <div>
          <RegistrationForm onSubmit={this.formsubmit} message={message}/>
          <NotificationContainer/>
          <br/>
        </div>
      )
  }
}

Registration= reduxForm({
  form: 'registrationFrom',
  enableReinitialize: true
})(Registration)


const mapStateToProps = state => {
  return {
      state : state
  }
}

export default connect(mapStateToProps,{addUser})(Registration);
