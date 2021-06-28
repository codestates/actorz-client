import React, { useState } from "react";
import "../styles/SignupModal.css";

const Signup = ({ handleClickSignup, handleClickSignin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [provider, setProvider] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [err, setError] = useState("");
  const [role, setRole] = useState("배우");

  const handleClickClose = () => {
    handleClickSignup(false);
  };

  const handleInputActorValue = (key) => (event) => {
    if (key === "email") {
      setEmail({ [key]: event.target.value });
    } else if (key === "password") {
      setPassword({ [key]: event.target.value });
    } else if (key === "name") {
      setName({ [key]: event.target.value });
    } else if (key === "company") {
      setCompany({ [key]: event.target.value });
    } else if (key === "provider") {
      setProvider({ [key]: event.target.value });
    } else if (key === "dob") {
      setDob({ [key]: event.target.value });
    }
  };

  const handleInputRecruitorValue = (key) => (event) => {
    if (key === "name") {
      setName({ [key]: event.target.value });
    } else if (key === "address") {
      setAddress({ [key]: event.target.value });
    } else if (key === "email") {
      setEmail({ [key]: event.target.value });
    } else if (key === "password") {
      setPassword({ [key]: event.target.value });
    } else if (key === "phoneNumber") {
      setPhoneNumber({ [key]: event.target.value });
    } else if (key === "jobTitle") {
      setJobTitle({ [key]: event.target.value });
    }
  };

  const handleClickActorSignupBtn = () => {
    if (dob.dob.length !== 10 || dob.dob[4] !== "-" || dob.dob[7] !== "-") {
      setError("생년월일 형식을 지켜서 작성해주세요");
    } else if (email !== "" && password !== "" && name !== "" && dob !== "") {
    } else {
      setError("필수 항목을 모두 적어주세요");
    }
  };

  const handleClickRecruitorSignupBtn = () => {
    if (name !== "" && address !== "" && email !== "" && password !== "") {
    } else {
      setError("필수 항목을 모두 적어주세요");
    }
  };

  const handleClickRadio = (event) => {
    if (event.target.value === "배우") {
      setRole("배우");
    } else if (event.target.value === "리크루터") {
      setRole("리크루터");
    }
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
                  <div className="title">회원가입</div>
                  <button className="modal-btn" onClick={handleClickClose}>
                    X
                  </button>
                  <div className="modal-welcome-message">
                    Actorz에 오신것을 환영합니다
                  </div>
                  <div className="modal-group-signup-role">
                    <input
                      type="radio"
                      name="role"
                      value="배우"
                      defaultChecked
                      onClick={handleClickRadio}
                    />
                    배우
                    <input
                      type="radio"
                      name="role"
                      value="리크루터"
                      onClick={handleClickRadio}
                    />
                    리크루터
                  </div>
                  {role === "배우" ? (
                    <>
                      <div className="modal-group-signup">
                        *
                        <input
                          type="email"
                          placeholder="이메일"
                          onChange={handleInputActorValue("email")}
                        />
                      </div>
                      <div className="modal-group-signup">
                        *
                        <input
                          type="password"
                          placeholder="비밀번호"
                          onChange={handleInputActorValue("password")}
                        />
                      </div>
                      <div className="modal-group-signup">
                        *
                        <input
                          type="text"
                          placeholder="이름"
                          onChange={handleInputActorValue("name")}
                        />
                      </div>
                      <div className="modal-group-signup">
                        <input
                          type="text"
                          placeholder="소속사"
                          onChange={handleInputActorValue("company")}
                        />
                      </div>
                      <div className="modal-group-signup">
                        *
                        <input
                          type="text"
                          placeholder="생년월일 (1990-01-02)"
                          onChange={handleInputActorValue("dob")}
                        />
                      </div>
                      <div className="modal-group-signup-gender">
                        <input
                          type="radio"
                          name="gender"
                          defaultChecked
                          value="남"
                        />
                        남
                        <input type="radio" name="gender" value="여" />여
                      </div>
                      {err ? <div className="err-message">{err}</div> : null}
                      <button
                        className="btn-login"
                        type="submit"
                        onClick={handleClickActorSignupBtn}
                      >
                        회원가입
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="modal-group-signup">
                        *
                        <input
                          type="text"
                          placeholder="회사명"
                          onChange={handleInputRecruitorValue("name")}
                        />
                      </div>
                      <div className="modal-group-signup">
                        *
                        <input
                          type="text"
                          placeholder="회사주소"
                          onChange={handleInputRecruitorValue("address")}
                        />
                      </div>
                      <div className="modal-group-signup">
                        *
                        <input
                          type="email"
                          placeholder="이메일"
                          onChange={handleInputRecruitorValue("email")}
                        />
                      </div>
                      <div className="modal-group-signup">
                        *
                        <input
                          type="password"
                          placeholder="비밀번호"
                          onChange={handleInputRecruitorValue("password")}
                        />
                      </div>
                      <div className="modal-group-signup">
                        <input
                          type="text"
                          placeholder="전화번호"
                          onChange={handleInputRecruitorValue("phoneNumber")}
                        />
                      </div>
                      <div className="modal-group-signup">
                        <input
                          type="text"
                          placeholder="직책"
                          onChange={handleInputRecruitorValue("jobTitle")}
                        />
                      </div>
                      {err ? <div className="err-message">{err}</div> : null}
                      <button
                        className="btn-login"
                        type="submit"
                        onClick={handleClickRecruitorSignupBtn}
                      >
                        회원가입
                      </button>
                    </>
                  )}
                  <div
                    className="signup"
                    onClick={() => handleClickSignin(true)}
                  >
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
};
export default Signup;
