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

'members.uploadAll': async function(fileName, fileText){
    console.log('(' + fileName + ') ' + fileText);
	
    if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
      console.log('uploading members');
      var data = JSON.parse(fileText);
	  
      data.memberData.forEach(function (item, index, array) {
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
      console.log(result + ' members uploaded');
	}	
},
 

})
