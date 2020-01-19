import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    //Meteor.logout();
    Meteor.logout(function(err) {
      return (<Redirect to={{ pathname: '/signin'}}/>
      );
    });
    return (

      <div>
        <Header as="h2" textAlign="center">
          <p>You are signed out.</p>
        </Header>

        <Redirect to={{ pathname: '/signin'}}/>
      </div>
    );
  }
}
