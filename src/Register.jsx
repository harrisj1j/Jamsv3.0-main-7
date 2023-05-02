import { defaultMaxListeners } from "events";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, {useState} from "react";
import { auth, app } from "./firebase";
import MustContainElement from "./MustContainElement";
import { Link } from "react-router-dom";
import menuLogo from './img/JAMS_1563X1563.png'
import {  } from 'firebase/auth'; 
import { db } from "./firestore";
import { collection, doc, setDoc, getDocs, addDoc } from "firebase/firestore";
import firebase from 'firebase/app';
import 'firebase/firestore';





 {/* Administrator screen for registering user*/}
export const Register = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [role, setRole] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    const [username, setUsername] = useState('');

    ///////generate username///////////////////
    const genUsrnm = (firstName, lastName, birthdate) => {
        
        let firstInitial = firstName.charAt(0);
        let last = lastName
        let dob = birthdate.substr(6, 9);
        let username = firstInitial.concat(last, dob);


        console.log(username)
        
        return (username)     

    }


  


    //password validation bool
    const [containsUL, setContainsUL ] = useState(false)
    const [containsLL, setContainsLL ] = useState(false)
    const [containsN, setContainsN ] = useState(false)
    const [containsSC, setContainsSC ] = useState(false)
    const [contains8C, setContains8C ] = useState(false)

    //Ensure all validations are true
    const [allValid, setAllValid] = useState(false)

    //Label and state boolean value for each validation
    const MustContainData = [
        ["An uppercase letter (a-z)", containsUL],
        ["A lowercase letter (A-Z)", containsLL],
        ["A number (0-9)", containsN],
        ["A special character (!@#$)", containsSC],
        ["At least 8 characters", contains8C]
        
    ]
    const usersCollectionRef = collection(db, 'users');
    let allUsers = getDocs(usersCollectionRef);
    {/* event handler for registration form*/}
    const registerFBUser = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)

          .then((userCredential) => {
            const username = genUsrnm(firstname, lastname, dob)

            addDoc(usersCollectionRef, {
                userUID : userCredential.user.uid,
                firstName: firstname,
                lastName: lastname,
                birthday: dob,
                email: email,
                prevPass: [],
                pwExpired: false,
                role: role,
                activated: false,
                suspended : false,
                suspensionStart: '',
                suspensionEnd: '',
                username: username,
                password : password,

            });
            
            console.log(userCredential);
          })
          .catch((error) => {
            console.log(error);
          });
      };


    const validatePassword = () => {
        // has uppercase letter
        if (password.toLowerCase() !== password) setContainsUL(true)
        else setContainsUL(false)
        // has lowercase letter
        if (password.toUpperCase() !== password) setContainsLL(true)
        else setContainsLL(false)
        // has number
        if (/\d/.test(password)) setContainsN(true)
        else setContainsN(false)
        // has special character
        if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(password)) setContainsSC(true)
        else setContainsSC(false)
        // has 8 characters
        if (password.length >= 8) setContains8C(true)
        else setContains8C(false)
        // all validations passed
        if (containsUL && containsLL && containsN && containsSC && contains8C ) setAllValid(true)
        else setAllValid(false)
    } 
    
    //registration form
    return(
    
        <><div className="big-logo">
            <img src={menuLogo} alt="logo" />
        </div>
        
        <div className="auth-form-container">
                <Link to="/">
                    <button className="link-btn">Login</button>
                </Link>
                <form className="register-form" onSubmit={registerFBUser}>
                    <h2>Register new User</h2>
                    <label htmlFor="firstname">first name</label>
                    <input value={firstname} onChange={(e) => setFirstname(e.target.value)} name="firstname" id="firstname" placeholder="enter first name..." />

                    <label htmlFor="lastname">last name</label>
                    <input value={lastname} onChange={(e) => setLastname(e.target.value)} name="lastname" id="lastname" placeholder="enter last name..." />

                    <label htmlFor="role">role</label>
                    <input value={role} onChange={(e) => setRole(e.target.value)} name="role" id="role" placeholder="user's role..." />

                    <label htmlFor="email">email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@mail.com..." id="email" name="email" />

                    <label htmlFor="address">address</label>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} type="address" placeholder="enter address" id="address" name="address" />

                    <label htmlFor="dob">date of birth</label>
                    <input value={dob} onChange={(e) => setDob(e.target.value)} type="dob" placeholder="mm/dd/yy" id="dob" name="dob" />
                    
                    <label htmlFor="password">password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*******" id="password" name="password" onKeyUp={validatePassword} />
                    <div className="must-container cfb">

                        {MustContainData.map(data => <MustContainElement data={data} />)}
                    </div>
                    <button className="custom-button" type="submit" id = "submitReg" >Register New User</button>
                    

                </form>
               

                
            </div></>

    );
}

export default Register;