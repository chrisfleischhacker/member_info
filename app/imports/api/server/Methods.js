import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Members } from '../member/Member';


Meteor.methods({

  'users.removeAll'() {
    if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
      console.log('deleting non admin users');
      const result = Meteor.users.remove({'roles': {$ne : 'admin'}});
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
        // Members.insert(item);
        if (item.Ph1 > 1) {
          console.log(`  Adding: ${item.email.toLowerCase()}`);
          Accounts.createUser({
            username: item.email.toLowerCase(),
            email: item.email.toLowerCase(),
            password: item.SS.toString().slice(-4)+item.Ph1.toString()
          });
          Members.insert(item);
        }
      })
      var result = Members.find().count();
      console.log(result + ' members imported');
    }
  },

'members.uploadAll': function(fileName, fileText){
    console.log('(' + fileName + ') ' + fileText);
},
  
/*      'members.uploadAll': function (fileName, fileData) {
      console.log('>> received file >> ' + fileName + ' data: ' + fileData.result); 
//      console.log('>> received file >> ' + fileInfo.name + ' data: ' + fileData); 
	  return 'xxx';
   },
 */
 
 
 
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
