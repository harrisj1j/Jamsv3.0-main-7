import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {db} from './firestore';
import {doc, getDoc, getDocs, updateDoc} from "firebase/firestore"
import Table from 'react-bootstrap/Table';
import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {ChildrenList} from "./ChildrenList"
import {CreateJE} from "./CreateJE"



export const Ledger = () => {

   
    const [searchparams] = useSearchParams();

    let accountID = searchparams.get("id")
    const query = collection(db, "accounts")
    const [docs, loading] = useCollectionData (query);
    const query2 = collection(db,  "journalEntries")
    const [docs2, ] = useCollectionData (query2);

    const [name, setName] = useState("")
    const [number, setNumber] = useState(0)
    const [category, setCategory] = useState("")
    const [credit, setCredit] = useState(0)
    const [debit, setDebit] = useState(0)
    const [balance, setBalance] = useState(0)
    const [NetBalance, setNetBalance] = useState(0)
    const [description, setDescription] = useState("")
    const [jeNum, setjeNum] = useState(0);
    const [initialBalance, setInitialBalance] = useState(0)

    useEffect(() => {

        let id = accountID
        const getAccount =  async (id) => {
             const accountDoc = doc(db, "accounts", id);
            const docSnap = await getDoc(accountDoc);
            const data = docSnap.data();
            const name = data.name;
            const number = data.number;
            const category = data.category;
            const credit = data.credit;
            const debit = data.debit;
            const balance = data.balance;
            const description = data.description;
            const initialBalance = data.initialBalance
            setInitialBalance(initialBalance)
            setName(name);
            setNumber(number);
            setCategory(category);
            setCredit(credit);
            setDebit(debit);
            setBalance(balance)
            setDescription(description);

            let debitSum = 0;
            let creditSum = 0;
           
            let numSum = 0;
    
            const querySnapshot = await getDocs(collection(db, "journalEntries"));
            
                    querySnapshot.forEach((doc) => {
                    //loop through the journal entries
                    
                    //sum up the debits and the credits from each journal entry
                    var data = doc.data();
                   if(data.debits[0].account === name)
                   { console.log(data.debits[0].debit)
                    debitSum += parseFloat(data.debits[0].debit)
                    numSum++;
                    }
                    if(data.credits[0].account === name)
                   { console.log(data.credits[0].credit)
                    creditSum += parseFloat(data.credits[0].credit)
                    numSum++;
                    }

                    
                    });
                
            // the sum of the credits is subtracted from the sum of the credits and set as the new balance
            setDebit(debitSum);
            setCredit(creditSum);
            setNetBalance(initialBalance+parseFloat(debitSum)-parseFloat(creditSum));
            setjeNum(numSum)
            const newBalance = initialBalance+parseFloat(debitSum)-parseFloat(creditSum);
            const newFields = {balance: newBalance}
            await updateDoc( accountDoc, newFields)
           
        }

        getAccount(id);
        
    }, []); 

  

    

   
     //function for displaying cash amounts with commas where appropriate. Math.round...tofixed(2) makes it display two decimal points
     function numberWithCommas(x) {

        return ((Math.round(x * 100) / 100).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

  
 
    return (
        <>
        
        <div className ="ledger-container">
        <h1 className="page-title">Account Ledger</h1>
       
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Initial Balance</th>
                <th>Current Balance</th>
                <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{number}</td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>${numberWithCommas(initialBalance)}</td>
                    <td>${numberWithCommas(NetBalance)}</td>
                    <td>{description}</td>
                </tr>
            </tbody>
        </Table>
        <h3>Transactions</h3>
        {loading && "Loading..."}
        <Table  responsive striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Posted by</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Docs</th>
                    <th>Post Reference</th>
                </tr>
            </thead>
            <tbody>
           
            <ChildrenList path={`accounts/`} accountName={name} />
                      
            </tbody>
        </Table>
        
        </div>
        </>
    )
    
  
}