import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import {Col} from "react-bootstrap";
import { Link} from 'react-router-dom';

const matchPassword = (values, allValues) => (allValues.confirm_password !== allValues.password )
? 'Password mismatched' 
: undefined;

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
    },
}) => (
    <div className="form-group">
        <label className="control-label">{label}</label>
        <span className="required" style={{ color:"red" }}>*</span>

        <input {...input} placeholder={label} type={type} className="form-control"/> {touched && ((error && <span style={{ color:"red" }}>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
)


class RegistrationForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit} id="registrationFrom" name="registrationFrom">
        <div className="header text-center">
            <h4 className="title">User Registration</h4>
            <p className="category"></p>
        </div>
        
        <div className="content" style={{ marginLeft:500 }}>
          <Col md={5}>
            <div className="ml-600">
              <div>
                <Field
                  name="name"
                  type="text"
                  component={renderField} 
                  label="Username"
                  validate={[required]}
                />
              </div>
            </div>
            <div className="ml-600">
              <div>
                <Field
                  name="email"
                  type="email"
                  component={renderField} 
                  label="Email"
                  validate={[required,email]}
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
              <div>
                <Field
                  name="confirm_password"
                  type="password"
                  component={renderField} 
                  label="Confirm Password"
                  validate={[required, matchPassword]}
                />
              </div>
            </div>
            <div>
              <button type="submit" className="btn-fill btn-wd btn btn-info" disabled={pristine || submitting} ><i class="fa fa-user-plus"></i>
              &nbsp; Register
                </button>
                &nbsp;&nbsp; 
              <button type="button" className="btn-fill btn-wd btn btn-default" disabled={pristine || submitting} onClick={reset}><i className=" fa fa-eraser"></i>
              &nbsp; 
                Clear
                </button>
                &nbsp;&nbsp; 
                <Link to="/login" className="btn-fill btn-wd btn btn-primary"><i className=" fa fa-sign-in"></i>
              &nbsp; Login</Link>
            </div>
          </Col>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'registrationFrom'
})(RegistrationForm)