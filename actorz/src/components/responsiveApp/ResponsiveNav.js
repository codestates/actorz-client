import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import server from "../../apis/server";
import { persistor } from "../../store/store";
import Loading from "../../components/loading";
import "../../styles/ResponsiveNav.css";
import { Avatar, Button, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Signin from "../Signin";
import Signup from "../Signup";

const ResponsiveApp = () => {
  const user = useSelector((user) => user.userInfoReducer);
  const [loading, setLoading] = useState(false);
  const [clickSignin, setClickSignin] = useState(false);
  const [clickSignup, setClickSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleClicklogout = async () => {
    setLoading(true);
    await server
      .get("/logout")
      .then((res) => {
        if (res.status === 205) {
          setLoading(false);
          persistor.purge();
          console.log("logout success!");
          localStorage.removeItem("accessToken");
          window.location = "/mainpage";
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleClickSignin = () => {
    setClickSignup(false);
    if (clickSignin) {
      setClickSignin(false);
    } else {
      setClickSignin(true);
    }
  };

  const handleClickSignup = () => {
    setIsLogin(false);
    if (clickSignup) {
      setClickSignup(false);
    } else {
      setClickSignup(true);
    }
  };

  return (
    <>
      {!loading ? (
        <div id="ResponsiveNavHeader">
          <div className="search2">
            <div>
              <Link to="/">
                <div className="headerLogoResponsive"> Actorz </div>
              </Link>
            </div>
            <div className="responsiveAvatar">
              {localStorage.getItem("accessToken") ? (
                <Popover
                  content={
                    <button
                      onClick={handleClicklogout}
                      className="nav-btn-logout"
                    >
                      로그아웃
                    </button>
                  }
                  trigger="click"
                >
                  {/* 프로필 나타내는 부분 */}
                  <Avatar
                    size={30}
                    icon={<UserOutlined />}
                    src={user.data.userInfo.mainPic}
                  />
                </Popover>
              ) : (
                <Popover
                  content={
                    <>
                      <button
                        onClick={handleClickSignin}
                        className="nav-btn-login"
                      >
                        로그인
                      </button>
                      <button
                        onClick={handleClickSignup}
                        className="nav-btn-signup"
                      >
                        회원가입
                      </button>
                    </>
                  }
                  trigger="click"
                >
                  {/* 프로필 나타내는 부분 */}
                  <Avatar
                    size={30}
                    icon={<UserOutlined />}
                    src={user.data.userInfo.mainPic}
                  />
                </Popover>
              )}
            </div>
          </div>

          {clickSignin ? (
            <Signin
              handleClickSignin={handleClickSignin}
              handleClickSignup={handleClickSignup}
            />
          ) : null}
          {clickSignup ? (
            <Signup
              handleClickSignin={handleClickSignin}
              handleClickSignup={handleClickSignup}
            />
          ) : null}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ResponsiveApp;
