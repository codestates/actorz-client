import React, { useState } from "react";
import "../styles/SignupModal.css";

const Signup = ({ handleClickSignup, handleClickSignin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [provider, setProvider] = useState("");
  const [dob, setDob] = useState("");
  const [err, setError] = useState("");

  const handleClickClose = () => {
    handleClickSignup(false);
  }

  const handleInputValue = key => e => {
    if (key === "email") {
      setEmail({ [key]: e.target.value });
    } else if (key === "password") {
      setPassword({ [key]: e.target.value });
    } else if (key === "name") {
      setName({ [key]: e.target.value });
    } else if (key === "company") {
      setCompany({ [key]: e.target.value });
    } else if (key === "provider") {
      setProvider({ [key]: e.target.value });
    } else if (key === "dob") {
      setDob({ [key]: e.target.value });
    }
  };

  const handleClickSignupBtn = () => {
    if (email !== "" && password !== "" && name !== "" && provider !== "" && dob !== "") {

    } else {
      setError("필수 항목을 모두 적어주세요");
    }
  }

  return (
    <>
      <center>
        <form onSubmit={e => e.preventDefault()}>
          <div id="modal-background">
            <div id="modal-container">
              <div id="modal-header">
              </div>
              <div id="modal-section">
                <div className="modal-title">
                  <div className="title">회원가입</div>
                  <button className="modal-btn" onClick={handleClickClose}>X</button>
                  <div className="modal-welcome-message">Actorz에 오신것을 환영합니다</div>
                  <div className="modal-group-signup">
                    *<input type="email" placeholder="이메일" onChange={handleInputValue("email")} />
                  </div>
                  <div className="modal-group-signup">
                    *<input type="password" placeholder="비밀번호" onChange={handleInputValue("password")} />
                  </div>
                  <div className="modal-group-signup">
                    *<input type="text" placeholder="이름" onChange={handleInputValue("name")} />
                  </div>
                  <div className="modal-group-signup">
                    <input type="text" placeholder="소속사" onChange={handleInputValue("company")} />
                  </div>
                  <div className="modal-group-signup">
                    *<input type="text" placeholder="provider" onChange={handleInputValue("provider")} />
                  </div>
                  <div className="modal-group-signup-gender">
                    <input type="radio" name="gender" checked value="남" />남
                    <input type="radio" name="gender" value="여" />여
                  </div>
                  <div className="modal-group-signup">
                    *<input type="text" placeholder="dob" onChange={handleInputValue("dob")} />
                  </div>
                  {err ? <div className="err-message">{err}</div> : null}
                  <button className="btn-login" type="submit" onClick={handleClickSignupBtn}>
                    회원가입
                  </button>
                  <div className="signup" onClick={() => handleClickSignin(true)}>
                    이미 계정이 있으십나까? 로그인 하러 하기
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </center>
    </>
  );
}
export default Signup;