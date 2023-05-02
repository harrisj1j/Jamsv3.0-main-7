import React from "react";

import './ValidPass.css';

//Show list of elements that password must contain and cross out if they are present
export const MustContainElement = props => {
    const {data} = props
    const label = data[0]
    const meetsReq = data[1]

    const setClass = () => {
        const classArr = ["must-line"]
        if (meetsReq) classArr.push('cross-out')
        return classArr.join(' ')
    }

    return (
        <div className="MustContainElement">
            <div className="must-item">
                <li className="must-text">{label}</li>
                <div className={setClass()}></div>
            </div>
        </div>
  );

}

export default MustContainElement;