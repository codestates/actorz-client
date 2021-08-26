import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../actions/userAction";
import server from "../apis/server";
import Google from "../components/Googlelogin";
import Naver from "../components/Naverlogin";
import Loading from "../components/loading";
import { Modal } from "antd";
import { useMediaQuery } from "react-responsive";
import { CloseOutlined } from "@ant-design/icons";
import "../styles/SigninModal.css";

const Signin = ({ handleClickSignin, handleClickSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleClickClose = () => {
    handleClickSignin(false);
  };

  const handleInputValue = (key) => (event) => {
    if (key === "email") {
      setEmail({ [key]: event.target.value });
    } else if (key === "password") {
      setPassword({ [key]: event.target.value });
    }
  };

  const handleClickSigninBtn = async () => {
    setLoading(true);
    try {
      if (email !== "" && password !== "") {
        await server
          .post(`/login`, {
            email: email.email,
            password: password.password,
          })
          .then((res) => {
            if (res.status === 200) {
              localStorage.setItem("accessToken", res.data.data.accessToken);
              localStorage.setItem("id", res.data.data.id);
              setLoading(false);
              handleClickClose();
            }
          });

        await server
          .get(`/user/${localStorage.getItem("id")}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              dispatch(
                getUserInfo({
                  ...res.data.data.userInfo,
                  dob: res.data.data.userInfo.dob.toString().split("T")[0],
                })
              );
            }
          })
          .catch((err) => {
            setLoading(false);
            throw err;
          });
      } else {
        setLoading(false);
        setError("모든 항목은 필수입니다");
      }
    } catch (err) {
      setLoading(false);
      if (err.message === "Request failed with status code 401") {
        Modal.warning({
          maskStyle: { width: "200%", height: "200%" },
          getContainer: "#modal-container",
          style: { maxWidth: "20rem", top: "4rem" },
          content: (
            <>
              <div style={{ textAlign: "left" }}>
                존재하지 않는 이메일 혹은 잘못된
              </div>
              <div style={{ textAlign: "left", paddingLeft: "2.5rem" }}>
                비밀번호 입니다.
              </div>
              <div style={{ textAlign: "left", paddingLeft: "2.5rem" }}>
                확인 후 다시 시도해주세요.
              </div>
            </>
          ),
          maskClosable: true,
        });
      } else {
        Modal.warning({
          maskStyle: { width: "200%", height: "200%" },
          getContainer: "#modal-container",
          style: { maxWidth: "20rem", top: "4rem" },
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
          maskClosable: true,
        });
      }
    }
  };

  return (
    <>
      <center>
        <form onSubmit={(e) => e.preventDefault()}>
          <div id="modal-background" onClick={() => handleClickClose()}>
            <div
              id="modal-container"
              className="modal-get-container"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="modalCancleBtn"></div>
              <div className="modal-title">
                <div className="title">
                  <div id="loginpadding-top">Login</div>

                  <CloseOutlined
                    className="closeBtn"
                    onClick={handleClickClose}
                  />
                </div>
              </div>
              <div className="modal-welcome-message">Welcome to Actorz</div>
              <div className="modal-group">
                <input
                  type="email"
                  placeholder=" 이메일"
                  onChange={handleInputValue("email")}
                />
              </div>
              <div className="modal-group">
                <input
                  type="password"
                  placeholder=" 비밀번호"
                  onChange={handleInputValue("password")}
                />
              </div>
              <div>{err ? <div className="err-message">{err}</div> : null}</div>
              <div className="modalButtonPosition">
                <div className="loginBtnPosition">
                  <button
                    className="btn-login login"
                    type="submit"
                    onClick={handleClickSigninBtn}
                  >
                    <div
                      className="settingBtn"
                      style={{ marginLeft: "0.8rem" }}
                    >
                      로그인
                      <div className="loading">
                        {loading ? <Loading /> : ""}
                      </div>
                    </div>
                  </button>
                </div>
                <div className="modalButtonPosition">
                  <div className="loginBtnPosition">
                    <Google handleClickClose={handleClickClose} />
                  </div>
                  <div className="loginBtnPosition">
                    <Naver handleClickClose={handleClickClose} />
                  </div>
                  <div className="signUpbtnPosition" id="loginpadding-bottom">
                    <div>
                      <div className="movetoSignUp">
                        아직 계정이 없으십니까?
                      </div>
                      <div
                        className="movetoSignUpBtn"
                        onClick={() => {
                          handleClickSignin(false);
                          handleClickSignup(true);
                        }}
                      >
                        회원가입 하러 하기
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </center>
      {/* {isMobile && (
        <>
          <center>
            <form onSubmit={(e) => e.preventDefault()}>
              <div id="modal-background">
                <div id="modal-container-mobile2">
                  <CloseOutlined
                    className="closeBtn-mobile"
                    onClick={handleClickClose}
                  />
                  <div
                    id="modal-container-mobile"
                    className="modal-get-container"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="modal-title">
                      <div className="title-mobile">
                        <div>Login</div>
                      </div>
                    </div>
                    <div className="modal-welcome-message">
                      Welcome to Actorz
                    </div>
                    <div className="modal-group">
                      <input
                        type="email"
                        placeholder=" 이메일"
                        onChange={handleInputValue("email")}
                      />
                    </div>
                    <div className="modal-group">
                      <input
                        type="password"
                        placeholder=" 비밀번호"
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
                          <div
                            className="settingBtn"
                            style={{ marginLeft: "0.8rem" }}
                          >
                            로그인
                            <div className="loading">
                              {loading ? <Loading /> : ""}
                            </div>
                          </div>
                        </button>
                      </div>
                      <div className="modalButtonPosition">
                        <div className="loginBtnPosition">
                          <Google handleClickClose={handleClickClose} />
                        </div>
                        <div className="loginBtnPosition">
                          <Naver handleClickClose={handleClickClose} />
                        </div>
                        <div className="signUpbtnPosition">
                          <div>
                            <div className="movetoSignUp">
                              아직 계정이 없으십니까?
                            </div>
                            <div
                              className="movetoSignUpBtn"
                              onClick={() => {
                                handleClickSignin(false);
                                handleClickSignup(true);
                              }}
                            >
                              회원가입 하러 하기
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </center>
        </>
      )} */}
    </>
  );
};
export default Signin;
