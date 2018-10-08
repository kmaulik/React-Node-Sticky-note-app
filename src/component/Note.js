import React, { Component } from 'react';

class Note extends Component {
    
    // get initial state of form
    getInitialState = () =>{
        return {editing: true};
    }

     // states for buttons
    edit = () =>{
        this.setState({editing: true});
    }

    remove = () =>{
        this.props.deleteFromBoard(this.props.index);
    }

    save = () =>{
        this.props.updateNoteText(this.refs.newText.value, this.props.index)
        this.setState({editing: false});
    }

    // render different fields based on state
    renderNormal = () =>{
        return (
          <div className="col s12 m6">
            <div className="noteContainer card blue-grey darken-1">
              <div className="noteText card-content white-text">
                <span className="card-title">{this.props.children}</span>
              </div>
              <div className="card-action">
                <button onClick={this.edit} className="waves-effect waves-light btn">Edit</button>
                <button onClick={this.remove} className="waves-effect waves-light btn red darken-4">Remove</button>
              </div>
            </div>
          </div>
        );
      }
      renderForm = () =>{
        return (
          <div className="col s12 m6">
            <div className="noteContainer card blue-grey darken-1">
              <div className="noteText card-content white-text">
                <div class="input-field col s6">
                  <label for="textarea1">Note</label>
                  <textarea id="textarea1" className="materialize-textarea" ref="newText" defaultValue={this.props.children}></textarea>
                </div>
              </div>
              <div className="card-action">
                <button onClick={this.save} className="waves-effect waves-light btn">Save</button>
                <button onClick={this.remove} className="waves-effect waves-light btn red darken-4">Remove</button>
              </div>
            </div>
          </div>
        );
      }

    render() {
        return (
            <div>
            {this.state.editing ?this.renderForm():this.renderNormal()}
            </div>
        );
    }
}

export default Note;