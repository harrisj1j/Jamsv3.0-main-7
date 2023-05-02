import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { collection, getDocs, doc} from "firebase/firestore"
import {db} from './firestore';
import { query, where } from "firebase/firestore";
import { usersCollectionRef } from './firebase';






//check whether user is signed in or not and which user it is

export const AuthDetails = () => {
    const [authUser, setAuthuser] = useState(null);
    const navigate = useNavigate();
    const [firstname, setFName] = useState("")
    const [lastname, setLName] = useState("")
    const [dob, setDob] = useState("")
    const usersCollectionRef = collection(db, 'users');
    const [userEmail, setuserEmail] = useState("")
    const [userUID, setuserUID] = useState("")
    const [username, setusername] = useState("")

   

    useEffect(() => {
        const listen = onAuthStateChanged(auth, async (user) => {
            if(user) {
                setAuthuser(user) //if user us logged in, set authuser to the logged in user
                setuserUID(user.uid)
                setuserEmail(user.email)
                
                const q = query(collection(db, "users"), where("userUID", "==", user.uid));
               

                const querySnapshot = await getDocs(q);
                if(querySnapshot.empty){
                    console.log("no document")
                }
                querySnapshot.forEach((doc)=>{
                    console.log(doc.id, " => ", doc.data());
                    const data = doc.data();
                    setFName(data.firstName)
                    setusername(data.username)
                })
                


            }else{
                setAuthuser(null);//otherwise authuser is null
                
            }
            
            
        });

        return () => {
            listen();
        }

    }, [authUser, userUID]);

  

        const userSignOut = () => {
            signOut(auth).then(() => {
                console.log('sign out successful')
                navigate("/");
            }).catch(error => console.log(error));
        }
    return (
        <div>
            { authUser ? <> 
            
            <p>{`Signed in as ${username}`}</p> <a onClick={userSignOut} ><h5>Sign Out</h5><LogoutIcon /></a></>: <p>Signed Out</p>} {/**display authUser (email) if they are logged in or if they are signed out */}
        </div> 
    )
}

