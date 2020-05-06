import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { Members } from '/imports/api/member/Member';
import { withTracker } from "meteor/react-meteor-data";
import { Loader } from 'semantic-ui-react';

class Upload extends React.Component {

  uploadAllMembers = function (evt) {
    let files = evt.target.files;
    if (!files.length) {
      alert('No file selected');
      return;
    }

    Meteor.call("members.removeAll", function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log("members deleted");
      }
    });

    Meteor.call("users.removeAll", function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log("users deleted");
      }
    });

    let file = files[0];
    let that = this;
    let reader = new FileReader();
    reader.onloadend = async function (e) {

      console.log('import started ' + new Date())
      await Meteor.callPromise('members.uploadAll', file.name, e.target.result, function (err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log('members uploaded ' + res);
        }
      });
      console.log('import finished ' + new Date())
    };
    reader.readAsText(file);

  }

  render() {


    return (

      <div className='memberGrid'>
        <div>
          <h2>({this.props.membercount}) Members</h2>
        </div>
        <div>To reload member data:</div>
        <div>
          <input
            type="file"
            name="filetoupload"
            id="selectfiletoupload"
            onChange={this.uploadAllMembers}
          />
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  const subscription = Meteor.subscribe('MemberCount');
  return {
    membercount: Members.find().count(),
  };
})(Upload);
