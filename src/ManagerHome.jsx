import { IoIosCreate } from 'react-icons/io';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { ImEye } from 'react-icons/im';
import { ImWarning } from 'react-icons/im';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BiAddToQueue} from 'react-icons/bi';
import {AiFillCheckCircle} from  'react-icons/ai'
import {TrialBalance} from './TrialBalance'
import {FaBalanceScaleLeft} from 'react-icons/fa'


export const ManagerHome = (props) => {
const [searchQuery, setSearchQuery] = useState('');
const [journalEntries, setJournalEntries] = useState([]);
const [filteredEntryIds, setFilteredEntryIds] = useState([]);
const [searchByDate, setSearchByDate] = useState(false);



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
<div className="card">
<h3>Searching Journal Entries</h3>
<input type="text" value={searchQuery}
onchange={(e)   => setSearchQuery(e.target.value)}      
onKeyPress={handleKeyPress}
/>
<label>
    <input
    type="checkbox"
    checked={searchByDate}
    onChange={handleToggle}
    />
    Search by date
    </label> 
    <button onClick={handleSearch}>Search</button>
    {filteredEntryIds.length >0 ?(
    <div>
        {filteredEntryIds.map((id) => (
            <div key={id}>Journal Entry {id}</div>
        ))}
</div>
    ):(<div>.</div>
    )}
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
            <div className="dashbox">
                <Link to='apprejje'>
                    <div className = "card">
                        <h3>Approve/Reject<br></br>Journal Entries</h3>
                        <br></br>
                        <AiFillCheckCircle size={50}/>
                    </div>
                </Link>
                <Link to="viewusers">
                    <div className = "card">
                        <h3>View</h3>
                        <h3>Users</h3>
                        <br></br>
                        <AccountCircleIcon sx={{ fontSize: 50 }}/>
                    </div>
                    <Link to="viewusers">
                    <div className = "card">
                        <h3>View</h3>
                        
                        <h3>Users</h3>
                        <br></br>
                        <AccountCircleIcon sx={{ fontSize: 50 }}/>
                    </div>
                </Link>
                </Link>
                <Link to="financialreport">
                    <div className = "card">
                        <h3>Financial</h3>
                        <h3>Report</h3>
                        <br></br>
                        <FaBalanceScaleLeft size={50}/>
                    </div>
                </Link>
            </div>
        </div>

        </>
        
        );
}

