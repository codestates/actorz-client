import React, { useState } from "react";
import server from "../apis/server";
import "../styles/SignupModal.css";
import { CloseOutlined } from "@ant-design/icons";

const Signup = ({ handleClickSignup, handleClickSignin }) => {
  /* const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [provider, setProvider] = useState("");
  const [dob, setDob] = useState(""); */
  const [actorSignup, setActorSignup] = useState({});
  const [recruitorSignup, setRecruitorSignup] = useState({});
  /*  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jobTitle, setJobTitle] = useState(""); */
  const [err, setError] = useState("");
  const [role, setRole] = useState("배우");

  const handleClickClose = () => {
    handleClickSignup(false);
  };

  const handleInputActorValue = (key) => (event) => {
    /* if (key === "email") {
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
    } */
    setActorSignup({ ...actorSignup, [key]: event.target.value });
  };

  const handleInputRecruitorValue = (key) => (event) => {
    /* if (key === "name") {
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
    } */
    setRecruitorSignup({ ...recruitorSignup, [key]: event.target.value });
  };

  const handleClickActorSignupBtn = async () => {
    /* if (dob.dob.length !== 10 || dob.dob[4] !== "-" || dob.dob[7] !== "-") {
      setError("생년월일 형식을 지켜서 작성해주세요");
    } else if (email !== "" && password !== "" && name !== "" && dob !== "") {
      await server.post(`signup`, {
        //email: email.email,
        password: password.passowrd,
        name: name.name,
        company: company.company,
        provider: "local",
        /*gender: gender.gender,*/
    // dob: dob.dob,
    // }); */
    /*  } else {
      setError("필수 항목을 모두 적어주세요");
    } */
  };

  const handleClickRecruitorSignupBtn = () => {
    /* if (name !== "" && address !== "" && email !== "" && password !== "") {
    } else {
      setError("필수 항목을 모두 적어주세요");
    } */
    console.log(recruitorSignup);
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
                  <div className="title">
                    <div>Sign Up </div>  
                    <CloseOutlined
                      className="closeBtn"
                      onClick={handleClickClose} />
                  </div>
                </div>   
                <div className="modal-welcome-message">
                  Welcome to Actorz
                </div>
                  <div className="modal-group-signup-role">
                    <input
                      type="radio"
                      name="role"
                      value="배우"
                      defaultChecked
                      onClick={handleClickRadio}
                    />
                    &nbsp;배우
                    <input
                      type="radio"
                      name="role"
                      value="리크루터"
                      onClick={handleClickRadio}
                    />
                    &nbsp;리크루터
                  </div>

                  {role === "배우" ? (
                    <>
                      <div className="modal-group-signup">
                        <div className="importEffect">*</div>
                        <div>
                          <input
                            type="email"
                            placeholder="이메일"
                            onChange={handleInputActorValue("email")}
                          />
                        </div>
                      </div>
                      <div className="modal-group-signup">
                        <div className="importEffect">*</div>
                        <div>
                          <input
                            type="password"
                            placeholder="비밀번호"
                            onChange={handleInputActorValue("password")}
                          />
                        </div>
                      </div>
                      <div className="modal-group-signup">
                        <div className="importEffect">*</div>
                        <div>
                          <input
                          type="text"
                          placeholder="이름"
                          onChange={handleInputActorValue("name")}
                          />
                        </div>
                      </div>
                      <div className="modal-group-signup">
                        <div className="importEffect">&nbsp;&nbsp;</div>
                        <div>
                          <input
                            type="text"
                            placeholder="소속사"
                            onChange={handleInputActorValue("company")}
                          />
                        </div>
                      </div>
                      <div className="modal-group-signup">
                        <div className="importEffect">*</div>
                        <div>
                          <input
                          type="text"
                          placeholder="생년월일 (1990-01-02)"
                          onChange={handleInputActorValue("dob")}
                          />
                        </div>
                      </div>
                      
                      <div className="modal-group-signup-gender">
                        <input
                          type="radio"
                          name="gender"
                          defaultChecked
                          value="남"
                          onChange={handleInputActorValue("gender")}
                        />
                        &nbsp;남
                        <input type="radio" name="gender" value="여" />&nbsp;여
                      </div>
                      <div>
                        {err ? <div className="err-message">{err}</div> : null}
                      </div>
                      <button
                        className="btn-login2"
                        type="submit"
                        onClick={handleClickActorSignupBtn}
                      >
                        회원가입
                      </button>
                      <div className="signUpbtnPosition2">
                        <div className="movetoSignUp"> 아직 계정이 없으십니까?</div>
                        <div className="movetoSignUpBtn"  onClick={() => handleClickSignin(true)}>
                          로그인 하러 하기 
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                    <div className="moreInfo">
                      <div className="modal-group-signup">
                        <div className="importEffect">*</div>
                        <div>
                          <input
                            type="email"
                            placeholder="이메일"
                            onChange={handleInputActorValue("email")}
                          />
                        </div>
                      </div>
                      <div className="modal-group-signup">
                        <div className="importEffect">*</div>
                        <div>
                          <input
                            type="password"
                            placeholder="비밀번호"
                            onChange={handleInputActorValue("password")}
                          />
                        </div>
                      </div>
                      <div className="modal-group-signup">
                        <div className="importEffect">*</div>
                        <div>
                          <input
                          type="text"
                          placeholder="이름"
                          onChange={handleInputActorValue("name")}
                          />
                        </div>
                      </div>
                      <div className="modal-group-signup">
                        <div className="importEffect">*</div>
                        <div>
                          <input
                          type="text"
                          placeholder="생년월일 (1990-01-02)"
                          onChange={handleInputActorValue("dob")}
                          />
                        </div>
                      </div>
                      <div className="modal-group-signup">
                        <div className="importEffect">*</div>
                        <div>
                          <input
                          type="text"
                          placeholder="회사명"
                          onChange={handleInputActorValue("name")}
                          />
                        </div>
                      </div>

                      <div className="modal-group-signup2">
                        <div className="importEffect">*</div>
                        <div className="modal-group-signup3">
                          <div className="reposition">  
                            <input
                              type="text"
                              placeholder="시/도"
                              onChange={handleInputRecruitorValue("address-city")}
                            />
                          </div>
                        </div>
                        <div className="modal-group-signup3">
                          <input
                            type="text"
                            placeholder="시/군/구"
                            onChange={handleInputRecruitorValue(
                              "address-street"
                            )}
                          />
                        </div>
                        <div className="modal-group-signup3">
                          <input
                            type="text"
                            placeholder="우편번호"
                            onChange={handleInputRecruitorValue(
                              "address-zipcode"
                            )}
                          />
                        </div>
                      </div>

                      <div className="modal-group-signup">
                        <div className="importEffect2">&nbsp;&nbsp;</div>
                        <div>
                          <input
                            type="email"
                            placeholder="회사 이메일"
                            onChange={handleInputRecruitorValue("email")}
                          />
                        </div>
                      </div>

                      <div className="modal-group-signup">
                        <div className="importEffect">&nbsp;&nbsp;</div>
                        <div>
                          <input
                            type="email"
                            placeholder="회사 전화번호"
                            onChange={handleInputRecruitorValue("phoneNumber")}
                          />
                        </div>
                      </div>

                      <div className="modal-group-signup">
                        <div className="importEffect">&nbsp;&nbsp;</div>
                        <div>
                          <input
                            type="email"
                            placeholder="직책"
                            onChange={handleInputRecruitorValue("jobTitle")}
                          />
                        </div>
                      </div>

                      <div className="modal-group-signup-gender">
                        <input
                          type="radio"
                          name="gender"
                          defaultChecked
                          value="남"
                        />
                        &nbsp;남
                        <input type="radio" name="gender" value="여" />&nbsp;여
                      </div>
                      {err ? <div className="err-message">{err}</div> : null}
                      <button
                        className="btn-login"
                        type="submit"
                        onClick={handleClickRecruitorSignupBtn}
                      >
                        회원가입
                      </button>
                      </div>
                    
                   <div className="signUpbtnPosition3">
                      <div className="movetoSignUp"> 이미 계정이 있으십니까?</div>
                      <div className="movetoSignUpBtn"  onClick={() => handleClickSignin(true)}>
                         로그인 하러 하기 
                      </div>
                    </div>
                  </>
                  )}
              </div>
            </div>
          </div>
        </form>
      </center>
    </>
  );
};
export default Signup;
