import React, { useEffect } from "react";
import dotenv from "dotenv";
import server from "../apis/server";
import NaverLogin from "react-login-by-naver";
import naver from "../images/kakao.png";
import axios from "axios";

const client_secret = process.env.REACT_APP_NAVER_CLIENT_SECRET;
const client_id = process.env.REACT_APP_NAVER_CLIENT_ID;
const redirectURI = encodeURI(process.env.REACT_APP_NAVER_REDIRECT_URI);
const state = "codeStates123";

const Naver = ({ handleClickClose }) => {

  const Login = () => {
    const api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirectURI}&state=${encodeURI(state)}`;
    window.location.href = api_url;
  }
    // const code = req.query.code;
    // const state2 = req.query.state;

  // const { naver } = window;
 
  // const Login = () => {
  //   NaverLog();
  //   UserProfile();
  // }
  
  // useEffect(Login, []);
  // // }
  // const NaverLog = () => {
  //   const naverLogin = new naver.LoginWithNaverId({
  //     clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
  //     callbackUrl: encodeURI(process.env.REACT_APP_NAVER_REDIRECT_URI),
  //     isPopup: false,
  //     loginButton: {color: "white", type: 2, height: 30} ,
  //     callbackHandle: true
  //   });
  //   naverLogin.init();
  // }
  
  // const UserProfile = () => {
  //   window.location.href.includes('access_token') && GetUser();
  //   function GetUser() {
  //     const location = window.location.href.split('=')[1];
  //     const token = location.split('&')[0];
  //     alert(token)
  //     console.log("token: ", token);
  //     server.post("/login/naver", {
  //       token: token
  //     })
  //     .then(res => res.json())
  //     .then(res => {
  //       localStorage.setItem("access_token", res.token);
  //       alert(res.token);
  //     })
  //     .catch(err => console.log("err : ", err));
  //   }
  // };
 
  
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
  // const responseNaver = async () => {
  //   const urlAccessToken = window.location.href.split("=")[1];
  //   const token = urlAccessToken.split("&")[0];
  //   await server.post("/login/google", {
  //     toekn: token
  //   }).then(res => {
  //     if (res.status === 200) {
  //       localStorage.setItem("accessToken", res.data.data.accessToken);
  //       handleClickClose();
  //     } else if (res.status === 201) {
  //       localStorage.setItem("accessToken", res.data.data.accessToken);
  //       handleClickClose();
  //       // edit needed
  //     } else {
  //       alert("구글 로그인 중 오류가 발생했습니다.");
  //     }
  //   });
  // }
  // const naverLogin = () => {
  //   const login = new window.naver.LoginWithNaverId({
  //     clientId: process.env.NAVER_CLIENT_ID,
  //     callbackUrl: process.env.NAVER_REDIRECT_URI,
  //     isPopup: true,
  //     loginButton: {
  //       color: "green",
  //       type: 1,
  //       height: 25
  //     },
  //     callbackHandle: true
  //   });
  //   login.init();
  // }

  // window.addEventListener('load', function () {
  //   naverLogin.getLoginStatus(function (status) {
  //     if (status) {
  //         /* (5) 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
  //         var email = naverLogin.user.getEmail();
  //         if (email === undefined || email === null) {
  //             alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
  //             /* (5-1) 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
  //             naverLogin.reprompt();
  //             return;
  //         }
  //         window.location.replace("http://localhost:3000/api");
  //     } else {
  //         console.log("callback 처리에 실패하였습니다.");
  //     }
  //   });
  // });
  // useEffect(() => {
  //   naverLogin();
  //   setError(false);
  //   setAlert(false);
  // })
  // // console.log(res);
  // console.log('---------------------')
  // console.log("email: "+ token.email);
  // // console.log("accessToken: " + googleData.accessToken);
  // console.log('---------------------')

  // return (
  //   <div id="naverIdLogin"></div>
  // );
}

export default Naver;