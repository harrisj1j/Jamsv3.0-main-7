import { getAuth, onAuthStateChanged } from "firebase/auth";

import React, { useEffect, useState } from 'react';
import { query, where } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { usersCollectionRef } from './firebase';
import { AdminHome } from './AdminHome';
import { ManagerHome } from './ManagerHome'
import {AccountantHome} from './AccountantHome'
import { useNavigate } from "react-router-dom";
import menuLogo from './img/JAMS_1563X1563.png'
import Table from 'react-bootstrap/Table';




export const Home= () => {

    const [authUser, setAuthuser] = useState(null);
    const [role, setRole] = useState("")
    const [userUID, setuserUID] = useState("")
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;
    

    useEffect(() => {
        const listen = onAuthStateChanged(auth, async (user) => {
            if(user) {
                setAuthuser(user) //if user us logged in, set authuser to the logged in user
                setuserUID(user.uid)
                
                
                const q = query(usersCollectionRef, where("userUID", "==", user.uid));
               

                const querySnapshot = await getDocs(q);
                if(querySnapshot.empty){
                    console.log("no document")
                }
                querySnapshot.forEach((doc)=>{
                    console.log(doc.id, " => ", doc.data());
                    const data = doc.data();
                    setRole(data.role)
                    console.log("the user's role is: ", role)
                })
                


            }else{
                setAuthuser(null);//otherwise authuser is null
                
            }
            
            
        });

        return () => {
            listen();
        }

    }, [authUser, userUID, role]);

    return (
        <>
        <div className = "big-logo">
            <img src={menuLogo} alt="logo"/>

        </div>
       <div className="home-container">
       {role === "admin" &&
            <AdminHome />
        }
         {role === "manager" &&
            <ManagerHome />
        }
         {role === "accountant" &&
            <AccountantHome />
        }
       </div>
       
        </>
        
         
        
        );
}

