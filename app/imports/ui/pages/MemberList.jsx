import React from 'react';
import { Meteor } from 'meteor/meteor';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import { Members } from '/imports/api/member/Member';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
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

class MemberList extends React.Component {

  constructor(props) {
    super(props);
  }

  showMember(thisEmail) {
    Tracker.autorun(function () {
      if (thisEmail.toString().includes("@")) {
        selEmail.set(thisEmail);
        export const selectedEmail = selEmail;
        document.location.href = "#/member";
      }
    });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

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
        Table: 'griddle-table',
        TableBody: 'griddle-table-body',
        TableHeading: 'griddle-table-heading',
        TableHeadingCell: 'griddle-table-heading-cell',
        TableHeadingCellAscending: 'griddle-heading-ascending',
        TableHeadingCellDescending: 'griddle-heading-descending',
      },
      styles: {},
    };

    const EmailAddress = ({ value }) => <span onClick={() => this.showMember(value)} style={{ color: '#0000AA', 'text-decoration-line': 'underline' }}>{value}</span>;
    const PhoneNumber = ({ value }) => <span>{formatPhoneNumber(value.toString())}</span>;

    return (
      <div className='memberGrid'>
        <Griddle
          data={this.props.members}
          plugins={[plugins.LocalPlugin]}
          styleConfig={styleConfig}
          components={{
            SettingsToggle: () => <span />,
/*             CellEnhancer: OriginalComponent =>
              props => (
                <OriginalComponent
                  {...props}
                  onClick={() => this.showMember(props.value)}
                />
              ), */
          }}
        >
          <RowDefinition>
            <ColumnDefinition id="FirstName" title="First Name" />
            <ColumnDefinition id="LastName" title="Last Name" />
            <ColumnDefinition id="email" title="Email"  customComponent={EmailAddress} />
            <ColumnDefinition id="Card" title="Card #" />
            <ColumnDefinition id="Ph1" title="Phone" customComponent={PhoneNumber} />
            <ColumnDefinition id="City" title="City" />
          </RowDefinition>
        </Griddle>
      </div>
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
    members: Members.find({}, { sort: { LastName: 1 } }).fetch(),
    membercount: Members.find().count(),
    ready: subscription.ready(),
  };
})(MemberList);
