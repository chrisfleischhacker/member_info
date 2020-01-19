import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Members } from '../member/Member';

Meteor.methods({

/*   'members.getOneByEmail': async function (thisEmail) {
    console.log(thisEmail);
      var data = JSON.parse(Assets.getText("memberData.json"));
      Members.findOne({'email':thisEmail}).fetch();
  }, */


    'members.importAll': async function () {
      console.log('importing...');
        var data = JSON.parse(Assets.getText("memberData.json"));
        data.memberData.forEach(function (item, index, array) {
          Members.insert(item);
      })
      var result = Members.find().count();
      console.log('imported ' + result + ' members');
    },
  
    'members.removeAll'() {
        if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {

        console.log('deleting...');
        const result = Members.remove({});
        console.log(result + ' members deleted');
      }
    }
  })
