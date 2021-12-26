import React, {useContext} from "react";

import {
    Redirect,
    Route,
    Switch,
  } from "react-router-dom";

import Home from "../../pages/home";
import Login from "../../pages/login";
import Bio from "../../pages/bio";
import RequestPage from "../../pages/request";
import AppointmentsPage from "../../pages/appointments";
import { Subjects } from "../../pages/subjects";
import SignUp from "../../pages/sign-up";
import { AuthContext } from "../../context/auth-context";



const Routes = (props) => {
  
const auth = useContext(AuthContext);

return (<React.Fragment>
      
      { auth.token !== "" && (
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/subjects" exact component={Subjects} />
          <Route path="/requests" exact component={RequestPage} />
          <Route path="/requests/me" component={AppointmentsPage} />
          <Route
            path="/requests/:subject_id"
            
            component={RequestPage}
          />
          <Route path="/bio" exact component={Bio} />
          <Route path="/" exact component={Home} />
          <Route path="/canceled" exact component={Home}/>
          <Route path="/success" exact component={Home}/>
          <Redirect to="/" />
        </Switch>
      )}
      {auth.token === "" && (
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/subjects" exact component={Subjects} />
          <Route path="/bio" exact component={Bio} />
          <Redirect to="/" />
        </Switch>
      )}
</React.Fragment>)


}

export default Routes;