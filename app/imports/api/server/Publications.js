import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Members } from '../member/Member';

Meteor.publish('GetMyInfo', function publish() {
  if (this.userId) 
  {
    return Members.find();
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('AdminListMembers', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Members.find();
  }
  return this.ready();
});

/* Meteor.publish('GetMyInfo', function publish() {
  if (Roles.userIsInRole(this.userId, 'admin'))
  //(this.userId) 
  {
    return Members.find({ email: 'bart1337@outlook.com' });
  } else {
    const username = Meteor.users.findOne(this.userId).username.toLowerCase();
    //console.log(username);
    return Members.find({ email: username });
  }
  return this.ready();
}); */