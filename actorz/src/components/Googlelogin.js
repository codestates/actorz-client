import React from 'react';
import Googlelogin from 'react-google-login';
import google from "../images/google.png";

const Google = () => {
  const responseGoogle = (res) => {
    // console.log(res);
    console.log('---------------------')
    console.log("email: "+res.profileObj.email);
    console.log("Name: "+res.profileObj.name);
    console.log("googleId: "+res.profileObj.googleId);
    console.log("imageUrl: "+res.profileObj.imageUrl);
    console.log("accessToken: " + res.accessToken);
    console.log('---------------------')
  }

  return (
    <Googlelogin 
      clientId={process.env.REACT_APP_Google}
      buttonText="구글로 로그인하기"
      render={renderProps => (
       <button 
        onClick={renderProps.onClick} disabled={renderProps.disabled}
        className="btn-login login"
       >
        <img
          src={google}
          alert="google-logo"
          className="kakao-logo"
        ></img>
       구글로 로그인하기</button>
      )}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export default Google;