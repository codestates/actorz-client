import React, { useState } from "react";
import kakao from "../images/kakao.png";
import google from "../images/google.png";
import server from "../apis/server";
import "../styles/SigninModal.css";

const Signin = ({ handleClickSignin, handleClickSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState("");

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
          .post(`/login`, {
            email: email.email,
            password: password.password,
          })
          .then((res) => {
            if (res.status === 200) {
              console.log("로그인 성공");
              handleClickClose();
            } else if (res.status === 401) {
              alert("등록되지 않은 회원이거나 잘못된 비밀번호 입니다");
            }
          });
      } else {
        setError("모든 항목은 필수입니다");
      }
    } catch {
      alert("예상치 못한 오류가 발생했습니다. 잠시 후 다시 이용해주세요");
    }
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
              <div id="modal-header"></div>
              <div id="modal-section">
                <div className="modal-title">
                  <div className="title">로그인</div>
                  <button className="modal-btn" onClick={handleClickClose}>
                    X
                  </button>
                  <div className="modal-welcome-message">
                    Actorz에 오신것을 환영합니다
                  </div>
                  <div className="modal-group">
                    <input
                      type="email"
                      placeholder="이메일"
                      onChange={handleInputValue("email")}
                    />
                  </div>
                  <div className="modal-group">
                    <input
                      type="password"
                      placeholder="비밀번호"
                      onChange={handleInputValue("password")}
                    />
                  </div>
                  {err ? <div className="err-message">{err}</div> : null}
                  <button
                    className="btn-login login"
                    type="submit"
                    onClick={handleClickSigninBtn}
                  >
                    로그인
                  </button>
                  <button className="btn-login btn-login-kakao">
                    <img src={google} className="kakao-logo"></img>
                    구글로 로그인하기
                  </button>
                  <button className="btn-login btn-login-kakao">
                    <img src={kakao} className="kakao-logo"></img>
                    카카오로 로그인하기
                  </button>
                  <div
                    className="signup"
                    onClick={() => handleClickSignup(true)}
                  >
                    아직 계정이 없으십니까? 회원가입 하러 하기
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
