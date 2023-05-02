import { useState, useEffect } from "react";
import {db} from './firestore';
import { collection, getDocs, deleteDoc, doc, getCountFromServer} from "firebase/firestore"
import { IoIosCreate } from 'react-icons/io';
import {Link, createSearchParams, useNavigate} from "react-router-dom"
import { ImWarning } from 'react-icons/im';
import { AiFillProfile } from 'react-icons/ai';
import { query, where } from "firebase/firestore";

import Table from 'react-bootstrap/Table';

export const Notifications = () => {


    const notificationsCollectionRef = collection(db, "mnotifications")
    const [notifications, setNotifications] = useState([])
    const [notifCount, setNotifCount] = useState(0)

    const removeNotification = async(id) => {
        const notificationDoc = doc(db, "mnotifications", id)
        await deleteDoc(notificationDoc);        
    }

    useEffect(() => {

        const getNotifications = async () => {
            const data = await getDocs(notificationsCollectionRef);
            
            setNotifications(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
            
           
        };

        getNotifications();
    }, []);

 
      
    return(
        <>
        
            <div className="notifications-container">
            <h1>Notifications</h1>
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Message</th>
                        <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody >
                        {notifications && notifications.map((notification) => (
                        <tr key={notification.id}>
                        <td>{notification.dateTime}</td>
                        <td>{notification.notification}</td>
            
                        <td>
                            <button className="custom-button-va" onClick={()=>{removeNotification(notification.id)}}><ImWarning size={25}/></button>
                        </td>
                        
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
       
    )
}