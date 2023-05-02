import { createBrowserRouter, createRoutesFromElements, Route, Link, Outlet, RouterProvider } from 'react-router-dom';
import { createRoot } from "react-dom/client";
import Help from "./Help";
import './NavbarStyles.css'
import { Login } from './Login';
import { Register } from './Register';
import {Navbar} from './Navbar';
import {Root} from './root';
import Calendar from "./Calendar";

 import {FilterSearch} from './FilterSearch';
import { Forgotpass } from './Forgotpass';
import {AdminHome} from './AdminHome';
import {ManagerHome} from './ManagerHome';
import {AccountantHome} from './AccountantHome';
import { Home } from './Home'
import ProtectedRoutes from './ProtectedRoutes';
import {AddAccount} from './AddAccount'
import {EditAccount} from './EditAccount'
import {ViewAccounts} from './ViewAccounts'
import {ViewUsers} from './ViewUsers'
import {DeactivateAccount} from './DeactivateAccount'
import {Ledger} from "./Ledger"
import {AdminCreateUser} from "./AdminCreateUser"
import { JournalEntry } from './JournalEntry';
import React, { useEffect, useState } from 'react';
import './bootstrap.css';
import './App.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CreateJE } from './CreateJE';
import {AppRejJE} from './AppRejJE'
import { TrialBalance } from './TrialBalance';
import { Notifications } from './Notifications';
import { ViewJE } from './ViewJE';
import { BalanceSheet } from './BalanceSheet';
import { FinancialReport } from './FinancialReport';



function App() {


  const auth = getAuth();
  const user = auth.currentUser;
  //Create routes for screen navigation
const router = createBrowserRouter([
  {
    
    element: <AppLayout />,
    children: [
      {
    path: "Register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "home",
    element: <Home />,
  },

  {
    path: "Help",
    element: <Help />,
  },

  {
    path: "Calendar",
    element: <Calendar />,
  },

  {
    path: "forgotpass",
    element: <Forgotpass />
  },
  {
    path: "adminhome",
    element: <AdminHome />
  },
   {
    path: "managerhome",
    element: <ManagerHome />
  },
   {
    path: "accountanthome",
    element: <AccountantHome />
  },
  {
    path: "home/addaccount",
    element: <AddAccount />
  },
  {
    path:"home/createje",
    element: <CreateJE/>
  },
  {
    path:"home/viewje",
    element: <ViewJE/>
  },
  {
    path: "home/AdminCreateUser",
    element: <AdminCreateUser/>
  },
  {
    path: "home/viewaccounts/editaccount",
    element: <EditAccount />
  },
  {
    path: "home/viewaccounts",
    element: <ViewAccounts />
  },
  {
    path: "home/viewaccounts/ledger",
    element: <Ledger />
  },
  {
    path: "home/viewaccounts/ledger/journalentry",
    element: <JournalEntry />
  },
  {
    path: "home/viewusers",
    element: <ViewUsers />
  },
  {
    path: "home/apprejje",
    element: <AppRejJE />
  },
  {
    path: "home/apprejje/journalentry",
    element: <JournalEntry />
  },
  {
    path: "home/financialreport",
    element: <FinancialReport />
  },

  {
    path: "home/notifications",
    element: <Notifications />
  },
  {
    path: "adminhome/deactivateaccount",
    element: <DeactivateAccount />
  },

  
  
  {
    path: "Home/FilterSearch",
    element: <FilterSearch />
  },
  
    ]
  },
 
  
  
]);

///////////////////////////Login handler////////////////////////////////////////
const [failedAttempts, setFailedAttempts] = useState(0);
  const [currentForm, setCurrentForm] = useState('login');
  const [passwordHistory, setPasswordHistory] = useState([]);

  function handleLogin(event) {
    event.preventDefault();
    const password = event.target.password.value;
    if (password === "correctPassword") {
      // Login successful
    } else {
      // Login failed
      setFailedAttempts(failedAttempts + 1);
      if (failedAttempts === 2) {
        alert("Your account has been suspended.");
        event.target.password.disabled = true;
      }
    }
  }

  //////////////////Password Reset///////////////////////////////////////
  function handleResetPassword(event) {
    event.preventDefault();
    const newPassword = event.target.newPassword.value;
    if (passwordHistory.includes(newPassword)) {
      alert("You cannot use an old password.");
    } else {
      setPasswordHistory([...passwordHistory, newPassword]);
      alert("Password changed successfully.");
    }
  }

  /////////////////////////Routing///////////////////////////////////
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
  return (
      
      <div className="App">
       <RouterProvider router={router} />
      </div>

  );
}
const AppLayout= () => {

  
  return (
    <>
   
      <div className="App">
      <Navbar />
      <Outlet />
      </div>
      
    </>
  )
}

export default App;
