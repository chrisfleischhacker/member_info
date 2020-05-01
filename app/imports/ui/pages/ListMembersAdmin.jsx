import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { Members } from '/imports/api/member/Member';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Upload from '/imports/ui/components/Upload';
import { ReactiveVar } from 'meteor/reactive-var';

let selEmail = new ReactiveVar('non');

let formatPhoneNumber = (str) => {
  let cleaned = ('' + str).replace(/\D/g, '');
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  };

  return null
};

class ListMembersAdmin extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

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

MemberItemAdmin.propTypes = {
  member: PropTypes.object.isRequired,
};

ListMembersAdmin.propTypes = {
  members: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {

  const subscription = Meteor.subscribe('AdminListMembers');

  return {
    members: Members.find({}, { sort: { LastName: 1 } }).fetch(),
    membercount: Members.find().count(),
    ready: subscription.ready(),
  };
})(ListMembersAdmin);
