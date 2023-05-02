import React, {useRef, useState, useEffect}from 'react'
import { doc, setDoc, updateDoc, getCountFromServer, collection} from "@firebase/firestore";
import {db} from './firestore';
import {storage,} from "./firebase.js"
import { Container } from '@mui/material';
import { TextField } from '@mui/material';
import { AiOutlinePlusSquare} from "react-icons/ai";
import { AiOutlineMinusSquare} from "react-icons/ai";
import { BiUpload } from 'react-icons/bi';
import { IoIosCreate } from 'react-icons/io';
import { v4 as uuidv4 } from 'uuid';
import Popup from 'reactjs-popup';
import { onAuthStateChanged} from 'firebase/auth';
import { usersCollectionRef } from './firebase.js';
import { query, where } from "firebase/firestore";
import { getDocs} from "firebase/firestore"
import { auth } from './firebase.js';
import { Alert } from "./Alert"
import { variants } from "./variants"


import 'reactjs-popup/dist/index.css';


import {
    ref,
    uploadBytesResumable,
    getDownloadURL, 
}from "firebase/storage"
import { relative } from 'path-browserify';


export function CreateJE() {

const ref2 = useRef();
const [authUser, setAuthuser] = useState(null);
const accountsCollectionRef = collection(db,  "accounts");
const usersCollectionRef = collection(db, 'users');
const [userUID, setuserUID] = useState("")
const description = useRef();
const [file, setFile]= useState("")
const [percent, setPercent] = useState(0);
const [attachedFile, setAttachedFile] = useState("")
const [refid, setrefid] = useState('')
const [newDateTime, setNewDateTime] = useState(Date)
const [approved, setApproved] = useState("pending");
const [postReference, setPostReference] = useState("")
const [dateFilter, setdateFilter] = useState('');
const [amountFilter, setAmountFilter] = useState(0)
const [username, setUsername] = useState("")
const [role, setRole] = useState("")
const [alert, setAlert] = useState(variants.at(0))
const [showAlert, setShowAlert] = useState(false)
const [accountNames, setAccountNames] = useState([])




/////////////////generate journal entry number and post reference////////////////////////
useEffect(() => {

    const getCount =  async () => {
        
        
        const coll = collection(db, "journalEntries");
        const snapshot = await getCountFromServer(coll);
        console.log(snapshot.data());
        
        console.log(snapshot.data().count);
        setrefid(snapshot.data().count.toString());
        console.log("the new ref id is ", refid)
        setPostReference(uuidv4().toString());
        console.log("The PR is ", postReference)
        
        
       
    }
    getCount();
   

}, [refid]); 
  
    

  const close = () => ref2.current.close();

  /////////////////////////////get the user that posts the journal entry//////////////////////
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
                setUsername(data.username)
                
            })
            
        }else{
            setAuthuser(null);//otherwise authuser is null
            
        }
        
        
    });

    return () => {
        listen();
    }

}, [authUser, userUID, role]);


//////////// debits form ///////////////
const [debitInputs, setDebitInput] = useState([
    { id: uuidv4(), debit: 0.00, account: ""},
   
]);

const handleChangeDebit = (id, event) => {
   const newDebitInputs = debitInputs.map(i => {
    if(id === i.id) {
        i[event.target.name] = event.target.value
        
    }
    
    return i;
   })
   
   setDebitInput(newDebitInputs)
}



const handleAddDeb = (e) => {
    e.preventDefault()
    setDebitInput([...debitInputs, {id: uuidv4(), debit: 0, account: ""}])
}
const handleRemDeb = (e, id) => {
    e.preventDefault();
    const values = [...debitInputs];
    values.splice(values.findIndex(value => value.id === id), 1);    setDebitInput(values);

}
//////////// credits form ///////////////
const [creditInputs, setCreditInput] = useState([
    { id: uuidv4(), credit: 0.00, account: ""},
   
]);

const handleChangeCredit = (id, event) => {
   const newcreditInputs = creditInputs.map(i => {
    if(id === i.id) {
        i[event.target.name] = event.target.value
        
    }
    
    return i;
   })
   setCreditInput(newcreditInputs)
   
}



const handleAddCred = (e) => {
    e.preventDefault()
    setCreditInput([...creditInputs, {id: uuidv4(), credit: 0, account: ""}])
}
const handleRemCred= (e, id) => {
    e.preventDefault();
    const values = [...creditInputs];
    values.splice(values.findIndex(value => value.id === id), 1);    setCreditInput(values);

}
////////////check if debits and credits are equal//////////////////
const checkEqual = (debits, credits) => {

        let equals = false;
        let ctotal = 0;
        let dtotal = 0;
        debits.map((d) => {dtotal +=d.debit});
        credits.map((d) => {ctotal += d.credit})
       if(dtotal === ctotal)
       {
        equals = true
        setShowAlert(false)
       }

        return equals
}

//////////////////document upload functionality////////////////////

