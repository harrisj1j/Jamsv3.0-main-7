import React, {useState, useRef} from 'react'
import {db} from './firestore';
import { async } from "@firebase/util";
import { useSearchParams, Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import menuLogo from './img/JAMS_1563X1563.png'
import { BsHandThumbsUpFill } from 'react-icons/bs';
import { Alert } from "./Alert"
import { variants } from "./variants"
import { collection } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { createSearchParams, useNavigate} from "react-router-dom"


export const AppRejJE = () => {

    const journalEntriesref = collection(db,  "journalEntries");
    const [docs, loading, error] = useCollectionData (journalEntriesref);
    const [alert, setAlert] = useState(variants.at(0))
    const [showAlert, setShowAlert] = useState(false)
    const navigate = useNavigate();


       ////////////////////////Open journal entry by clicking Post reference////////////////////

       const openJournal = (path, id) => {
        navigate({
            pathname: "journalentry",
            search: createSearchParams({
                path: path,
                id: id
            }).toString()
           
        })
    };
  
       //function for displaying cash amounts with commas where appropriate. Math.round...tofixed(2) makes it display two decimal points
       function numberWithCommas(x) {

        return ((Math.round(x * 100) / 100).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return(
        <>
        <div className='approval-container'>
            <h2>Approve/Reject Journal Entries</h2>
            <h3>Click post reference to approve/reject journal entry</h3>
           
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Posted by</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Post Reference</th>
                    <th>Approval<br/>Status</th>
                </tr>
            </thead>
            <tbody>
            {docs?.map((doc, idx)=>(
                <tr key={Math.random()}>
                    <td>{doc.jeNumber}</td>
                    <td>{doc.user}</td>
                    <td>
                    {doc.debits.map((debitdoc)=>
                        <>
                        <li>${numberWithCommas(debitdoc.debit)}</li>
                        <li>to {debitdoc.account}</li>
                        </>
                )}
                    </td>
                   <td>
                   {doc.credits.map((creditdoc)=>   
                    <>
                        <li>${numberWithCommas(creditdoc.credit)}</li>
                        <li>to {creditdoc.account}</li>
                    </>
                  )}  
                   </td>
                 
                    <td>{doc.description}</td>
                    <td>{doc.dateTime}</td>
                    <td>
                        <button className="link-btn" onClick={()=>openJournal("journalEntries", doc.jeNumber)}>{doc.pr}</button>
                    </td>
                    <td>{doc.approved}</td>
                    
                    
                    
                  
                </tr>
            
               
            ))}
           
            </tbody>
        </Table>
       
        </div>
        </>
    )

}