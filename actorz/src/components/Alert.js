import React from "react";
import { AlertOutlined } from "@ant-design/icons";
import "../styles/Alert.css";

const Alert = ({ content }) => {
  const handleClickConfirmBtn = () => {
    window.location = "/mainpage";
  };
  return (
    <div id="alert-background">
      <div id="alert-container">
        <div id="alert-box">
          <AlertOutlined className="alert-icon" />
          <div className="alert-title">접근실패</div>
        </div>
        <div className="alert-content">{content}</div>
        <button className="alert-confirm-btn" onClick={handleClickConfirmBtn}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Alert;
