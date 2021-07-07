import React from 'react';
import Googlelogin from 'react-google-login';
import server from '../apis/server';
import google from "../images/google.png";
import { getUserInfo } from "../actions/userAction";
import { useDispatch } from "react-redux";

const Google = ({ handleClickClose }) => {
  const dispatch = useDispatch();

  const responseGoogle = async (googleData) => {
    await server.post("/login/google", {
      token: googleData.tokenId
    }).then(res => {
      if (res.status === 200 || res.status === 201) {
        localStorage.setItem("accessToken", res.data.data.accessToken);
        handleClickClose();
      } else {
        alert("구글 로그인 중 오류가 발생했습니다.");
        return;
      }
    });
    await server //로그인한 유저의 정보를 state에 저장
    .get(`/user/:user_id`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(getUserInfo(res.data.data.userInfo));
      }
    })
    .catch((err) => {
      throw err;
    });
    // console.log(res);
    console.log('---------------------')
    console.log("email: "+ googleData.profileObj.email);
    // console.log("accessToken: " + googleData.accessToken);
    console.log('---------------------')
    window.location.href = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
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
          alt="google-login-logo"
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