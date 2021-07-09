import React from "react";
import { redirectUri } from "../config"
import naverPng from "../images/naver.png";


const client_id = process.env.REACT_APP_NAVER_CLIENT_ID;
const state = "codeStates123";

const Naver = () => {

  const Login = () => {
    const api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${encodeURI(redirectUri)}&state=${encodeURI(state)}`;
    window.location.href = api_url;
  }
  
  return (
    <div className="loginBtnPosition">
      <button
        className="btn-login login"
        onClick={Login}
      >
        <img
          src={naverPng}
          alert="google-logo"
          className="oauth-logo"
          alt="google-login-logo"
        ></img>
        <div className="settingBtn"> 네이버 로그인 </div>
      </button>
    </div>
  )

}

export default Naver;