import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Members, MembersSchema } from '/imports/api/member/Member';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';

class MyInfo extends React.Component {

    constructor(props) {
        super(props);

    };

    requestChange(event) {
        event.preventDefault();
        Meteor.call('member.requestChange');
    }

    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
      }
    
      renderPage() {
          return (
            <div className="card card-inverse card-primary">
                <div className="card-block pb-0">
                    <header>
                        <h3>Member</h3>
                        <button className="btn btn-warning" onClick={this.requestChange.bind()}>Change My Info</button><br /><br />
                    </header>
                    <br />
                    {this.props.member.SS}
                    {this.props.member.FirstName}
                    {this.props.member.LastName}
                    {this.props.member.email}
                    {this.props.member.Card}
                    {this.props.member.Addr}
                    {this.props.member.City}
                    {this.props.member.Phone}
                    {this.props.member.Zip}
                    

                </div>
            </div>
        );
    }
}



export default withTracker(() => {
    const subscription = Meteor.subscribe('GetMyInfo');
        return {

            member: Members.findOne(),
            ready: subscription.ready(),
        };
    })(MyInfo);