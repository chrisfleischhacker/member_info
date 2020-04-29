import React from 'react';
import { Meteor } from 'meteor/meteor';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import { Members } from '/imports/api/member/Member';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Upload from '/imports/ui/components/Upload';
import { Loader } from 'semantic-ui-react';
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
class MemberList extends React.Component {

  constructor(props) {
    super(props);
  }



  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {


    const styleConfig = {
      icons: {
        TableHeadingCell: {
          sortDescendingIcon: '▼',
          sortAscendingIcon: '▲',
        },
      },
      classNames: {
        Cell: 'griddle-cell',
        Filter: 'griddle-filter',
        Loading: 'griddle-loadingResults',
        NextButton: 'griddle-next-button',
        NoResults: 'griddle-noResults',
        PageDropdown: 'griddle-page-select',
        Pagination: 'griddle-pagination',
        PreviousButton: 'griddle-previous-button',
        Row: 'griddle-row',
        RowDefinition: 'griddle-row-definition',
        Settings: 'griddle-settings',
        SettingsToggle: 'griddle-settings-toggle',
        Table: 'griddle-table',
        TableBody: 'griddle-table-body',
        TableHeading: 'griddle-table-heading',
        TableHeadingCell: 'griddle-table-heading-cell',
        TableHeadingCellAscending: 'griddle-heading-ascending',
        TableHeadingCellDescending: 'griddle-heading-descending',
      },
      styles: {},
    }

    return (
      <Griddle
      data={this.props.members}
      plugins={[plugins.LocalPlugin]}
      styleConfig={styleConfig}
      >
    <RowDefinition>
      <ColumnDefinition id="FirstName" title="First Name" />
      <ColumnDefinition id="LastName" title="Last Name" />
      <ColumnDefinition id="email" title="Email" />
      <ColumnDefinition id="Card" title="Card #" />
      <ColumnDefinition id="Ph1" title="Phone" />
      <ColumnDefinition id="City" title="City" />
    </RowDefinition>
  </Griddle>
    );
  }
}

MemberList.propTypes = {
  members: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('AdminListMembers');
  return {
members: Members.find({},{sort: {LastName: 1}}).fetch(),
membercount: Members.find().count(),
    ready: subscription.ready(),
  };
})(MemberList);
