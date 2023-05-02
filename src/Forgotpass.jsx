import React, {useState} from "react";
import { Link } from "react-router-dom";
import menuLogo from './img/JAMS_1563X1563.png'


{/* */}
export const Forgotpass = (props) =>{
    const [answer, setAnswer] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [oldPasswords, setOldPasswords] = useState([]);

    {/* event handler for form entry*/}
    const handleSubmit= (e) => {
        e.preventDefault();
        console.log(email);

        // check if password has been used before
        const newPassword = e.target.password.value;
        if (oldPasswords.includes(newPassword)) {
            alert("Please choose a new password. This password has been used before.");
            return;
        }

        // add new password to list of old passwords
        setOldPasswords([...oldPasswords, newPassword]);
    }


    {/*forgot password form */}
    return(

        <><div className="big-logo">
            <img src={menuLogo} alt="logo" />

        </div><div className="auth-form-container">
                <h2>Recover Password</h2>
                <form className="forgotpass-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@mail.com" id="email" name="email" />
                    <label htmlFor="securityquestion">Security Question</label>
                    <input value={answer} onChange={(e) => setAnswer(e.target.value)} type="email" placeholder="what city were you born in?" id="answer" name="answer" />
                    <button type="submit">Recover Password</button>
                    <label htmlFor="password">New Password</label>
                <input type="password" placeholder="New Password" id="password" name="password" />
                <button className="custom-button" type="submit">Recover Password</button>
                </form>
                {/* switch to login form*/}
                <Link to="/">
                    <button className="link-btn">login</button>
                </Link>
            </div></>
    );
}
