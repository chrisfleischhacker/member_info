import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Members } from '../member/Member';

Meteor.publish('MemberCount', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Members.find({}, {
      fields: {
        _id: 1
      }
    });
  }
  return this.ready();
});

Meteor.publish('GetMyInfo', function (thisEmail) {
  //console.log(thisEmail);
  if (this.userId) {
    return Members.find({ email: thisEmail });
  }
  return this.ready();
});

Meteor.publish('AdminListMembers', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Members.find({}, {
      fields: {
        FirstName: 1,
        LastName: 1,
        email: 1,
        Ph1: 1,
        Card: 1,
        City: 1
      }
    });
  }
  return this.ready();
});

Meteor.publish('AdminThisMember', function (thisMemberEmail) {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Members.find({ email: thisMemberEmail });
  }
  return this.ready();
});