function handleChange(event){
    setFile(event.target.files[0]);
    console.log("the file is: ", file)
}
function handleUpload(){
    
    const storageRef = ref(storage, `/files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            //update progress
            setPercent(percent);
        },
        (err)=>console.log(err),
        ()=> {
            //download url
            getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
                console.log(url);
                setAttachedFile(url);
                console.log("attached file url is ", attachedFile)
            })
        }
    )
}


//when add button is clicked, new journal entry is created and the account balance is updated
    async function handleSubmit(e) {
        e.preventDefault();


        if(checkEqual(debitInputs, creditInputs))
        {

            if(debitInputs.at(0).debit > 0 && creditInputs.at(0).credit > 0){

                let notification = "A new journal entry was submitted for approval by "+username
                setShowAlert(false)
                const docRef=doc(db, "journalEntries", refid);
                await setDoc(docRef, {jeNumber: refid,  debits: debitInputs, credits: creditInputs, description: description.current.value, files: attachedFile, dateTime: newDateTime, approved: approved, pr: postReference, user: username, role: role});
                const mnotifRef=doc(db, "mnotifications", refid);
                await setDoc(mnotifRef, {notification: notification, dateTime: newDateTime, postReference: postReference})
                if(file)
                    {handleUpload();}
                setAlert(variants.at(5))
                setShowAlert(true)
                e.target.reset();
            }
            else{
                setAlert(variants.at(3))
              setShowAlert(true)
            }
        }
        else{
            setAlert(variants.at(4))
            setShowAlert(true)
        }
       
       
    }

    return (
        <>
        <form id="je-form" onSubmit={handleSubmit}>
        <div className='je-container'>
        <h3>Add New Journal Entry</h3>
            <div className="je-form-input">
                <div className="je-box-1">

                <label htmlFor="debits">Debits</label>
                    <div className="debit-container">

                        <Container>
                        
                                { debitInputs.map((debitInput)=>(
                                    <div className="debit-form" key={debitInput.id}>
                                         <TextField 
                                            name="debit"
                                            label="debit"
                                            variant="filled"

                                            onChange={event => handleChangeDebit(debitInput.id, event)}
                                         />
                                      
                                         <select className="je-select"  name="account"  onChange={event => handleChangeDebit(debitInput.id, event)}>
                                            <option value="default">account...</option>
                                            <option value="cash">cash</option>
                                            <option value="accounts payable">accounts payable</option>
                                            <option value="accounts receivable">accounts receivable</option>
                                            <option value="salaries and benefits">salaries and benefits</option>
                                            <option value="rent and overhead">rent and overhead</option>
                                            <option value="inventory">inventory</option>
                                            <option value="property and equipment">property and equipment</option>
                                            <option value="equity capital">equity capital</option>
                                            <option value="retained earnings">retained earnings</option>
                                            <option value="net earnings">net earnings</option>
                                            <option value="taxes">taxes</option>

                                        </select>
                                        <div className='addrem'>
                                            <button className='custom-button-je' onClick={(e)=> handleAddDeb(e)}><AiOutlinePlusSquare size={20}/></button>
                                            <button className='custom-button-je'disabled={debitInputs.length === 1} onClick={(e)=> handleRemDeb(e, debitInput.id)}><AiOutlineMinusSquare size={20}/></button>
                                        </div>
                                       
                                    </div>
                                ))}
                              
                           
                        </Container>
                        
                    </div>
                    <label htmlFor="credits">Credits</label>
                    <div className="debit-container">

                        <Container>
                                    
                                    
                                { creditInputs.map((creditInput)=>(
                                    <div className="debit-form" key={creditInput.id}>
                                        <TextField 
                                            name="credit"
                                            label="credit"
                                            variant="filled"

                                            onChange={event=> handleChangeCredit(creditInput.id, event)}
                                        />
                                         <select className="je-select" name="account"  onChange={event => handleChangeCredit(creditInput.id, event)}>
                                            <option value="default">account...</option>
                                            <option value="cash">cash</option>
                                            <option value="accounts payable">accounts payable</option>
                                            <option value="accounts receivable">accounts receivable</option>
                                            <option value="salaries and benefits">salaries and benefits</option>
                                            <option value="rent and overhead">rent and overhead</option>
                                            <option value="inventory">inventory</option>
                                            <option value="property and equipment">property and equipment</option>
                                            <option value="equity capital">equity capital</option>
                                            <option value="retained earnings">retained earnings</option>
                                            <option value="net earnings">net earnings</option>
                                            <option value="taxes">taxes</option>

                                        </select>
                                        <div className="addrem">
                                            <button className='custom-button-je' onClick={(e)=> handleAddCred(e)}><AiOutlinePlusSquare  size={20}/></button>
                                            <button className='custom-button-je'disabled={creditInputs.length === 1} onClick={(e)=> handleRemCred(e, creditInput.id)}><AiOutlineMinusSquare size={20}/></button>
                                        </div>
                                       
                                    </div>
                                ))}
                            
                             
                        </Container>

                    </div>
                       
                </div>
             
                <div className='je-box-2'>
                    <label htmlFor="description">Description</label>
                    <input placeholder="enter description..."ref={description}/>

                    <label htmlFor="file">Attach Doc</label>
                    <input  className="custom-button" type="file" accept=".pdf, .png, .jpg,.docx, .csv, .xls" onChange={handleChange}/>
                    <p>{percent} % done</p>
                   
                   
                </div>
              
           </div>
           <Popup ref={ref2} trigger={open => (   <button type="button" className="custom-button" >Post Journal Entry&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<BiUpload size={25}/></button>  )} position='center center'  arrow={false} modal closeOnDocumentClick>
            <h4>Post Journal Entry?</h4>
                <button form="je-form" className="custom-button" type="submit" >Submit</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={()=>close()} className="custom-button">Cancel</button>
            </Popup>

            {showAlert === true &&
           
           <Alert variant={alert} />
          }
           
        </div>
       
            
            
        </form>

            
        </>

    )
}