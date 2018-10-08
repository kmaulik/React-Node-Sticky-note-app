import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from './store/store';
import './App.css';
// import {connect} from 'react-redux'
import Routes from './Routes'
import Login from './component/Login'
import {Route, Switch, Redirect} from 'react-router-dom';
import Registration from './component/Registration';

class App extends Component {

  render() {
    // console.log("Session Storage",sessionStorage.jwt);
    if (!sessionStorage.jwt) {
      return (
        <Provider store={store}>
          <div>
              <Switch>
                  <Route path="/login" name="Login" component={Login}/>
                  <Route path="/registration" name="Registration" component={Registration}/>
                  <Redirect from="/" to="/login"/>
              </Switch>
          </div>
        </Provider>
      )
    }
    return (
      <Provider store={store}>
        <div className="App"> 
          <Routes/>          
        </div>
      </Provider>    
    );
  }
}

export default (App);

