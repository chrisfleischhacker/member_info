import { Meteor } from 'meteor/meteor';
import { Members } from '../../api/member/Member.js';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addMemberData(data) {
  console.log(`  Adding: ${data.SS} (${data.email.toLowerCase()})`);
  Members.insert(data);
}

/** Initialize the collection if empty. */
if (Members.find().count() === 0) {
  var data = JSON.parse(Assets.getText("memberData.json"));
  if (data) {
    console.log('Importing member data.');
    data.memberData.map(data => addMemberData(data));
  }
}

/** Initialize the collection if empty. */
/* if (Members.find().count() === 0) {
  if (Meteor.settings.memberData) {
    console.log('Creating test data.');
    Meteor.settings.memberData.map(data => addMemberData(data));
  }
} */