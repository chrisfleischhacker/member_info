import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
      <Menu style={menuStyle} attached="top" borderless>

        {this.props.currentUser && !Roles.userIsInRole(Meteor.userId(), 'admin')? (
          <Menu.Item as={NavLink} activeClassName="active" exact to="/member" key='list'>Member Info</Menu.Item>
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          [<Menu.Item as={NavLink} activeClassName="active" exact to="/uploaddata" key='add'>Reload Members</Menu.Item>,
          <Menu.Item as={NavLink} activeClassName="active" exact to="/listmembers" key='list'>List Members</Menu.Item>]
        ) : ''}

        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown text="Login&nbsp;" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin" />
              </Dropdown.Menu>
            </Dropdown>
          ) : (
              <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
                <Dropdown.Menu>
                  <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout" />
                </Dropdown.Menu>
              </Dropdown>
            )}
        </Menu.Item>
      </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
