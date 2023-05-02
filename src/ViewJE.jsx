import React, {useState, useRef} from 'react'
import { doc, updateDoc, getDoc } from "firebase/firestore";
import {db} from './firestore';
import Table from 'react-bootstrap/Table';
import menuLogo from './img/JAMS_1563X1563.png'
import { variants } from "./variants"
import { collection } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';

export const ViewJE = () => {

    const journalEntriesref = collection(db,  "journalEntries");
    const [docs] = useCollectionData (journalEntriesref);

 
       //function for displaying cash amounts with commas where appropriate. Math.round...tofixed(2) makes it display two decimal points
       function numberWithCommas(x) {

        return ((Math.round(x * 100) / 100).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return(
        <>
        <div className='approval-container'>
            <h2>Journal Entries</h2>
         
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
                    <th>Comment</th>

                </tr>
            </thead>
            <tbody>
            {docs?.map((doc)=>(
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
                    <td>{doc.pr}</td>
                    <td>{doc.approved}</td>
                    <td>{doc.comment}</td>
                    
                  
                </tr>
            ))}
            </tbody>
        </Table>
       
        </div>
        </>
    )

}