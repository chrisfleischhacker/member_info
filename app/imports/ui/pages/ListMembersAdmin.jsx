import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { Members } from '/imports/api/member/Member';
// import MemberItemAdmin from '/imports/ui/components/MemberItemAdmin';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { withRouter, Link, useParams, Switch } from 'react-router-dom';

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

showThisMember = (str) => {
  this.setState(state => ({ pEmail: str }));
  console.log(str);
};

/** Renders a table containing all of the Member documents. Use <MemberItemAdmin> to render each row. */
class ListMembersAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
    this.handleFileSelect = this.handleFileSelect.bind(this);
  }

  displayData(content) {
    this.setState({data: content});
  }
  
  handleFileSelect(evt) {
    let files = evt.target.files;
    if (!files.length) {
      alert('No file select');
      return;
    }
    let file = files[0];
    let that = this;
    let reader = new FileReader();
    reader.onload = function(e) {
		Meteor.call('members.uploadAll',file.name, e.target.result);
      that.displayData(e.target.result);
    };
    reader.readAsText(file);
  }

  xxxhandleFileSelect(event) {
    console.log('upload members clicked');
    event.preventDefault();

/*     Meteor.call('users.removeAll');
    Meteor.call('members.removeAll'); */
	
    var file = event.target.files[0]; //assuming you have only 1 file
    if (!file) return;
    var reader = new FileReader(); //create a reader according to HTML5 File API
    reader.onload = function(event){          
      var fileText = new utf8(reader.result) // convert to binary
      Meteor.call('members.uploadAll',fileText);
    }
    reader.readAsText(file); //read the file as arraybuffer
  }

  reloadMembers(event) {
    console.log('reload all members clicked');
    event.preventDefault();
    Meteor.call('users.removeAll');
    Meteor.call('members.removeAll');
    Meteor.call('members.importAll', async function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log('members inserted');
      }
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
const data = this.state.data;
    return (
      <Container>
        <Header as="h2" textAlign="center">Member List</Header>
        <div>
          <button className="btn btn-danger" onClick={this.reloadMembers.bind()}>Reload Members</button>
        </div>
        <div>
          To reload member data:
            </div>
        <div>
          <input type="file" name="filetoupload" id="selectfiletoupload" onChange={this.handleFileSelect} />
{ data && <p> {data} </p> }
        </div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>FirstName</Table.HeaderCell>
              <Table.HeaderCell>LastName</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              {/*               <Table.HeaderCell>&nbsp;</Table.HeaderCell> */}
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

  /*   resetMemberLogin(e) {
      e.preventDefault();
      var thisMember = e.target.id;
      console.log(buttonName);
      event.preventDefault();
      Meteor.call('member.resetLogin', {thisMemberEmail: e.target.id}, function (err, res) {
          if (err) {
              console.log(err);
          } else {
              console.log('got member');
          }
      });
    } */

  showMember(e) {
    e.preventDefault();
    var buttonName = e.target.id;
    console.log(buttonName);
    event.preventDefault();
    Meteor.call('impersonate', userId, function (err) {
      if (!err) {
        Meteor.connection.setUserId(userId);
        Router.go('member');
      }
    });
    /*     Meteor.call('member.getOneByEmail', { thisMemberEmail: e.target.id }, function (err, res) {
          if (err) {
            console.log(err);
          } else {
            console.log('got member');
          }
        }); */
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.member.FirstName}</Table.Cell>
        <Table.Cell>{this.props.member.LastName}</Table.Cell>
        <Table.Cell>{this.props.member.email}</Table.Cell>
{/*         <Table.Cell>
          <button id={this.props.member.SS} onClick={this.resetMemberLogin}>&#8634;</button>
        </Table.Cell> */}
        <Table.Cell>{this.props.member.Card}</Table.Cell>
        <Table.Cell>{formatPhoneNumber(this.props.member.Ph1)}</Table.Cell>
        <Table.Cell>{this.props.member.City}</Table.Cell>
        <Table.Cell>
          <button id={this.props.member.email} onClick={this.showMember}>&#8594;</button>
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
  var xxx = Members.find().count();
  //console.log(xxx + ' members');

  return {
    members: Members.find({}, { sort: { LastName: 1 } }).fetch(),
    ready: subscription.ready(),
  };
})(ListMembersAdmin);
