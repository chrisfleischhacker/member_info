import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Members } from '../member/Member';
import { Accounts } from 'meteor/accounts-base';


Meteor.methods({

  'users.removeAll'() {
    if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
      console.log('deleting non admin users');
      const result = users.remove({'roles': {$ne : 'admin'}});
      console.log(result + ' users deleted');
    }
  },  

  'members.removeAll'() {
    if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
      console.log('deleting members');
      const result = Members.remove({});
      console.log(result + ' members deleted');
    }
  },

  'members.importAll': async function () {
    if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
      console.log('importing members');
      var data = JSON.parse(Assets.getText("memberData.json"));
      data.memberData.forEach(function (item, index, array) {
        Members.insert(item);
      })
      var result = Members.find().count();
      console.log(result + ' members imported');
    }
  },

  impersonate: function(userId) {
    check(userId, String);
    console.log(userId);

    if (!Meteor.users.findOne(userId))
      throw new Meteor.Error(404, 'User not found');
    if (!Meteor.user().isAdmin)
      throw new Meteor.Error(403, 'Permission denied');

    this.setUserId(userId);
  },

})
