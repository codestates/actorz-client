import React from "react";
import failed from "../images/depression.png";
import "../styles/NoContents.css";

const NoContents = () => {
  return (
    <center>
      <div className="failed-box">
        <img src={failed} className="failed-icon"></img>
        <span className="failed-span">아무것도 없어요!</span>
      </div>
    </center>
  );
};
export default NoContents;
