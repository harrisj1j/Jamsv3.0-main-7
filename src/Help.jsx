import React from 'react';
import './Help.css';

function Help() {
  return (
    <div>

      <h1>In need of some assistance?</h1>
      <h2>View Accounts:</h2>
      <p> Allows you to view all of the accounts in your system. You can filter them by type, name or date added.</p>
      <h3>Add Accounts:</h3>
      <p>Allows you to create new accounts in your system. You need to provide the account name, number, type & balance! </p>
      <h4>Calendar:</h4>
      <p>Allows you to view the calendar.</p>
      <h4>Chart of Accounts Module:</h4>
      <p>Allows admins to add, view, edit or deactivate accounts. When a account is added, the admin must store in the database at least the following information: account name, account number, account type, and account balance.</p>
      <h5>Dashboard:</h5>
      <p>Provides a summary of your account activity. You can see recent transactions, balances & spending trends. </p>
      <h5>User Interface Module:</h5>
      <p>Allows users to log in the system, create new users, update information about users, acivate/deactivate users, view their login, and all accounts they have access to. </p>
      <h5>Transaction Module:</h5>
      <p>Allows users to view all of their transacttions and filter them. Also allows them to search for specific transactions. </p>
      <h5>Reports Module:</h5>
      <p> Allows users to generate reports on their account activity.</p>
      <h5>Settings Module:</h5>
      <p>Allows users to change their account settings, such as password, email, and notification preferences. </p>
    </div>
  );
}

export default Help;
