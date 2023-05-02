import { useSearchParams, } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {db} from './firestore';
import {doc, getDoc, updateDoc} from "firebase/firestore"
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Table } from "react-bootstrap";
import { AiFillFileText } from 'react-icons/ai';
import {AiOutlineSend} from 'react-icons/ai'
import { Alert } from "./Alert"
import { variants } from "./variants"
import { collection, query, where, getDocs } from "firebase/firestore";




export const JournalEntry = ()=>{

    const [searchparams] = useSearchParams();
    

    let journalID = searchparams.get("id")
    let path = searchparams.get("path")
    console.log("The journal id is  ", journalID)
   

    const [user, setUser] = useState('')
    const [postref, setpostRef] = useState('')
    const [account, setAccount] = useState('')
    const [creditaccounts, setcreditAccounts] = useState([])
    const [debitaccounts, setdebitAccounts] = useState([])
    const [credits, setCredits] = useState([])
    const [debits, setDebits] = useState([])
    const [description, setDescription] = useState("")
    const [jeNum, setjeNum] = useState(0);
    const [date, setDate] = useState("");
    const [files, setFiles] = useState("");
    const [alert, setAlert] = useState(variants.at(0))
    const [showAlert, setShowAlert] = useState(false)
    const [newDateTime, setNewDateTime] = useState(Date)
    const [newBalance, setNewBalance] = useState(0);

      ////////////Print Debits//////////////
      const printDebits = (array) => {
    
   
        const listItems = array.map((d) => <li  key={d.debit}>${numberWithCommas(d.debit)}</li>);
       
        return listItems
       }
            ////////////Print Credits//////////////
            const printCredits = (array) => {
        
       
                const listItems = array.map((d) => <li  key={d.credit}>${numberWithCommas(d.credit)}</li>);
               
                return listItems
               }
                ////////////Print Account//////////////
       const printAccount = (array) => {
        
       
        const listItems = array.map((d) => <li  key={d}>{d}</li>);
       
        return listItems
       }

    useEffect(() => {

        let id = journalID
        const getJournalEntry =  async (id, path) => {
            const journalDoc = doc(db, path, id);
            const docSnap = await getDoc(journalDoc);
            const data = docSnap.data();
            const debAccounts = [];
            for(let i =0; i < data.debits.length; i++)
            {
                debAccounts.push(data.debits[i].account)
            }
            const credAccounts = [];
            for(let i =0; i < data.debits.length; i++)
            {
                credAccounts.push(data.credits[i].account)
            }
            console.log("the debit accounts are:", debitaccounts)
            setDescription(data.description)
            setUser(data.user);
            setpostRef(data.pr)
            setdebitAccounts(debAccounts)
            setcreditAccounts(credAccounts)
            setDebits(data.debits);
            setCredits(data.credits);
            setjeNum(data.jeNumber)
            setDate(data.dateTime)
            setFiles(data.files)
            
            console.log(data)

        }

        getJournalEntry(id, path);
        
    }, []); 
    
  
/////////////open attached document in a new tab///////////////////////
    const openInNewTab = (url) => {
        console.log(url);
        window.open(url);
      };
      const comment= useRef()
      const [showComment, setshowComment] = useState(false)
  
      const [approval, setApproval] = useState("");
  ////////////////////Approve journal entry///////////////////////
      const approve = async (id, value) => {
          {console.log("the value is: ", value)}
          const journaldoc = doc(db, "journalEntries", id)
          if(value === "approved")
          {
            setApproval(value)
            setShowAlert(true)
              setAlert(variants.at(6))
              const newFields = {approved: value, dateTime: newDateTime}
              await updateDoc(journaldoc, newFields)

              debitaccounts.forEach((doc)=>{
                updateBalanceDebit(doc);
              })
              creditaccounts.forEach((doc)=>{
                updateBalanceCredit(doc);
              })
          }
         
          else
          {
              setApproval(value)
              setAlert(variants.at(11))
              setShowAlert(true)
              setshowComment(true)
          }
      }

//////////////////////Reject journal entry/////////////////////////
      const submitRej = async (id, approval) => {
          
          if(comment.current.value==="")
          {
              setAlert(variants.at(11))
          }
          else{
              console.log("the comment is: ", comment.current.value)
          const journaldoc = doc(db, "journalEntries", id)
          const newFields = {approved: approval, dateTime: newDateTime, comment:comment.current.value}
          await updateDoc(journaldoc, newFields)
          setAlert(variants.at(7))
          }
  
      }
////////////////////Get accounts to update balance///////////////////////

    const  accountsRef = collection(db, "accounts");

 
     const  updateBalanceDebit = async (account) => {

            let debtotal = 0;
            debits.forEach((doc)=> {
                debtotal+= parseFloat(doc);
            })
    
            const q = query(accountsRef, where("name", "==", account))
            const querySnapshot = await getDocs(q);
            const accountID =""
    
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
                const data = doc.data();
                accountID = data.id;
            });
            const accountDoc = getDoc(db, "accounts", accountID)
            const newFields = {balance: accountDoc.balance+parseFloat(debtotal)}
            await updateDoc(accountDoc, newFields)

        }
        const  updateBalanceCredit = async (account) => {

            let credtotal = 0;
            credits.forEach((doc)=> {
                credtotal+= parseFloat(doc);
            })
    
            const q = query(accountsRef, where("name", "==", account))
            const querySnapshot = await getDocs(q);
            const accountID =""
    
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
                const data = doc.data();
                accountID = data.id;
            });
            const accountDoc = getDoc(db, "accounts", accountID)
            const newFields = {balance: accountDoc.balance-parseFloat(credtotal)}
            await updateDoc(accountDoc, newFields)

        }
          //function for displaying cash amounts with commas where appropriate. Math.round...tofixed(2) makes it display two decimal points
     function numberWithCommas(x) {

        return ((Math.round(x * 100) / 100).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    

return(
    <div>
                            <>
                    
                    <h1>Journal Entry</h1>
                    {showAlert === true &&
           
                        <Alert variant={alert} />
                        }
                    <Table responsive striped bordered >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>debit accounts</th>
                                <th>Debits</th>
                                <th>credit accounts</th>
                                <th>Credits</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{jeNum}</td>
                                <td>{printAccount(debitaccounts)}</td>
                                <td>{printDebits(debits)}</td>
                                <td>{printAccount(creditaccounts)}</td>
                                <td>{printCredits(credits)}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table responsive striped bordered >
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Created By</th>
                                <th>Created</th>
                                <th>Post Reference</th>
                                <th>Attachments</th>
                                <th>Approve/Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>{description}</td>
                            <td>{user}</td>
                            <td>{date}</td>
                            <td>
                            {postref}
                        </td>
                            <td>{files.length > 0 &&
                                    <button role="link" className="custom-button-je" onClick={() => openInNewTab(files)}><AiFillFileText size={25}/></button>
                                    }
                            </td>
                            <td> <select value={approval} onChange={(e) => approve(jeNum, e.target.value)}>
                                <option value="default">approve/reject</option>
                                <option value="approved">approve</option>
                                <option value="rejected">reject</option>
                            </select>
                        {showComment && 
                                
                                <>
                                <input className="input-large" placeholder="enter reason for rejection..." ref={comment} />
                                <button className='custom-button2'onClick={()=> submitRej(jeNum, approval)}><AiOutlineSend size={20}/></button>
                                </>
                                }
                     </td>
                            </tr>
                        </tbody>
                    </Table>
                     </>
        
        
    </div>
)


}