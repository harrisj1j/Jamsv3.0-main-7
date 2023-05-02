import { IoIosCreate } from 'react-icons/io';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { ImEye } from 'react-icons/im';
import { ImWarning } from 'react-icons/im';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BiAddToQueue} from 'react-icons/bi';
import { RxActivityLog } from "react-icons/rx";


export const AdminHome = (props) => {

    return (
        <>
        <div className='dash-container'>
        <div className="dashbox">
        <Link to="addaccount">
                <div className = "card">
                    <h3>Add<br></br> Account</h3>
                    <br></br>
                    <BiAddToQueue size={50}/>
                </div>
            </Link>
            <Link to="viewaccounts">
                <div className = "card">
                    <h3>View<br></br> Accounts</h3>
                    <br></br>
                    <ImEye size={50}/>
                </div>
            </Link>

        </div>
        <div  className="dashbox">
        <Link to="viewusers">
                <div className = "card">
                    <h3>View</h3>
                    
                    <h3>Users</h3>
                    <br></br>
                    <AccountCircleIcon sx={{ fontSize: 50 }}/>
                </div>
            </Link>
            <Link to="adminCreateUser">
                <div className = "card">
                    <h3>Create<br></br> User</h3>
                    <br></br>
                    <AiOutlineUserAdd size={50}/>
                </div>
            </Link>
            <Link to="EventLog">
                <div className = "card">
                    <h3>Event<br></br> Log</h3>
                    <br></br>
                    <RxActivityLog size={50}/>
                </div>
            </Link>
        </div>


            <Link to="FilterSearch">
                <div className = "card">
                    <h3> FilterSearch</h3>
                    <br></br>
                    <ImEye size={50}/>
                </div>
            </Link>
        
        </div>
      
        
        </>
        
        
        );
}

