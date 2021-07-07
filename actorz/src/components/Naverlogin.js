import React from "react";

const client_id = process.env.REACT_APP_NAVER_CLIENT_ID;
const redirectURI = encodeURI(process.env.REACT_APP_NAVER_REDIRECT_URI);
const state = "codeStates123";

const Naver = ({ handleClickClose }) => {

  const Login = () => {
    const api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirectURI}&state=${encodeURI(state)}`;
    window.location.href = api_url;
  }
  
  return (
    <div className="loginBtnPosition">
      <button
        className="btn-login login"
        onClick={Login}
      >
        <div className="settingBtn"> 네이버 로그인 </div>
      </button>
    </div>
  )

}

export default Naver;