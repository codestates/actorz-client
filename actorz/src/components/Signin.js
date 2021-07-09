import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../actions/userAction";
import server from "../apis/server";
import Google from "../components/Googlelogin";
import { CloseOutlined } from "@ant-design/icons";
import Naver from "../components/Naverlogin";
import Loading from "../components/loading";
import "../styles/SigninModal.css";

const Signin = ({ handleClickSignin, handleClickSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((user) => user.userInfoReducer);
  const dispatch = useDispatch();

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
        await server //로그인
          .post(`/login`, {
            email: email.email,
            password: password.password,
          })
          .then((res) => {
            if (res.status === 200) {
              localStorage.setItem("accessToken", res.data.data.accessToken);
              localStorage.setItem("id", res.data.data.id);
              console.log("로그인에 성공하였습니다!");
              setLoading(false);
              handleClickClose();
            }
          });

        await server //로그인한 유저의 정보를 state에 저장
          .get(`/user/${localStorage.getItem("id")}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              dispatch(getUserInfo(res.data.data.userInfo));
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
        alert("등록되지 않은 회원이거나 잘못된 비밀번호 입니다");
      } else {
        alert("예상치 못한 오류가 발생했습니다. 잠시 후 다시 이용해주세요");
      }
    }
  };

  const handleClickClose = () => {
    handleClickSignin(false);
  };

  return (
    <>
      <center>
        <form onSubmit={(e) => e.preventDefault()}>
          <div id="modal-background" onClick={() => handleClickClose()}>
            <div
              id="modal-container"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="buttonHeader"></div>

              <div className="modalCancleBtn"></div>
              <div className="modal-title">
                <div className="title">
                  <div>Sign In </div>

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
              <div>{err ? <div className="err-message">{err}</div> : null}</div>
              <div className="modalButtonPosition">
                <div className="loginBtnPosition">
                  <button
                    className="btn-login login"
                    type="submit"
                    onClick={handleClickSigninBtn}
                  >
                    <div className="settingBtn">
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
                    <div className="movetoSignUp"> 아직 계정이 없으십니까?</div>
                    <div
                      className="movetoSignUpBtn"
                      onClick={() => handleClickSignup(true)}
                    >
                      회원가입 하러 하기
                    </div>
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
