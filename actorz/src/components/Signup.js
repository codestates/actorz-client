import React, { useState } from "react";
import server from "../apis/server";
import "../styles/SignupModal.css";

const Signup = ({ handleClickSignup, handleClickSignin }) => {
  const [actorSignup, setActorSignup] = useState({});
  const [recruitorSignup, setRecruitorSignup] = useState({});
  const [err, setError] = useState("");
  const [role, setRole] = useState("배우");

  const handleClickClose = () => {
    handleClickSignup(false);
  };

  const handleInputActorValue = (key) => (event) => {
    setActorSignup({ ...actorSignup, [key]: event.target.value });
  };

  const handleInputRecruitorValue = (key) => (event) => {
    setRecruitorSignup({ ...recruitorSignup, [key]: event.target.value });
  };

  const setGender = (gender) => {
    if (gender === "남") {
      return false;
    } else if (gender === "여") {
      return true;
    } else {
      return false;
    }
  };

  const handleClickActorSignupBtn = async () => {
    const { email, password, name, dob, company, gender } = actorSignup;
    try {
      if (
        email !== undefined &&
        password !== undefined &&
        name !== undefined &&
        dob !== undefined
      ) {
        if (dob.length !== 10 || dob[4] !== "-" || dob[7] !== "-") {
          setError("생년월일 형식을 지켜서 작성해주세요");
        } else {
          setError("");
          await server
            .post(`signup`, {
              email: email,
              password: password,
              name: name,
              company: company,
              //provider: "local",
              gender: setGender(gender),
              dob: dob,
            })
            .then((res) => {
              if (res.status === 201) {
                console.log("회원가입 성공");
              }
            });
        }
      } else {
        setError("필수 항목을 모두 적어주세요");
      }
    } catch (err) {
      if (err.message === "Request failed with status code 409") {
        alert("이미 존재하는 이메일입니다 \n 다른 계정으로 시도해주세요");
      } else {
        alert("예상치 못한 오류가 발생했습니다. 잠시 후 다시 이용해주세요");
      }
    }
  };

  const handleClickRecruitorSignupBtn = async () => {
    const {
      email,
      password,
      name,
      dob,
      gender,
      bName,
      bAddress_city,
      bAddress_street,
      bAddress_zipcode,
      bEmail,
      phoneNum,
      jobTitle,
    } = recruitorSignup;

    try {
      if (
        email !== undefined &&
        password !== undefined &&
        name !== undefined &&
        dob !== undefined &&
        bName !== undefined &&
        bAddress_city !== undefined &&
        bAddress_street !== undefined &&
        bAddress_zipcode !== undefined
      ) {
        if (dob.length !== 10 || dob[4] !== "-" || dob[7] !== "-") {
          setError("생년월일 형식을 지켜서 작성해주세요");
        } else {
          setError("");
          await server.post(`signup`, {
            email: email,
            password: password,
            name: name,
            provider: "local",
            gender: setGender(gender),
            dob: dob,
            recruitor: {
              bName: bName,
              bAddress: {
                city: bAddress_city,
                street: bAddress_street,
                zipcode: bAddress_zipcode,
              },
              bEmail: bEmail,
              phoneNum: phoneNum,
              jobTitle: jobTitle,
            },
          });
        }
      } else {
        setError("필수 항목을 모두 적어주세요");
      }
    } catch {
      alert("예상치 못한 오류가 발생했습니다. 잠시 후 다시 이용해주세요");
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
                          onChange={handleInputActorValue("gender")}
                        />
                        남
                        <input
                          type="radio"
                          name="gender"
                          value="여"
                          onChange={handleInputActorValue("gender")}
                        />
                        여
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
                        *
                        <input
                          type="text"
                          placeholder="이름"
                          onChange={handleInputRecruitorValue("name")}
                        />
                      </div>
                      <div className="modal-group-signup">
                        *
                        <input
                          type="text"
                          placeholder="생년월일 (1990-01-02)"
                          onChange={handleInputRecruitorValue("dob")}
                        />
                      </div>
                      <div className="modal-group-signup">
                        *
                        <input
                          type="text"
                          placeholder="회사명"
                          onChange={handleInputRecruitorValue("bName")}
                        />
                      </div>
                      <div className="company-address-box">
                        <div className="modal-group-signup city">
                          *
                          <input
                            type="text"
                            placeholder="시/도"
                            onChange={handleInputRecruitorValue(
                              "bAddress_city"
                            )}
                          />
                        </div>
                        <div className="modal-group-signup">
                          <input
                            type="text"
                            placeholder="시/군/구"
                            onChange={handleInputRecruitorValue(
                              "bAddress_street"
                            )}
                          />
                        </div>
                        <div className="modal-group-signup">
                          <input
                            type="text"
                            placeholder="우편번호"
                            onChange={handleInputRecruitorValue(
                              "bAddress_zipcode"
                            )}
                          />
                        </div>
                      </div>
                      <div className="modal-group-signup">
                        <input
                          type="email"
                          placeholder="회사 이메일"
                          onChange={handleInputRecruitorValue("bEmail")}
                        />
                      </div>

                      <div className="modal-group-signup">
                        <input
                          type="text"
                          placeholder="회사 전화번호"
                          onChange={handleInputRecruitorValue("phoneNum")}
                        />
                      </div>
                      <div className="modal-group-signup">
                        <input
                          type="text"
                          placeholder="직책"
                          onChange={handleInputRecruitorValue("jobTitle")}
                        />
                      </div>
                      <div className="modal-group-signup-gender">
                        <input
                          type="radio"
                          name="gender"
                          defaultChecked
                          value="남"
                          onChange={handleInputRecruitorValue("gender")}
                        />
                        남
                        <input
                          type="radio"
                          name="gender"
                          value="여"
                          onChange={handleInputRecruitorValue("gender")}
                        />
                        여
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
