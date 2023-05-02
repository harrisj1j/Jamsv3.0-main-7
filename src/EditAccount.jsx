import React, {useState, useEffect} from 'react'
import { doc, updateDoc, getDoc } from "firebase/firestore";
import {db} from './firestore';
import { async } from "@firebase/util";
import { useSearchParams, Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import menuLogo from './img/JAMS_1563X1563.png'
import { BiUpload } from 'react-icons/bi';






export function EditAccount(account, seteditbox){


    const [searchparams] = useSearchParams();
    console.log(searchparams.get("id"))

    let accountID = searchparams.get("id")
    const [name, setName] = useState("")
    const [number, setNumber] = useState(0)
    const [category, setCategory] = useState("")
    const [credit, setCredit] = useState(0)
    const [debit, setDebit] = useState(0)
    const [initialBalance, setIB] = useState("")
    const [balance, setBalance] = useState(0)
    const [description, setDescription] = useState("")

    useEffect(() => {

        let id = accountID
        const getAccount =  async (id) => {
            const accountDoc = doc(db, "accounts", id);
            
            const docSnap = await getDoc(accountDoc);
            const data = docSnap.data();
            const name = data.name;
            const number = parseInt(data.number);
            const category = data.category;
            const credit = parseFloat(data.credit);
            const debit = parseFloat(data.debit);
            const initialBalance = parseFloat(data.initialBalance);
            const description = data.description;
            const balance = parseFloat(data.balance);
            setName(name);
            setNumber(number);
            setCategory(category);
            setCredit(credit);
            setDebit(debit);
            setIB(initialBalance);
            setBalance(balance);
            setDescription(description);
        }

        getAccount(id);
    }, []);


    const [newDateTime, setNewDateTime] = useState(Date)
    const [newName, setNewName] = useState(name)
    const [newNumber, setNewNumber] = useState(number)
    const [newCategory, setNewCategory] = useState(category)
    const [newCredit, setNewCredit] = useState(credit)
    const [newDebit, setNewDebit] = useState(debit)
    const [newIB, setNewIB] = useState(initialBalance)
    const [newBalance, setNewBalance] = useState(balance)
    const [newDescription, setNewDescription] = useState(description)

    const editName = async (id, newName) => {
        const accountDoc = doc(db, "accounts", id)
        const newFields = {name: newName, dateTime: newDateTime}
        
        await updateDoc( accountDoc, newFields)
        alert("Name updated to "+newName)
        
    }
    const editNumber = async (id, newNumber) => {
        const accountDoc = doc(db, "accounts", id)
        const newFields = {number: newNumber, dateTime: newDateTime}
        await updateDoc( accountDoc, newFields)
        alert("Number updated to "+newNumber)
        
    }
    const editCategory = async (id, newCategory) => {
        const accountDoc = doc(db, "accounts", id)
        const newFields = {category: newCategory, dateTime: newDateTime}
        await updateDoc( accountDoc, newFields)
        alert("Category updated to "+newCategory)
        
    }
    const editDebit = async (id, newDebit) => {
        const accountDoc = doc(db, "accounts", id)
        const newFields = {debit: newDebit, dateTime: newDateTime}
        await updateDoc( accountDoc, newFields)
        alert("Debit updated to "+newDebit)
        
    }
    const editCredit = async (id, newCredit) => {
        const accountDoc = doc(db, "accounts", id)
        const newFields = {credit: newCredit, dateTime: newDateTime}
        await updateDoc( accountDoc, newFields)
        alert("Credit updated to "+newCredit)
        
    }
    const editIB = async (id, newIB) => {
        const accountDoc = doc(db, "accounts", id)
        const newFields = {initialBalance: newIB, dateTime: newDateTime}
        await updateDoc( accountDoc, newFields)
        alert("Initial balance updated to "+newIB)
    }
    const editBalance = async (id, calcBalance) => {
        const accountDoc = doc(db, "accounts", id)
        setNewBalance(calcBalance);
        const newFields = {balance: calcBalance}
        await updateDoc( accountDoc, newFields)
        
    }
    const editDescription = async (id, newDescription) => {
        const accountDoc = doc(db, "accounts", id)
        const newFields = {description: newDescription, dateTime: newDateTime}
        await updateDoc( accountDoc, newFields)
        alert("Description updated to "+newDescription)
        
    }
    function numberWithCommas(x) {

        let num = x;
        return ((Math.round(x * 100) / 100).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  //calculate the new balance on the account
    const calcBalance = (newIB, newCredit, newDebit) =>
        {
            let calc = parseFloat(newIB)-parseFloat(newCredit)+parseFloat(newDebit);
            return (calc)
        }

    return (
        
        <div className="edit-form-container">
            <h1>Edit Account</h1>
            
            <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                            <th>Number</th>
                            <th>Update</th>
                            <th>Name</th>
                            <th>Update</th>
                            <th>Category</th>
                            <th>Update</th>
                           
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr>
                            <td>{number} <br></br><input type="number" placeholder="edit number" onChange={(event) => {setNewNumber(event.target.value)}} /></td>
                            <td><button className="custom-button" onClick={()=> { 
                                            editNumber(accountID, newNumber)
                                        }}><BiUpload size={25}/></button></td>
                            <td>{name} <br></br><input type ="text" placeholder="edit name" onChange={(event) => {setNewName(event.target.value)}} /></td>
                            <td><button className="custom-button" onClick={()=> { 
                                            editName(accountID, newName)
                                        }}><BiUpload size={25}/></button></td>
                            <td>{category}<br/><select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                                      
                                    <option value="asset">asset</option>
                                    <option value="liability">liability</option>
                                    <option value="expense">expense</option>
                                    <option value="equity">equity</option>
                                </select>
                            </td>
                            <td><button className="custom-button" onClick={()=> { 
                                            editCategory(accountID, newCategory)
                                        }}><BiUpload size={25}/></button></td>
                           
                            </tr>
                        
                        </tbody>
                    </Table>
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
    
                            <th>Description</th>
                            <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr>
                            <td>{description}<br></br><input className="input-large" type="text" placeholder="edit description" onChange={(event) => {setNewDescription(event.target.value)}}/></td>
                            <td><button className="custom-button" onClick={()=> { 
                                            editDescription(accountID, newDescription)
                                        }}><BiUpload size={25}/></button></td>
                            </tr>
                        
                        </tbody>
                    </Table>
                   
                    
           
            
            
    
   
        </div>

    )
}

