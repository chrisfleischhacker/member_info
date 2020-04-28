import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { withTracker } from "meteor/react-meteor-data";
import { withRouter } from "react-router-dom";

class Upload extends React.Component {
  constructor(props) {
    super(props);
  }

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
//      await Meteor.callPromise(Meteor.call("members.removeAll"));
//      await Meteor.callPromise(Meteor.call("users.removeAll"));
      await Meteor.callPromise('members.uploadAll', file.name, e.target.result, function (err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log('members uploaded ' + res);
        }
      });

      /*       Meteor.call('members.uploadAll', file.name, e.target.result, function (err, res) {
                if (err) {
                  console.log(err);
                } else {
                  console.log('members uploaded');
                }
              });
       */

      console.log('import finished ' + new Date())

    };
    reader.readAsText(file);

  }

  render() {

    return (
      <div>
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

Upload.propTypes = {
  currentUser: PropTypes.string
};

const UploadContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : ""
}))(Upload);

export default withRouter(UploadContainer);
