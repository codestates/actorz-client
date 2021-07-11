import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";

import server from "../apis/server";
import Loading from "../components/loading";
import { getUserInfo } from "../actions/userAction";
import { redirectUri } from "../config";

import "../styles/SignupModal.css";

const SocialSignup = ({ oauthSignup, modalSocialClose }) => {
  
  // console.log(oauthSignup)
  const [provider, email] = oauthSignup.split("=");
  const [actorSignup, setActorSignup] = useState({});
  const [recruitorSignup, setRecruitorSignup] = useState({});
  const [err, setError] = useState("");
  const [role, setRole] = useState("배우");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


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

  const setrole = (role) => {
    if (role === "배우") {
      return "actor";
    } else if (role === "리크루터") {
      return "recruiter";
    }
  };

  const handleClickActorSignupBtn = async () => {
    setLoading(true);
    const { name, dob, company, gender } = actorSignup;
    try {
      if (
        name !== undefined &&
        dob !== undefined
      ) {
        if (dob.length !== 10 || dob[4] !== "," || dob[7] !== ",") {
          setLoading(false);
          setError("생년월일 형식을 지켜서 작성해주세요");
        } else {
          setError("");
          await server
          .post(`/signup`, {
            email,
            provider,
            name: name,
            company: company,
            gender: setGender(gender),
            dob: dob,
            role: setrole(role),
          }).then(async res => {
            if(res.status === 201){
              localStorage.setItem("accessToken", res.data.data.accessToken);
              localStorage.setItem("id", res.data.data.id);
              console.log("로그인에 성공하였습니다!");

              await server //로그인한 유저의 정보를 state에 저장
              .get(`/user/${localStorage.getItem("id")}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
              })
              .then((res) => {
                if (res.status === 200) {
                  dispatch(getUserInfo(res.data.data.userInfo));
                  alert("회원가입에 성공하였습니다!");
                  window.location.href = redirectUri;
                }
              })
              .catch((err) => {
                setLoading(false);
                throw err;
              });
              setLoading(false);
              modalSocialClose();
            }
          });
        }
      } else {
        setLoading(false);
        setError("필수 항목을 모두 적어주세요");
      }
    } catch (err) {
      setLoading(false);
      if (err.message === "Request failed with status code 409") {
        alert("이미 존재하는 이메일입니다 \n 다른 계정으로 시도해주세요");
      } else {
        alert("예상치 못한 오류가 발생했습니다. 잠시 후 다시 이용해주세요");
      }
    }
  };

  const handleClickRecruitorSignupBtn = async () => {
    setLoading(true);
    const {
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
        name !== undefined &&
        dob !== undefined &&
        bName !== undefined &&
        bAddress_city !== undefined &&
        bAddress_street !== undefined &&
        bAddress_zipcode !== undefined
      ) {
        if (dob.length !== 10 || dob[4] !== "," || dob[7] !== ",") {
          setLoading(false);
          setError("생년월일 형식을 지켜서 작성해주세요");
        } else {
          setError("");
          await server.post(`/signup`, {
            name: name,
            email,
            provider,
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
            role: setrole(role),
          }).then(async res => {
            if(res.status === 201){
              localStorage.setItem("accessToken", res.data.data.accessToken);
              localStorage.setItem("id", res.data.data.id);
              console.log("로그인에 성공하였습니다!");

              await server //로그인한 유저의 정보를 state에 저장
              .get(`/user/${localStorage.getItem("id")}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
              })
              .then((res) => {
                if (res.status === 200) {
                  dispatch(getUserInfo(res.data.data.userInfo));
                  alert("회원가입에 성공하였습니다!");
                }
              })
              .catch((err) => {
                setLoading(false);
                throw err;
              });
              setLoading(false);
              modalSocialClose();
            }
          });
        }
      } else {
        setLoading(false);
        setError("필수 항목을 모두 적어주세요");
      }
    } catch {
      setLoading(false);
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
      <div id="modal-background" onClick={modalSocialClose}>
      <form 
      onSubmit={(e) => e.preventDefault()}
      onClick={e => e.stopPropagation()}
      >
            <div id="modal-container">
              <div id="modal-header"></div>
              <div id="modal-section">
                <div className="modal-title">
                  <div className="title">
                    <div>Sign Up </div>
                    <CloseOutlined
                      className="closeBtn"
                      onClick={modalSocialClose}
                    />
                  </div>
                </div>
                <div className="modal-welcome-message">Welcome to Actorz</div>
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
                          placeholder="생년월일 (1990,01,02)"
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
                      <input type="radio" name="gender" value="여" />
                      &nbsp;여
                    </div>
                    <div>
                      {err ? <div className="err-message">{err}</div> : null}
                    </div>
                    <button
                      className="btn-login2"
                      type="submit"
                      onClick={handleClickActorSignupBtn}
                    >
                      <div className="settingBtn">
                        회원가입
                        <div className="loading">
                          {loading ? <Loading /> : ""}
                        </div>
                      </div>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="moreInfo">
                      <div className="modal-group-signup">
                        <div className="importEffect">*</div>
                        <div>
                          <input
                            type="text"
                            placeholder="이름"
                            onChange={handleInputRecruitorValue("name")}
                          />
                        </div>
                      </div>
                      <div className="modal-group-signup">
                        <div className="importEffect">*</div>
                        <div>
                          <input
                            type="text"
                            placeholder="생년월일 (1990,01,02)"
                            onChange={handleInputRecruitorValue("dob")}
                          />
                        </div>
                      </div>
                      <div className="modal-group-signup">
                        <div className="importEffect">*</div>
                        <div>
                          <input
                            type="text"
                            placeholder="회사명"
                            onChange={handleInputRecruitorValue("bName")}
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
                              onChange={handleInputRecruitorValue(
                                "bAddress_city"
                              )}
                            />
                          </div>
                        </div>
                        <div className="modal-group-signup3">
                          <input
                            type="text"
                            placeholder="시/군/구"
                            onChange={handleInputRecruitorValue(
                              "bAddress_street"
                            )}
                          />
                        </div>
                        <div className="modal-group-signup3">
                          <input
                            type="number"
                            placeholder="우편번호"
                            onChange={handleInputRecruitorValue(
                              "bAddress_zipcode"
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
                            onChange={handleInputRecruitorValue("bEmail")}
                          />
                        </div>
                      </div>

                      <div className="modal-group-signup">
                        <div className="importEffect">&nbsp;&nbsp;</div>
                        <div>
                          <input
                            type="text"
                            placeholder="회사 전화번호"
                            onChange={handleInputRecruitorValue("phoneNumber")}
                          />
                        </div>
                      </div>

                      <div className="modal-group-signup">
                        <div className="importEffect">&nbsp;&nbsp;</div>
                        <div>
                          <input
                            type="text"
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
                          onChange={handleInputRecruitorValue("gender")}
                        />
                        &nbsp;남
                        <input type="radio" name="gender" value="여" />
                        &nbsp;여
                      </div>
                      {err ? <div className="err-message">{err}</div> : null}
                      <button
                        className="btn-login"
                        type="submit"
                        onClick={handleClickRecruitorSignupBtn}
                      >
                        <div className="settingBtn">
                          회원가입
                          <div className="loading">
                            {loading ? <Loading /> : ""}
                          </div>
                        </div>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
        </form>
      </div>
      </center>
    </>
  );
};
export default SocialSignup;
