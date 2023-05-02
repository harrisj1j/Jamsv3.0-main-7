import React, { useState } from "react";
import {AiOutlineExclamationCircle} from "react-icons/ai"



export const Alert = ({ variant }) => {

  const [open, setOpen] = useState(true);
  if (open)
    return (
      <div
        className="alert-container"
        style={{
          background: variant.mainColor,
          border: "0.1rem solid " + variant.secondaryColor,
          color: variant.secondaryColor
        }}
      >
        <div
          className="symbol-container"
          style={{ background: variant.secondaryColor, color: variant.mainColor }}
        >
          <span class="material-symbols-outlined symbol"><AiOutlineExclamationCircle /></span>{" "}
        </div>
        <div className="description-container">
          <span className="description-title">{variant.title}:</span>
          <span className="description-text">{variant.text}</span>
        </div>
      </div>
    );
};