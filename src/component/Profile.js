import React, { Component } from 'react'
import ProfileForm from '../view/ProfileForm'
import { connect } from 'react-redux'
import userApi from '../api/userApi';
import 'react-notifications/lib/notifications.css';
import { editProfile } from "../actions/userAction";
import { initialize } from "redux-form";
// import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Link} from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class Profile extends Component {

    constructor(props) {
        super()
        this.fetchdata = this.fetchdata.bind(this);
        this.state={
            image_url:''
        }
    }

    /**
     * get data of user which we need to display in form
     */
    componentWillMount = () => {
        this.fetchdata(this.props.match.params.id);
    }

    /**
     * This function directly get data trough api
     * @param unique id of user id 
     */
    fetchdata(id) {
        userApi.getUser_by_id(sessionStorage.getItem('user_id'))
            .then(response => {
                // console.log(response);
                response.name = response.result.name;
                response.email = response.result.email;
                response.image_name= response.result.image_name;
                console.log('image_name',response.image_name);
                let formData = {
                    name: response.name,
                    email: response.email   ,
                    image_name: response.image_name,
                };
               this.props.initialize_edit_form(formData);
               this.setState({image_url:response.image_name});
            })

    }

    /**
     * This function is used to pass data to editProfile  action
     */
    formsubmit = (values) => {
        console.log(values)
        this.props.editProfile(values, sessionStorage.getItem('user_id'),this.props.history.push('/display'), () => { 
        });
    }
    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                        <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav pullRight>
                        <NavDropdown eventKey={3} title={sessionStorage.getItem('username')} id="basic-nav-dropdown">
                            <MenuItem eventKey={3.3}><Link to="/logout" className="fa fa-sign-out">Logout</Link></MenuItem>
                        </NavDropdown>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1}>
                                <Link to="/display" className="custom_link" style={{color:'#9d9d9d'}}><i className="fa fa-eye"></i>&nbsp; View Notes</Link>
                            </NavItem>
                        </Nav>
                        <nav pullLeft>
                            <h3 align="center" style={{ color: "#F5F596" }}>Edit Profile</h3>
                        </nav>
                    </Navbar.Collapse>
                </Navbar>
                <br/>
                <br/>
                <ProfileForm onSubmit={this.formsubmit} image_url={this.state.image_url}/>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        notes: state,
    }
}
const mapDispatchToProps = dispatch => {
  return {
        editProfile: (values, id, callback) => { //This function is used to dispatch action of editProfile
            dispatch(editProfile(values, id,callback));
        },
        initialize_edit_form : (formData) =>{ //this is used to set inital value in redux form
            dispatch(initialize('ProfileForm', formData)); //in that 'edit_book' parameter is a name of form which we wwill pass redux_form fucntion in child component
        }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Profile)