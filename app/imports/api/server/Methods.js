import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Members } from '../member/Member';

Meteor.methods({

  'users.removeAll'() {
    if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
      //console.log('deleting non admin users');
      const result = Meteor.users.remove({'roles': {$ne : 'admin'}});
    }
  },  

  'members.removeAll'() {
    if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
      //console.log('deleting members');
      const result = Members.remove({});
    }
  },

  'members.uploadEach': async function(item){
    if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
        if (item.Card > 0) {
          Accounts.createUser({
            username: item.email.toLowerCase(),
            email: item.email.toLowerCase(),
            password: item.SS.toString().slice(-4)+item.Card.toString()
          });
          Members.insert(item);
        }
      var result = Members.find().count();
	}	
},

})
