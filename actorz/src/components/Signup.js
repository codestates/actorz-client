import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import server from "../apis/server";
import Loading from "../components/loading";
import { getUserInfo } from "../actions/userAction";
import AddressModal from "./AddressModal";
import { DatePicker } from "antd";
import { useMediaQuery } from "react-responsive";
import "moment/locale/ko";
import ko_KR from "antd/lib/date-picker/locale/ko_KR";
import "../styles/SignupModal.css";

const Signup = ({ handleClickSignup, handleClickSignin }) => {
  const [dob, setDob] = useState("");
  const [addr, setAddr] = useState({
    city: "",
    street: "",
    zipCode: "",
  });

  const [buttonDisable, setButtonDisable] = useState(false);

  const [actorSignup, setActorSignup] = useState({});
  const [recruiterSignup, setrecruiterSignup] = useState({});
  const [err, setError] = useState("");
  const [role, setRole] = useState("배우");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const isPcORTablet = useMediaQuery({
    query: "(min-width:768px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  const handleClickClose = () => {
    handleClickSignup(false);
    handleClickSignin(false);
  };

  const handleInputActorValue = (key) => (event) => {
    setActorSignup({ ...actorSignup, [key]: event.target.value });
  };

  const handleInputrecruiterValue = (key) => (event) => {
    setrecruiterSignup({ ...recruiterSignup, [key]: event.target.value });
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

  const isValidEmail = (mail) => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
    ) {
      return true;
    }
    return false;
  };

  const handleClickActorSignupBtn = async () => {
    setLoading(true);
    setButtonDisable(true);
    const { email, password, name, company, gender } = actorSignup;
    try {
      if (email && password && name && dob) {
        if (!isValidEmail(email)) {
          Modal.warning({
            maskClosable: true,
            mask: true,
            maskStyle: { width: "200%", height: "200%" },
            style: { maxWidth: "20rem", top: "35%" },
            content: (
              <>
                <div style={{ textAlign: "left" }}>
                  이메일 형식이 맞지 않습니다.
                </div>
                <div style={{ textAlign: "left", paddingLeft: "2.5rem" }}>
                  다시 시도해주세요.
                </div>
              </>
            ),
            getContainer: "#modal-container",
          });
          setLoading(false);
          setButtonDisable(false);
          return;
        } else if (password.length < 9 || password.length > 20) {
          setLoading(false);
          Modal.warning({
            maskClosable: true,
            mask: true,
            maskStyle: { width: "200%", height: "200%" },
            style: { maxWidth: "20rem", top: "35%" },
            content: (
              <>
                <div style={{ textAlign: "left" }}>
                  비밀번호 자리수는 9 ~ 20 사이로 맞춰주세요.
                </div>
                <div style={{ textAlign: "left", paddingLeft: "2.5rem" }}>
                  다시 시도해주세요.
                </div>
              </>
            ),
            getContainer: "#modal-container",
          });
          setButtonDisable(false);
          setLoading(false);
          return;
        }
        setError("");
        await server
          .post(`/signup`, {
            provider: "local",
            email: email,
            password: password,
            name: name,
            company: company,
            gender: setGender(gender),
            dob: dob,
            role: setrole(role),
          })
          .then(async (res) => {
            if (res.status === 201) {
              localStorage.setItem("accessToken", res.data.data.accessToken);
              localStorage.setItem("id", res.data.data.id);

              await server
                .get(`/user/${localStorage.getItem("id")}`, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      "accessToken"
                    )}`,
                  },
                })
                .then((res) => {
                  if (res.status === 200) {
                    dispatch(
                      getUserInfo({
                        ...res.data.data.userInfo,
                        dob: res.data.data.userInfo.dob
                          .toString()
                          .split("T")[0],
                      })
                    );
                    Modal.success({
                      content: "회원가입에 성공하였습니다!",
                    });
                  }
                })
                .catch((err) => {
                  setLoading(false);
                  throw err;
                });
              setLoading(false);
              handleClickClose();
            }
          });
      } else {
        setButtonDisable(false);
        setLoading(false);
        setError("필수 항목을 모두 적어주세요");
      }
    } catch (err) {
      setButtonDisable(false);
      setLoading(false);
      if (err.message === "Request failed with status code 409") {
        Modal.warning({
          maskClosable: true,
          mask: true,
          maskStyle: { width: "200%", height: "200%" },
          style: { maxWidth: "20rem", top: "35%" },
          content: (
            <>
              <div style={{ textAlign: "left" }}>
                이미 존재하는 이메일 입니다.
              </div>
              <div style={{ textAlign: "left", paddingLeft: "2.5rem" }}>
                다른 이메일로 시도해주세요.
              </div>
            </>
          ),
          getContainer: "#modal-container",
        });
      } else {
        Modal.warning({
          maskClosable: true,
          mask: true,
          maskStyle: { width: "200%", height: "200%" },
          style: { maxWidth: "20rem", top: "35%" },
          content: (
            <>
              <div style={{ textAlign: "left" }}>
                예상치 못한 오류가 발생했습니다.
              </div>
              <div style={{ textAlign: "left", paddingLeft: "2.5rem" }}>
                잠시 후 다시 이용해주세요
              </div>
            </>
          ),
          getContainer: "#modal-container",
        });
      }
    }
    setButtonDisable(false);
  };

  const handleClickrecruiterSignupBtn = async () => {
    setButtonDisable(true);
    setLoading(true);
    const { email, password, name, gender, bName, bEmail, phoneNum, jobTitle } =
      recruiterSignup;

    try {
      if (
        email &&
        password &&
        name &&
        dob &&
        bName &&
        addr.city &&
        addr.street &&
        addr.zipCode
      ) {
        if (!isValidEmail(email)) {
          Modal.warning({
            maskClosable: true,
            mask: true,
            className: "modal-warning-signup-position",
            maskStyle: { width: "200%", height: "200%" },
            style: {
              top: "35%",
              maxWidth: "20rem",
            },
            content: (
              <>
                <div style={{ textAlign: "left" }}>
                  이메일 형식이 맞지 않습니다.
                </div>
                <div style={{ textAlign: "left", paddingLeft: "2.5rem" }}>
                  다시 시도해주세요.
                </div>
              </>
            ),
            getContainer: "#modal-container",
          });
          setLoading(false);
          setButtonDisable(false);
          return;
        } else if (password.length < 9 || password.length > 20) {
          <Modal className></Modal>;
          setLoading(false);
          Modal.warning({
            maskClosable: true,
            mask: true,
            className: "modal-warning-signup-position",
            maskStyle: { width: "200%", height: "200%" },
            style: { maxWidth: "20rem", top: "35%" },
            content: (
              <>
                <div style={{ textAlign: "left" }}>
                  비밀번호 자리수는 9 ~ 20 사이로 맞춰주세요.
                </div>
                <div style={{ textAlign: "left", paddingLeft: "2.5rem" }}>
                  다시 시도해주세요.
                </div>
              </>
            ),
            getContainer: "#modal-container",
          });
          setLoading(false);
          setButtonDisable(false);
          return;
        }
        setError("");
        await server
          .post(`/signup`, {
            email: email,
            password: password,
            name: name,
            provider: "local",
            gender: setGender(gender),
            dob: dob,
            recruiter: {
              bName: bName,
              bAddress: {
                ...addr,
              },
              bEmail: bEmail,
              phoneNum: phoneNum,
              jobTitle: jobTitle,
            },
            role: setrole(role),
          })
          .then(async (res) => {
            if (res.status === 201) {
              localStorage.setItem("accessToken", res.data.data.accessToken);
              localStorage.setItem("id", res.data.data.id);

              await server
                .get(`/user/${localStorage.getItem("id")}`, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      "accessToken"
                    )}`,
                  },
                })
                .then((res) => {
                  if (res.status === 200) {
                    dispatch(
                      getUserInfo({
                        ...res.data.data.userInfo,
                        dob: res.data.data.userInfo.dob
                          .toString()
                          .split("T")[0],
                      })
                    );
                  }
                  handleClickClose();
                  Modal.success({
                    content: "회원가입에 성공하였습니다!",
                  });
                })
                .catch((err) => {
                  setButtonDisable(false);
                  setLoading(false);
                  throw err;
                });

              setLoading(false);
              setButtonDisable(false);
              handleClickClose();
            }
          });
      } else {
        setButtonDisable(false);
        setLoading(false);
        setError("필수 항목을 모두 적어주세요");
      }
    } catch {
      setButtonDisable(false);
      setLoading(false);
      Modal.warning({
        maskClosable: true,
        mask: true,
        maskStyle: { width: "200%", height: "200%" },
        style: { maxWidth: "20rem", top: "35%" },
        content: (
          <>
            <div style={{ textAlign: "left" }}>
              예상치 못한 오류가 발생했습니다.
            </div>
            <div style={{ textAlign: "left", paddingLeft: "2.5rem" }}>
              잠시 후 다시 이용해주세요
            </div>
          </>
        ),
        getContainer: "#modal-container",
      });
    }
    setButtonDisable(false);
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
      {isPcORTablet && (
        <center>
          <form onSubmit={(e) => e.preventDefault()}>
            <div id="modal-background" onClick={() => handleClickClose()}>
              <div
                id="modal-container"
                className="modal-get-container"
                onClick={(event) => event.stopPropagation()}
              >
                <div id="modal-header"></div>
                <div id="modal-section">
                  <div className="modal-title">
                    <div className="title">
                      <div style={{ paddingTop: "2rem", marginTop: "2rem" }}>
                        Sign Up{" "}
                      </div>
                      <CloseOutlined
                        className="closeBtn"
                        onClick={handleClickClose}
                        style={{ paddingBottom: "4rem" }}
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
                      <div className="modal-group-signup-align-center">
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
                      </div>
                      <div className="modal-group-signup-align-center">
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
                      </div>
                      <div className="modal-group-signup-align-center">
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
                      </div>
                      <div className="modal-group-signup-align-center">
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
                      </div>
                      <div className="modal-group-signup-align-center">
                        <div className="modal-group-signup" style={{}}>
                          <div className="importEffect">*</div>
                          <div
                            style={{
                              width: "16rem",
                              fontSize: "0.8rem",
                            }}
                          >
                            <div style={{ alignContent: "start" }}>
                              <DatePicker
                                locale={ko_KR}
                                placeholder="생년월일"
                                popupStyle={{
                                  position: "relative",
                                  width: "fit-content",
                                  top: "10em",
                                }}
                                getPopupContainer={(triggerNode) => {
                                  return triggerNode.parentNode;
                                }}
                                onChange={(date, dateString) => {
                                  setDob(date);
                                }}
                                style={{ maxWidth: "92%" }}
                              ></DatePicker>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="modal-group-signup-gender"
                        style={{ margin: "1rem 0 1rem" }}
                      >
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
                        disabled={buttonDisable}
                        className="btn-login"
                        type="submit"
                        onClick={handleClickActorSignupBtn}
                        style={{ marginLeft: "0.4rem" }}
                      >
                        <div className="settingBtn">
                          회원가입
                          <div className="loading">
                            {loading ? <Loading /> : ""}
                          </div>
                        </div>
                      </button>
                      <div className="signUpbtnPosition">
                        <div>
                          <div className="movetoSignUp">
                            {" "}
                            아직 계정이 없으십니까?
                          </div>
                          <div
                            className="movetoSignUpBtn"
                            onClick={() => {
                              handleClickSignup(false);
                              handleClickSignin(true);
                            }}
                          >
                            로그인 하러 하기
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="moreInfo">
                        <div className="modal-group-signup-align-center">
                          <div className="modal-group-signup">
                            <div className="importEffect">*</div>
                            <div>
                              <input
                                type="email"
                                placeholder="이메일"
                                onChange={handleInputrecruiterValue("email")}
                              />
                            </div>
                          </div>
                          <div className="modal-group-signup">
                            <div className="importEffect">*</div>
                            <div>
                              <input
                                type="password"
                                placeholder="비밀번호"
                                onChange={handleInputrecruiterValue("password")}
                              />
                            </div>
                          </div>
                          <div className="modal-group-signup">
                            <div className="importEffect">*</div>
                            <div>
                              <input
                                type="text"
                                placeholder="이름"
                                onChange={handleInputrecruiterValue("name")}
                              />
                            </div>
                          </div>
                          <div className="modal-group-signup" style={{}}>
                            <div className="importEffect">*</div>
                            <div
                              style={{
                                width: "16rem",
                                fontSize: "0.8rem",
                              }}
                            >
                              <div style={{ alignContent: "start" }}>
                                <DatePicker
                                  locale={ko_KR}
                                  placeholder="생년월일"
                                  popupStyle={{
                                    position: "relative",
                                    width: "fit-content",
                                    top: "10em",
                                  }}
                                  getPopupContainer={(triggerNode) => {
                                    return triggerNode.parentNode;
                                  }}
                                  onChange={(date, dateString) => {
                                    setDob(date);
                                  }}
                                  style={{ maxWidth: "92%" }}
                                ></DatePicker>
                              </div>
                            </div>
                          </div>
                          <div className="modal-group-signup">
                            <div className="importEffect">*</div>
                            <div>
                              <input
                                type="text"
                                placeholder="회사명"
                                onChange={handleInputrecruiterValue("bName")}
                              />
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "17.5rem",
                            }}
                          >
                            <AddressModal
                              isMobile={isMobile}
                              setAddr={setAddr}
                              addr={addr}
                            ></AddressModal>
                          </div>
                          <div className="modal-group-signup">
                            <div className="importEffect2">&nbsp;&nbsp;</div>
                            <div>
                              <input
                                type="email"
                                placeholder="회사 이메일"
                                onChange={handleInputrecruiterValue("bEmail")}
                              />
                            </div>
                          </div>
                          <div className="modal-group-signup">
                            <div className="importEffect">&nbsp;&nbsp;</div>
                            <div>
                              <input
                                type="tel"
                                placeholder="회사 전화번호"
                                onChange={handleInputrecruiterValue("phoneNum")}
                              />
                            </div>
                          </div>
                          <div className="modal-group-signup">
                            <div className="importEffect">&nbsp;&nbsp;</div>
                            <div>
                              <input
                                type="text"
                                placeholder="직책"
                                onChange={handleInputrecruiterValue("jobTitle")}
                              />
                            </div>
                          </div>
                          <div
                            className="modal-group-signup-gender"
                            style={{ margin: "1rem 0 1rem" }}
                          >
                            <input
                              type="radio"
                              name="gender"
                              defaultChecked
                              value="남"
                              onChange={handleInputrecruiterValue("gender")}
                            />
                            &nbsp;남
                            <input type="radio" name="gender" value="여" />
                            &nbsp;여
                          </div>
                          {err ? (
                            <div className="err-message">{err}</div>
                          ) : null}
                          <button
                            disabled={buttonDisable}
                            className="btn-login"
                            type="submit"
                            onClick={handleClickrecruiterSignupBtn}
                            style={{ margin: "1rem 0 1.5rem 0.4rem" }}
                          >
                            <div className="settingBtn">
                              회원가입
                              <div className="loading">
                                {loading ? <Loading /> : ""}
                              </div>
                            </div>
                          </button>
                        </div>
                        <div
                          className="signUpbtnPosition2"
                          style={{ marginBottom: "1rem" }}
                        >
                          <div>
                            <div className="movetoSignUp">
                              {" "}
                              아직 계정이 없으십니까?
                            </div>
                            <div
                              className="movetoSignUpBtn"
                              onClick={() => {
                                handleClickSignup(false);
                                handleClickSignin(true);
                              }}
                            >
                              로그인 하러 하기
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </form>
        </center>
      )}
      {isMobile && (
        <center>
          <form onSubmit={(e) => e.preventDefault()}>
            <div id="modal-background">
              <div id="modal-container-mobile2">
                <CloseOutlined
                  className="closeBtn-mobile"
                  onClick={handleClickClose}
                />
                <div
                  id="modal-container-mobile1"
                  className="modal-get-container"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div id="modal-section">
                    <div className="modal-title">
                      <div className="title-mobile">
                        <div style={{ paddingTop: "1rem" }}>Sign Up </div>
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
                        <div className="modal-group-signup-align-center">
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
                        </div>
                        <div className="modal-group-signup-align-center">
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
                        </div>
                        <div className="modal-group-signup-align-center">
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
                        </div>
                        <div className="modal-group-signup-align-center">
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
                        </div>
                        <div className="modal-group-signup-align-center">
                          <div className="modal-group-signup" style={{}}>
                            <div className="importEffect">*</div>
                            <div
                              style={{
                                width: "16rem",
                                fontSize: "0.8rem",
                              }}
                            >
                              <div style={{ alignContent: "start" }}>
                                <DatePicker
                                  locale={ko_KR}
                                  placeholder="생년월일"
                                  popupStyle={{
                                    position: "relative",
                                    width: "100%",
                                    top: "10em",
                                  }}
                                  getPopupContainer={(triggerNode) => {
                                    return triggerNode.parentNode;
                                  }}
                                  onChange={(date, dateString) => {
                                    setDob(date);
                                  }}
                                  style={{ maxWidth: "92%" }}
                                ></DatePicker>
                              </div>
                            </div>
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
                          {err ? (
                            <div className="err-message">{err}</div>
                          ) : null}
                        </div>
                        <button
                          disabled={buttonDisable}
                          className="btn-login"
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
                        <div className="signUpbtnPosition2">
                          <div>
                            <div className="movetoSignUp">
                              {" "}
                              아직 계정이 없으십니까?
                            </div>
                            <div
                              className="movetoSignUpBtn"
                              onClick={() => {
                                handleClickSignup(false);
                                handleClickSignin(true);
                              }}
                            >
                              로그인 하러 하기
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="moreInfo">
                          <div className="modal-group-signup-align-center">
                            <div className="modal-group-signup">
                              <div className="importEffect">*</div>
                              <div>
                                <input
                                  type="email"
                                  placeholder="이메일"
                                  onChange={handleInputrecruiterValue("email")}
                                />
                              </div>
                            </div>
                            <div className="modal-group-signup">
                              <div className="importEffect">*</div>
                              <div>
                                <input
                                  type="password"
                                  placeholder="비밀번호"
                                  onChange={handleInputrecruiterValue(
                                    "password"
                                  )}
                                />
                              </div>
                            </div>
                            <div className="modal-group-signup">
                              <div className="importEffect">*</div>
                              <div>
                                <input
                                  type="text"
                                  placeholder="이름"
                                  onChange={handleInputrecruiterValue("name")}
                                />
                              </div>
                            </div>
                            <div className="modal-group-signup" style={{}}>
                              <div className="importEffect">*</div>
                              <div
                                style={{
                                  width: "16rem",
                                  fontSize: "0.8rem",
                                }}
                              >
                                <div style={{ alignContent: "start" }}>
                                  <DatePicker
                                    locale={ko_KR}
                                    placeholder="생년월일"
                                    popupStyle={{
                                      position: "relative",
                                      width: "fit-content",
                                      top: "10em",
                                    }}
                                    getPopupContainer={(triggerNode) => {
                                      return triggerNode.parentNode;
                                    }}
                                    onChange={(date, dateString) => {
                                      setDob(date);
                                    }}
                                    style={{ maxWidth: "92%" }}
                                  ></DatePicker>
                                </div>
                              </div>
                            </div>
                            <div className="modal-group-signup">
                              <div className="importEffect">*</div>
                              <div>
                                <input
                                  type="text"
                                  placeholder="회사명"
                                  onChange={handleInputrecruiterValue("bName")}
                                />
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "17.5rem",
                              }}
                            >
                              <AddressModal
                                isMobile={isMobile}
                                setAddr={setAddr}
                                addr={addr}
                              ></AddressModal>
                            </div>
                            <div className="modal-group-signup">
                              <div className="importEffect2">&nbsp;&nbsp;</div>
                              <div>
                                <input
                                  type="email"
                                  placeholder="회사 이메일"
                                  onChange={handleInputrecruiterValue("bEmail")}
                                />
                              </div>
                            </div>
                            <div className="modal-group-signup">
                              <div className="importEffect">&nbsp;&nbsp;</div>
                              <div>
                                <input
                                  type="tel"
                                  placeholder="회사 전화번호"
                                  onChange={handleInputrecruiterValue(
                                    "phoneNum"
                                  )}
                                />
                              </div>
                            </div>
                            <div className="modal-group-signup">
                              <div className="importEffect">&nbsp;&nbsp;</div>
                              <div>
                                <input
                                  type="text"
                                  placeholder="직책"
                                  onChange={handleInputrecruiterValue(
                                    "jobTitle"
                                  )}
                                />
                              </div>
                            </div>
                            <div className="modal-group-signup-gender">
                              <input
                                type="radio"
                                name="gender"
                                defaultChecked
                                value="남"
                                onChange={handleInputrecruiterValue("gender")}
                              />
                              &nbsp;남
                              <input type="radio" name="gender" value="여" />
                              &nbsp;여
                            </div>
                            {err ? (
                              <div className="err-message">{err}</div>
                            ) : null}
                            <button
                              disabled={buttonDisable}
                              className="btn-login"
                              type="submit"
                              onClick={handleClickrecruiterSignupBtn}
                            >
                              <div className="settingBtn">
                                회원가입
                                <div className="loading">
                                  {loading ? <Loading /> : ""}
                                </div>
                              </div>
                            </button>
                          </div>
                          <div className="signUpbtnPosition2">
                            <div>
                              <div className="movetoSignUp">
                                {" "}
                                아직 계정이 없으십니까?
                              </div>
                              <div
                                className="movetoSignUpBtn"
                                onClick={() => {
                                  handleClickSignup(false);
                                  handleClickSignin(true);
                                }}
                              >
                                로그인 하러 하기
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </center>
      )}
    </>
  );
};
export default Signup;
