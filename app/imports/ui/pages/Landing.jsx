import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Grid, Image } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  showMember(e) {
    e.preventDefault();
    var buttonName = e.target.id;
    //console.log(buttonName);
    event.preventDefault();
    document.location.href = "#/member/search?showmember=" + buttonName;
  }

  listMembers(e) {
    e.preventDefault();
    //console.log(buttonName);
    event.preventDefault();
    document.location.href = "#/listMembers";
  }

  render() {
    return (
      <Grid verticalAlign='middle' textAlign='center' container>
        <Grid.Column width={12}>
          <p>Click here to continue.</p>
          {this.props.isAdmin === 'yes' ? (
            <button id="MemberList" onClick={this.listMembers} >Member List</button>
          ) : (
              <button id={this.props.currentUser} onClick={this.showMember} >{this.props.currentUser}</button>
            )}
          <br /><br /><p>Or sign out and sign in to see your information.</p>
        </Grid.Column>
      </Grid>
    );
  }
}

//export default Landing;

/** Declare the types of all properties. */
Landing.propTypes = {
  currentUser: PropTypes.string,
  isAdmin: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const LandingContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
  isAdmin: Roles.userIsInRole(Meteor.userId(), 'admin') ? 'yes' : 'no',
}))(Landing);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(LandingContainer);