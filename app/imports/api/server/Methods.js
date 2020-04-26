import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { Members } from "../member/Member";

async function parseTheData(data) {
  let promise = new Promise((resolve, reject) => {
    data.memberData.forEach(function (item, index, array) {
      if (item.Card > 0) {
        Accounts.createUser({
          username: item.email.toLowerCase(),
          email: item.email.toLowerCase(),
          password: item.SS.toString().slice(-4) + item.Card.toString()
        });
        Members.insert(item);
      }
    });
    resolve(true);
  });
  let result = await promise;
};

Meteor.methods({

  "members.removeAll": async function () {
    if (this.userId && Roles.userIsInRole(this.userId, "admin")) {
      //console.log('deleting members');
      const result = Members.remove({});
    }
  },

  "users.removeAll": async function () {
    if (this.userId && Roles.userIsInRole(this.userId, "admin")) {
      //console.log('deleting non admin users');
      const result = Meteor.users.remove({ roles: { $ne: "admin" } });
    }
  },

  "members.uploadAll": function (fileName, fileText) {
    //console.log('(' + fileName + ') ' + fileText);
    if (this.userId && Roles.userIsInRole(this.userId, "admin")) {
      //console.log("uploading members");
      var data = JSON.parse(fileText);
      var insertusersmembers = parseTheData(data);
    }
  }

});
