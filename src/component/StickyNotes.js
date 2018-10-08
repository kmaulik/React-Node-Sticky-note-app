import React, { Component } from 'react'
import {connect} from "react-redux";
import {saveNotes} from '../actions/userAction'
import userApi from '../api/userApi'
import { Link} from 'react-router-dom';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tooltip';
import Draggable from 'react-draggable'; // Both at the same time
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import $ from 'jquery'
import idGenerator from 'react-id-generator';
import Resizable from 're-resizable';

var timer;

class StickyNotes extends Component {
    constructor(props){
        super()
        this.state={
          notes:[]
        }

        /**
         * get notes by id
         */
        userApi.getNotes_by_id(sessionStorage.getItem('user_id'))
            .then(response => {
                //console.log('result ',response.result.notes);
                this.setState({notes:response.result.notes});
            });
    }


    /**
     * Set unique id for each note
     */
    nextId = () =>{
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    }

    /**
     * This function is used to add new note
     */
    add = (text) =>{
        var arr = this.state.notes;
        arr.push({
            id: idGenerator(),
            note: ''
        });
        this.setState({notes: arr});
    }

    /**
     * This function is used to remove note
     */
    removeNote = (e,i) => {
        console.log('i => ',i);
        var arr = this.state.notes;
        console.log(arr.splice(i, 1));
        this.setState({notes: arr});
        this.props.saveNotes(this.state)
        
    }

    /**
     * This function is used to update note
     */
    update= (e, i) =>{
        var arr = this.state.notes;
        arr[i].note = e.target.value;
        this.setState({notes:arr});
    }

    /**
     * The above update & this function work same but the differnce is only that above function is for ckeditor
     */
    onChange(evt,i){
        // console.log("onChange fired with event info: ", evt);
        // console.log("IIIIIIIIIIIIIIIIIIIIII: ", i);
        var newContent = evt;
        var arr = this.state.notes;
        arr[i].note = newContent;
        this.setState({notes:arr});
      }

    /**
     * This function used to save all notes in database
     */
    save = () =>{
        this.props.saveNotes(this.state)
    }
    /**
     * This function used to save all notes in database when key is released
     */
    key_released = () =>{
        clearTimeout(timer);
        timer = setTimeout(() => {
            this.props.saveNotes(this.state)
        }, 2000);
    }
    
    /**
     * Image upload through summernote editor
     */
    onImageUpload(images, insertImage) {

        console.log('onImageUpload', images);
        /* FileList does not support ordinary array methods */
        for (let i = 0; i < images.length; i++) {
            /* Stores as bas64enc string in the text.
             * Should potentially be stored separately and include just the url
             */
            const reader = new FileReader();

            reader.onloadend = () => {
                insertImage(reader.result);
            };

            reader.readAsDataURL(images[i]);
        }
    };

    /**
     * This function is used to display all notes
     */
    eachNote = (note, i) => {
        //console.log("Notes===>",note.note)
        //console.log("Index===>",i)
        return (
                  
                <Draggable
                    key={i+1}
                    handle=".handle"
                    disabled={false}
                    allowAnyClick={false} 
                    enableUserSelectHack={false}
                    defaultPosition={{x: 25, y:25}}
                    >
                        <font key={i} className="col-md-2" style={{ marginRight:45 }}>
                        &nbsp;
                            <div className="note-toolbar panel-heading custome-toolbar-height handle"><button style={{marginTop:4,marginRight:4, borderRadius:1000,background:'black',paddingRight:3,paddingLeft:3}} index={i} onClick={(e)=>this.removeNote(this,i)} className="btn btn-xs btn-danger fa fa-remove pull-right remove_button media-remove"/></div>
                            <ReactSummernote
                                draggable={true}
                                value={note.note}
                                className="note-editable"
                                options={{ 
                                dialogsInBody: false,
                                toolbar: [
                                        ['insert', [/*'picture','video'*/]],
                                        ['view', [/*fullscreen'*/]],
                                    ]
                                }}
                                onChange={(e)=>this.onChange(e,i)}
                                onBlur={this.save}
                                onKeyUp={this.key_released}
                                onImageUpload={this.onImageUpload}
                            />
                           
                        </font>
            </Draggable>
        );
    }
    
    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav pullRight>
                        <NavDropdown eventKey={3} title={sessionStorage.getItem('username')} id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}><Link to="/profile" className="fa fa-cog"> &nbsp;Profile</Link></MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3}><Link to="/logout" className="fa fa-sign-out">&nbsp;Logout</Link></MenuItem>
                        </NavDropdown>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} onClick={this.add.bind(null, "12")}>
                                <i className="fa fa-plus-circle"></i>&nbsp; New Note
                            </NavItem>
                        </Nav>
                        <nav pullLeft>
                            <h4 align="center" style={{ color: "#F5F596",marginTop:15 }}>Hello! {sessionStorage.getItem('username')} Welcome to you on dashboard</h4>
                        </nav>
                    </Navbar.Collapse>
                </Navbar>

                {/* <div className="row" style={{ marginLeft:15 }}>
                    <button onClick={this.add.bind(null, "")} className="btn btn-info pull-right">+</button>&nbsp;
                    <Link style={{marginTop : 0}} to='/profile' className="btn btn-success fa fa-user-circle-o">&nbsp; Edit Profile &nbsp;</Link>&nbsp; 
                    <Link to="/logout" className="btn btn-warning fa fa-sign-out">&nbsp;  Logout</Link>
                </div> */}
                {/* <br/> */}
                {/* <div className="Notes">
                    <textarea className="sticky-note pull-left" style={{ marginLeft:50 }}></textarea>
                </div> */}
                
                <div>
                    {this.state.notes.map(this.eachNote)}
                </div>
             
            </div>
          )
    }
}
 
const mapStateToProps = state => {
    return {
        state : state,
    }
  }
  function mapDispatchToProps(dispatch) {
    return {
        //actions: bindActionCreators(sessionActions, dispatch)
        saveNotes : (values) => {
          dispatch(saveNotes(values));
        },
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(StickyNotes)
