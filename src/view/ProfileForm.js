import React from 'react'
import {
  Button, Col
} from 'react-bootstrap';
import { Link} from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import _ from 'lodash';
import $ from 'jquery'

const image_path = "http://localhost:4000/";

const required = value => value
    ? undefined
    : 'This Field Is Required.'

const renderFile = ({id,input,label,type}) => {
  let newInput = _.omit(input, ['value'])
return (
  <div>
   <label className="control-label"> {label} </label>   
   <input id={id} {...newInput} type={type} className="form-control"/>
   </div>
  )
}

const renderField = ({ id, input, label, type, meta: { touched, error, warning }, disabled,isnotrequired }) => {
  const errorClass = ((touched) && error) ? 'form-group has-error' : 'form-group';
  return (
    <div className={errorClass}>
            <label className="control-label">{label}{isnotrequired === "true" ? '' : <span className="required">*</span>}</label>
            <input id={id} {...input} placeholder={label} type={type} className="form-control" disabled={disabled}/>
            {touched && ((error && <p className="help-block">{error}</p>) || (warning && <p className="help-block">{warning}</p>))}
    </div>
  )
}
let preview_image=''
const handleChange = (event) =>{
    preview_image=URL.createObjectURL(event.target.files[0])
    $('#image_preview').attr('src',preview_image)
}

let ProfileForm = (props) => {
  // console.log("props>>>>",props.image_url);
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit} id="ProfileForm" name="ProfileForm" encType="multipart/form-data">
      <div>
        <div>
          <Col md={6} mdOffset={3}>
            <Field
              name="name"
              component={renderField}
              type="text"
              label="Name"
              placeholder="Book Name"
              validate={[required]}
            />
          </Col>
        </div>
      </div>
      <div>
        <div>
          <Col md={6} mdOffset={3}>
            <Field
              name="email"
              component={renderField}
              type="email"
              label="Email"
              placeholder="Email"
              validate={[required]}
            />
          </Col>
        </div>
      </div>
      <div>
          <Col md={6} mdOffset={3}>
            <div>
            <Field 
                name="image"
                type="file"
                label="Profile Picture"
                onChange={handleChange}
                component= {renderFile} />
            </div>
          </Col>
      </div>
      <div>
        <Col md={6} mdOffset={3}>
          <div style={{ marginTop:40 }}>
            <label className="control-label"></label>
            { 
              props.image_url !== '' && props.image_url !== undefined  ? <img src={image_path+props.image_url} alt="Book Data" height="100" width="100" id="image_preview" style={{borderRadius:60}}/> : <img src={image_path+"uploads/image_95.png"} alt="Book Data" height="100" width="100" style={{borderRadius:60}}/> 
            }
          </div>
        </Col>
      </div>
      <div>
        <br/>
          <Col md={6} mdOffset={3} style={{ marginTop:30 }}>
              <br/>
              <Button type="submit" className="btn-fill btn btn-primary" disabled={pristine || submitting} >
                Submit
              </Button>
              
              &nbsp;&nbsp;&nbsp;   
              
              <Button type="button" disabled={pristine || submitting} onClick={reset}>
                Clear Values
              </Button>
              &nbsp;&nbsp;&nbsp;
           
              <Link to="/display" className="btn btn-primary">Back
              </Link>
          </Col>
      </div>
    </form>
  )
}

ProfileForm = reduxForm({
  form: 'ProfileForm'
})(ProfileForm)

export default ProfileForm;