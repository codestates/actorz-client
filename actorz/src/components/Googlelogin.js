import React from "react";
import google from "../images/google.png";
import Googlelogin from "react-google-login";
import { redirectUri } from "../config";

const Google = () => {
  const responseGoogle = (googleData) => {
    window.location.href = `${redirectUri}?code=${googleData.tokenId}&token=fromGoogle`;
  };

  return (
    <Googlelogin 
      clientId={process.env.REACT_APP_Google}
      buttonText="구글로 로그인하기"
      render={renderProps => (
        <div className="loginBtnPosition">
          <button
            className="btn-login login"
            onClick={renderProps.onClick} disabled={renderProps.disabled}
          >
            <img
              src={google}
              alert="google-logo"
              className="oauth-logo"
              alt="google-login-logo"
            ></img>
            <div className="settingBtn"> 구글 로그인 </div>
          </button>
        </div>
      )}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
}

export default Google;