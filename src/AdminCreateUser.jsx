import { useState, useEffect } from "react";
import {db} from './firestore';
import { collection, getDocs, addDoc} from "firebase/firestore"
import { useNavigate } from "react-router-dom";
import { Register } from "./Register"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, app } from "./firebase";
import menuLogo from './img/JAMS_1563X1563.png'
import MustContainElement from "./MustContainElement";
import { Link } from "react-router-dom";
import bcrypt from 'bcryptjs'




export const AdminCreateUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [role, setRole] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    const [username, setUsername] = useState('');
   

    //password validation 
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

      const hashedPassword = bcrypt.hashSync(password, 10);

     const genUsrnm = (firstName, lastName, birthdate) => {
        
        let firstInitial = firstName.charAt(0);
        let last = lastName
        let dob = birthdate.substr(6, 9);
        let username = firstInitial.concat(last, dob);


        console.log(username)
        
        return (username)     

    }
    

    
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
                password : hashedPassword,

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
                    <h2>Register a New User</h2>
                    <label htmlFor="firstname">First Name</label>
                    <input value={firstname} onChange={(e) => setFirstname(e.target.value)} name="firstname" id="firstname" placeholder="Enter the user's first name..." />

                    <label htmlFor="lastname">Last Name</label>
                    <input value={lastname} onChange={(e) => setLastname(e.target.value)} name="lastname" id="lastname" placeholder="Enter the user's  last name..." />

                    <label  htmlFor="role"> Role</label>
                    
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value = 'default'></option>    
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="accountant">Accountant</option>
                    </select>

                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter the user's email address" id="email" name="email" />

                    <label htmlFor="address">Address</label>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} type="address" placeholder="Enter the user's  address" id="address" name="address" />

                    <label htmlFor="dob">Date of Birth</label>
                    <input value={dob} onChange={(e) => setDob(e.target.value)} type="dob" placeholder="mm/dd/yy" id="dob" name="dob" />
                    
                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*******" id="password" name="password" onKeyUp={validatePassword} />
                    <div className="must-container cfb">

{MustContainData.map(data => <MustContainElement data={data} />)}
</div>
                    <button type="submit" id = "submitReg" >Register New User</button>
                    

                </form>
               

                
            </div></>

    );




}
 