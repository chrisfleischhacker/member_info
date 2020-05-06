import React from 'react';
import { Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const isLogged = Meteor.userId() !== null;
    const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');

    if (isAdmin) {
      return <Redirect to='/memberlist'/>;
    } else if (isLogged){
      return <Redirect to='/member'/>;
    } else {
      return <Redirect to='/signin'/>;
    }

    return (
        <Grid verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={12}>
            <h1>Welcome to Pipefitters 539</h1>
            <p>Please sign in to see your member information or click one of the navigation.</p>
          </Grid.Column>

        </Grid>
    );
  }
}

export default Landing;