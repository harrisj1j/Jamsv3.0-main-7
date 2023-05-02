import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import React, {useState} from "react";
import {Forgotpass} from './Forgotpass';
import {Link} from "react-router-dom"
import menuLogo from './img/JAMS_1563X1563.png'
import { useNavigate } from "react-router-dom";
import { usersCollectionRef } from "./firebase";

export const Login = (props) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    {/*start app on login screen */}
 
  
    {/* event handler for form entry*/}


        const logIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
            navigate("/home");

        }).catch((error) => {
            console.log(error);
        })
        
    }

   //Login that chooses the splash page you see based on your role

   /*
 const logIn = (e) => {
  e.preventDefault();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const userId = userCredential.user.uid;
      
      usersCollectionRef.child(userId).once("value", (snapshot) => {
        const userData = snapshot.val();
        const userRole = userData.role;
        console.log(`User ${userId} has role ${userRole}`);
        if (userRole === "admin") {
          navigate("/adminhome");
        } else {
          navigate("/accountanthome");
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
 */


    //login form
    return(
        
        <><div className = "big-logo">
            <img src={menuLogo} alt="logo"/>

        </div>
        <div className="auth-form-container">
            <form className="login-form" onSubmit={logIn}>
                <h2>Login</h2>
                <label htmlFor="email">Username</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="username (your email)" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="******" id="password" name="password" />
                <button className="custom-button" type="submit" >Log In</button>    
            </form>
            {/* switch to password form*/}
            <Link to="/forgotpass">
                <button className="link-btn">Forgot password</button>
            </Link>
            <Link to="/register">
                <button className="link-btn">Register New User</button>
            </Link>


        </div></>
        
    );
}

