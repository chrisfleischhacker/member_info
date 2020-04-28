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

/** Renders a table containing all of the Member documents. Use <MemberItemAdmin> to render each row. */
export default class UploadData extends React.Component {
    constructor(props) {
        super(props);
      }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {

    return (
      <Container>
        <Header as="h2" textAlign="center">Member List ({this.props.membercount})</Header>
        <Upload />
        </Container>
    );
  }
}