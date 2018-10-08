import { Route,Switch } from 'react-router-dom';   
import Login from './component/Login';  
import Display from './component/Display';
import React from 'react'
import Logout from './component/Logout';
import Profile from './component/Profile';

const Routes = () => {
    return (
      <div>
        <Switch>
            {/* <Route exact path="/" component={Form} /> */}
            {/* <Route exact path="/" component={Login} /> */}
              {/* <Route exact path="/login" component={Login} /> */}
              <Route path="/logout" component={Logout} />
              <Route path="/profile" component={Profile} />
              <Route path="/display" component={Display} />
          </Switch>
      </div>
    )
}
export default Routes;