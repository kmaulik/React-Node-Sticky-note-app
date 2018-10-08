import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import {Col} from "react-bootstrap";
import { Link} from 'react-router-dom';
import {Alert} from "react-bootstrap";

const required = value => value
    ? undefined
    : 'This Field Is Required.'
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Please Enter Valid Email Address'
    : undefined
const renderField = ({
    input,
    label,
    type,
    meta: {
        touched,
        error,
        warning
    }
}) => (
    <div className="form-group">
        <label className="control-label">{label}</label>
        <span className="required" style={{ color:"red" }}>*</span>

        <input {...input} placeholder={label} type={type} className="form-control"/> {touched && ((error && <span style={{ color:"red" }}>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
)

class LoginForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit} method="post">
        <div className="header text-center">
            <h4 className="title">Login</h4>
            <p className="category"></p>
        </div>
        
        <div className="content" style={{ marginLeft:500 }}>
          <Col md={5}>
          <br/>
            {this.props.sessionData ?
              <Alert bsStyle="danger"> <span>
                  Invalid Email Or Password</span>
              </Alert>
              : ''}
              {this.props.registrationMessage === true ?
              <Alert bsStyle="success"> <span>
                  You have successfully registered, now you can login with your email & password.</span>
              </Alert>
              : ''}
            <div className="ml-600">
              <div>
                <Field
                  name="userName"
                  type="email"
                  component={renderField} 
                  label="Username"
                  validate={[email, required]}
                />
              </div>
            </div>
            <div>
              <div>
                <Field
                  name="password"
                  type="password"
                  component={renderField} 
                  label="Password"
                  validate={[required]}
                />
              </div>
            </div>
            <div>
              <button type="submit" className="btn-fill btn-wd btn btn-info" disabled={pristine || submitting} ><i className=" fa fa-sign-in"></i>
              &nbsp; Login
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
              <button type="button" className="btn-fill btn-wd btn btn-default" disabled={pristine || submitting} onClick={reset}><i className=" fa fa-eraser"></i>
              &nbsp; Clear
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/registration" className="btn-fill btn-wd btn btn-primary"><i className=" fa fa-user"></i>&nbsp;Sign Up</Link>
            </div>
            
          </Col>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'login' // a unique identifier for this form
})(LoginForm)