import { useState, useEffect } from "react";
import {db} from './firestore';
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { IoIosCreate } from 'react-icons/io';
import {Link, createSearchParams, useNagivate} from "react-router-dom"
import { async } from "@firebase/util";
import { ImWarning } from 'react-icons/im';
import Table from 'react-bootstrap/Table';





export const ViewUsers = () =>{


    const [users, setusers] = useState([]);
    const usersCollectionRef = collection(db,  "users");
    const [editbox, seteditbox] = useState(false);
    const [newFName, setNewFName] = useState("")
    const [newLName, setNewLName] = useState(0)
    const [newRole, setNewRole] = useState("")

    const [newPassword, setNewPassword] = useState("")
    const [newUsername, setNewUsername] = useState("")
    const [newBDay, setNewBDay] = useState(0)
 
    


    const deactivateUser = async (id) => {
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);
        alert("user deactivated. Refresh to view changes");


    }

    //Functions for editing data fields
    const editFName = async (id, firstName, newFName) => {
        const userDoc = doc(db, "users", id)
        const newFields = {firstName: newFName}
        await updateDoc( userDoc, newFields)
        alert("user updated. Refresh to view changes");
    }
    const editLName = async (id, lastName, newLName) => {
        const userDoc = doc(db, "users", id)
        const newFields = {lastName: newLName}
        await updateDoc( userDoc, newFields)
        alert("user updated. Refresh to view changes");
    }
    const editBDay = async (id, birthday, newBDay) => {
        const userDoc = doc(db, "users", id)
        const newFields = {birthday: newBDay}
        await updateDoc( userDoc, newFields)
        alert("user updated. Refresh to view changes");
    }
    const editPassword = async (id, password, newPassword) => {
        const userDoc = doc(db, "users", id)
        const newFields = {password: newPassword}
        await updateDoc( userDoc, newFields)
        alert("user updated. Refresh to view changes");
    }
    const editRole = async (id, role, newRole) => {
        const userDoc = doc(db, "users", id)
        const newFields = {role: newRole}
        await updateDoc( userDoc, newFields)
        alert("user updated. Refresh to view changes");
    }
    
    useEffect(() => {

        const getusers = async () => {
            const data = await getDocs(usersCollectionRef);
            setusers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
        };

        getusers();
    }, []);


    return(
        //Display user info
        <div className="view-users-container"> 

            <h1>Users</h1>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Edit</th>
                    <th>Deactivate</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user) => (
                    <tr key={user.id}>
                    <td>{user.username} </td>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.role}</td>
                   
                    <td>
                        <button className="custom-button-va" ><IoIosCreate size={25}/></button>
                    </td>
                    <td>
                        <button className="custom-button-va" onClick={()=>{deactivateUser(user.id)}}><ImWarning size={25}/></button>
                    </td>
                    </tr>
                    ))}
                </tbody>
            </Table>
            
        </div>

    )
}
