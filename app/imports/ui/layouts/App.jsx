import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Landing from '../pages/Landing';
import ShowMember from '../pages/ShowMember';
import ListMembersAdmin from '../pages/ListMembersAdmin';
import MemberList from '../pages/MemberList';
import UploadData from '../pages/UploadData';
import Signin from '../pages/Signin';
import Signout from '../pages/Signout';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/signin" component={Signin} />
            <ProtectedRoute exact path="/signout" component={Signout} />
            <ProtectedRoute exact path="/member" component={ShowMember} />
            <AdminProtectedRoute exact path="/memberlist" component={MemberList} />
            <AdminProtectedRoute exact path="/listmembers" component={ListMembersAdmin} />
            <AdminProtectedRoute exact path="/uploaddata" component={UploadData} />
            <Route component={Landing} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        );
    }}
  />
);

const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        );
    }}
  />
);

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default App;