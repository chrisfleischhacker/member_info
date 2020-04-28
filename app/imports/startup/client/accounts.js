import { Accounts } from 'meteor/accounts-base';
import { browserHistory } from 'react-router';

Accounts.onLogout(() => {
  browserHistory.push('/signin');
});