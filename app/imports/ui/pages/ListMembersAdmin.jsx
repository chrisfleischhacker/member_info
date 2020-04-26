import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { Members } from '/imports/api/member/Member';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Upload from '/imports/ui/components/Upload';
import { ReactiveVar } from 'meteor/reactive-var';

let selEmail = new ReactiveVar('non');

let formatPhoneNumber = (str) => {
  //Filter only numbers from the input
  let cleaned = ('' + str).replace(/\D/g, '');

  //Check if the input is of correct length
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  };

  return null
};

/** Renders a table containing all of the Member documents. Use <MemberItemAdmin> to render each row. */
class ListMembersAdmin extends React.Component {

  constructor(props) {
    super(props);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    return (
      <Container>
        <Header as="h2" textAlign="center">Member List ({this.props.membercount})</Header>
        <Upload />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>FirstName</Table.HeaderCell>
              <Table.HeaderCell>LastName</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Card</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>City</Table.HeaderCell>
              <Table.HeaderCell>&nbsp;</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.members.map((members) => <MemberItemAdmin key={members.email} member={members} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

class MemberItemAdmin extends React.Component {

  showMember(e) {
    e.preventDefault();
    Tracker.autorun(function () {
      selEmail.set(e.target.id);
      //console.log(selEmail);
      export const selectedEmail = selEmail;
      document.location.href = "#/member";
    });
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.member.FirstName}</Table.Cell>
        <Table.Cell>{this.props.member.LastName}</Table.Cell>
        <Table.Cell>{this.props.member.email}</Table.Cell>
        <Table.Cell>{this.props.member.Card}</Table.Cell>
        <Table.Cell>{formatPhoneNumber(this.props.member.Ph1)}</Table.Cell>
        <Table.Cell>{this.props.member.City}</Table.Cell>
        <Table.Cell>
          <button id={this.props.member.email} onClick={this.showMember} >&#8594;</button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
MemberItemAdmin.propTypes = {
  member: PropTypes.object.isRequired,
};

/** Require an array of Member documents in the props. */
ListMembersAdmin.propTypes = {
  members: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Member documents.
  const subscription = Meteor.subscribe('AdminListMembers');

  return {
//    members: Members.find({}, { sort: { LastName: 1 } }).fetch(),
members: Members.find({},{sort: {LastName: 1}}).fetch(),
//members: Members.find({},{sort: {LastName: 1}, limit: 10}).fetch(),
membercount: Members.find().count(),
    ready: subscription.ready(),
  };
})(ListMembersAdmin);
