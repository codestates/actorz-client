import React, { useState } from "react";
import kakao from "../images/kakao.png";
import google from "../images/google.png";
import server from "../apis/server";
import "../styles/SigninModal.css";
import Google from '../components/Googlelogin';
import Naver from '../components/Naverlogin';

import { CloseOutlined } from "@ant-design/icons";
import Nav from "../components/Nav";

const Signin = ({ handleClickSignin, handleClickSignup,  }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState("");
  const [login, setLogin] = useState(false);


  const handleInputValue = (key) => (event) => {
    if (key === "email") {
      setEmail({ [key]: event.target.value });
    } else if (key === "password") {
      setPassword({ [key]: event.target.value });
    }
  };

  const handleClickSigninBtn = async () => { 
    try {
      if (email !== "" && password !== "") {
        await server
          .post(
            `/login`,
            {
              email: email.email,
              password: password.password,
            }
          )
          .then((res) => {
            if (res.status === 200) {
              localStorage.setItem("accessToken", res.data.data.accessToken);
              console.log('로그인에 성공하였습니다.');    
              handleClickClose();
            }
          });
      } else {
        setError("모든 항목은 필수입니다");
      }
    } catch (err) {
      if (err.message === "Request failed with status code 401") {
        alert("등록되지 않은 회원이거나 잘못된 비밀번호 입니다");
      } else {
        alert("예상치 못한 오류가 발생했습니다. 잠시 후 다시 이용해주세요");
      }
    }
  };

  const handleClickGoogleBtn = () => {
    console.log("google login");
  };

  const handleClickKakaoBtn = () => {
    console.log("kakao login");
  };

  const handleClickClose = () => {
    handleClickSignin(false);
  };

  return (
    <>
      <center>
        <form onSubmit={(e) => e.preventDefault()}>
          <div id="modal-background">
            <div id="modal-container">
              <div className="buttonHeader">
              </div>

                <div className="modalCancleBtn">
                     
                </div>
                <div className="modal-title">
                  <div className="title">
                  <div>Sign In </div>
                  
                  <CloseOutlined
                    className="closeBtn"
                    onClick={handleClickClose} />
                  </div>
                </div>   
                <div className="modal-welcome-message">
                   Welcome to Actorz
                </div>
                <div className="modal-group">
                  <input
                    type="email"
                    placeholder=" email"
                    onChange={handleInputValue("email")}
                  />
                </div>
                <div className="modal-group">
                    <input
                      type="password"
                      placeholder=" password"
                      onChange={handleInputValue("password")}
                    />
                </div>
                <div>
                  {err ? <div className="err-message">{err}</div> : null}
                </div>
                <div className="modalButtonPosition"> 
                  <div className="loginBtnPosition">
                    <button
                      className="btn-login login"
                      type="submit"
                      onClick={handleClickSigninBtn}
                    >
                      <div className="settingBtn"> 로그인 </div>
                    </button>
                  </div>
                  <div className="loginBtnPosition">
                    <Google handleClickClose={handleClickClose}/>
                  </div>
                  <div className="loginBtnPosition">
                    <Naver handleClickClose={handleClickClose}/>
                  </div>
                    <div className="signUpbtnPosition">
                      <div className="movetoSignUp"> 아직 계정이 없으십니까?</div>
                      <div className="movetoSignUpBtn"  onClick={() => handleClickSignup(true)}>
                         회원가입 하러 하기 
                      </div>
                    </div>
                  </div>
            </div>
          </div>
        </form>
      </center>
    </>
  );
};
export default Signin;
