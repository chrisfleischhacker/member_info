import React from 'react';
import { Members } from '/imports/api/member/Member';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Loader, Header, Segment, Icon, Label, Menu, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2';
import { Link } from 'react-router-dom';
import { ReactiveVar } from 'meteor/reactive-var';

let formatPhoneNumber = (str) => {
  let cleaned = ('' + str).replace(/\D/g, '');
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  };

  return null
};

class ShowMember extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (

      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">{this.props.doc.FirstName} {this.props.doc.MiddleName} {this.props.doc.LastName}</Header>
          {
            (Roles.userIsInRole(Meteor.userId(), 'admin'))
              ? <h3><Link to={'/memberlist/'}> &lt; Back to List</Link></h3>
              : <div></div>
          }
          <a href="mailto://help@pipefitters539.com" key="emailChangeLink">Change My Info</a>
          <Table size='small' compact striped>
            <Table.Body>
              <Table.Row>
                <Table.HeaderCell textAlign='center' colSpan={3}>Personal Info</Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.Cell style={{ width: "33%" }}>Name:&nbsp;&nbsp;{this.props.doc.FirstName} {this.props.doc.MiddleName} {this.props.doc.LastName}</Table.Cell>
                <Table.Cell style={{ width: "33%" }}>DOB:&nbsp;&nbsp;{this.props.doc.DOB.toLocaleDateString()}</Table.Cell>
                <Table.Cell style={{ width: "33%" }}>SSN:&nbsp;&nbsp;{this.props.doc.SS}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Email:&nbsp;{this.props.doc.email}</Table.Cell>
                <Table.Cell>Phone:&nbsp;&nbsp;{formatPhoneNumber(this.props.doc.Ph1)}</Table.Cell>
                <Table.Cell>Phone:&nbsp;&nbsp;{formatPhoneNumber(this.props.doc.Ph2)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell style={{ width: "33%" }}>Address:&nbsp;&nbsp;{this.props.doc.Addr} {this.props.doc.Addr1} {this.props.doc.City} {this.props.doc.St} {this.props.doc.Zip}</Table.Cell>
                <Table.Cell style={{ width: "33%" }}></Table.Cell>
                <Table.Cell style={{ width: "33%" }}></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Class:&nbsp;&nbsp;{this.props.doc.Class}</Table.Cell>
                <Table.Cell>A/D Acc:&nbsp;&nbsp;{this.props.doc.ADAcc}</Table.Cell>
                <Table.Cell>Registered Voter:&nbsp;&nbsp;{this.props.doc.RegisterVo ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table size='small' compact striped>
            <Table.Body>
              <Table.Row>
                <Table.HeaderCell textAlign='center' colSpan={3}>Status Info</Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.Cell style={{ width: "33%" }}>Card:&nbsp;&nbsp;{this.props.doc.Card}</Table.Cell>
                <Table.Cell style={{ width: "33%" }}>Local:&nbsp;&nbsp;{this.props.doc.Localx}</Table.Cell>
                <Table.Cell style={{ width: "33%" }}>Joined:&nbsp;&nbsp;{this.props.doc.DateJoined.toLocaleDateString()}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Rate:&nbsp;&nbsp;{this.props.doc.Rate}</Table.Cell>
                <Table.Cell>Work At:&nbsp;&nbsp;{this.props.doc.WorkAt}</Table.Cell>
                <Table.Cell>B/S:&nbsp;&nbsp;{this.props.doc.BS}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table size='small' compact striped>
            <Table.Body>
              <Table.Row>
                <Table.HeaderCell textAlign='center' colSpan={4}>Classification Data</Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>BLD.CONST:&nbsp;&nbsp;{this.props.doc.BLDCONST ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
                <Table.Cell>SERVICE/INSTALL:&nbsp;&nbsp;{this.props.doc.SERVICEINS ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
                <Table.Cell>RESIDENTIAL:&nbsp;&nbsp;{this.props.doc.RESIDENTIA ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
                <Table.Cell>OPERATOR:&nbsp;&nbsp;{this.props.doc.OPERATOR ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table size='small' compact striped>
            <Table.Body>
              <Table.Row>
                <Table.HeaderCell textAlign='center' colSpan={5}>Qualifiction Data</Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>WELDING:&nbsp;&nbsp;{this.props.doc.WELDING ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
                <Table.Cell>BURNERS:&nbsp;&nbsp;{this.props.doc.BURNERS ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
                <Table.Cell>HELI-ARC:&nbsp;&nbsp;{this.props.doc.HELIARC ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
                <Table.Cell>TEMP CONT:&nbsp;&nbsp;{this.props.doc.TEMPCONT ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>AC:&nbsp;&nbsp;{this.props.doc.AC ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
                <Table.Cell>JOBBING:&nbsp;&nbsp;{this.props.doc.JOBBING ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
                <Table.Cell>REFRIGERAT:&nbsp;&nbsp;{this.props.doc.REFRIGERAT ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
                <Table.Cell>SPR VISION:&nbsp;&nbsp;{this.props.doc.SPRVISION ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
                <Table.Cell>ORBWELD:&nbsp;&nbsp;{this.props.doc.ORBWELD ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table size='small' compact striped>
            <Table.Body>
              <Table.Row>
                <Table.HeaderCell textAlign='center' colSpan={9}>Competencies &amp; Certifications</Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>HP:&nbsp;&nbsp;{this.props.doc.HP ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
                <Table.Cell>LP:&nbsp;&nbsp;{this.props.doc.LP ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
                <Table.Cell>GAS:&nbsp;&nbsp;{this.props.doc.GAS ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
                <Table.Cell>OIL:&nbsp;&nbsp;{this.props.doc.OIL ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
                <Table.Cell>AC1:&nbsp;&nbsp;{this.props.doc.AC1 ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
                <Table.Cell>CFC:&nbsp;&nbsp;{this.props.doc.CFC ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
                <Table.Cell>TANK:&nbsp;&nbsp;{this.props.doc.TANK ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
                <Table.Cell>WELD:&nbsp;&nbsp;{this.props.doc.WELD ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
                <Table.Cell>OPERATOR:&nbsp;&nbsp;{this.props.doc.OPERATOR1 ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <Table size='small' compact striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign='center' colSpan={11}>Jobs</Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>Referral</Table.HeaderCell>
                <Table.HeaderCell>Contractor</Table.HeaderCell>
                <Table.HeaderCell>JobSite</Table.HeaderCell>
                <Table.HeaderCell>JobSite</Table.HeaderCell>
                <Table.HeaderCell>County</Table.HeaderCell>
                <Table.HeaderCell>Start</Table.HeaderCell>
                <Table.HeaderCell>End</Table.HeaderCell>
                <Table.HeaderCell>GoToJob</Table.HeaderCell>
                <Table.HeaderCell>GoToShop</Table.HeaderCell>
                <Table.HeaderCell>ReportTo</Table.HeaderCell>
                <Table.HeaderCell>Agent</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                this.props.doc.jobs !== undefined && this.props.doc.jobs.length > 0
                  ? this.props.doc.jobs.sort((a, b) => a.Referral - b.Referral).map((jobs) => <ListJobs key={jobs.Referral} jobs={jobs} />)
                  : <Table.Row><Table.Cell>No Jobs</Table.Cell></Table.Row>
              }
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    );
  }
}

class ListJobs extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.jobs.Referral}</Table.Cell>
        <Table.Cell>{this.props.jobs.Contractor}</Table.Cell>
        <Table.Cell>{this.props.jobs.JobSite}</Table.Cell>
        <Table.Cell>{this.props.jobs.JobSite1}</Table.Cell>
        <Table.Cell>{this.props.jobs.County}</Table.Cell>
        <Table.Cell textAlign='right'>{moment(this.props.jobs.StartDate).format("MM/DD/YYYY")}</Table.Cell>
        <Table.Cell textAlign='right'>{moment(this.props.jobs.EndDate).format("MM/DD/YYYY")}</Table.Cell>
        <Table.Cell textAlign='center'>{this.props.jobs.GoToJob ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
        <Table.Cell textAlign='center'>{this.props.jobs.GoToShop ? <Icon name='checkmark' size='small' /> : ''}</Table.Cell>
        <Table.Cell>{this.props.jobs.ReportTo}</Table.Cell>
        <Table.Cell>{this.props.jobs.Agent}</Table.Cell>
      </Table.Row>
    );
  }
}

ListJobs.propTypes = {
  jobs: PropTypes.object,
};

ShowMember.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {

  import { selectedEmail } from '/imports/ui/pages/MemberList';
  //console.log(selectedEmail);
  var thisEmail;
  if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
    thisEmail = selectedEmail.get();
  } else {
    thisEmail = Meteor.user().emails[0].address;
  }

  const subscription = Meteor.subscribe('GetMyInfo', thisEmail.toLowerCase());

  return {
    doc: Members.findOne({ email: thisEmail.toLowerCase() }),
    ready: subscription.ready(),
  };

})(ShowMember);