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
import { getAllPostInfo } from "../../actions/postAction";
import { Input, Col, Row, Select } from "antd";
import "../../styles/ResponsiveNav.css";

const ResponsiveApp = () => {
  const user = useSelector((user) => user.userInfoReducer);
  const [loading, setLoading] = useState(false);
  const [clickSignin, setClickSignin] = useState(false);
  const [clickSignup, setClickSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [age, setAge] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { Option } = Select;

  useEffect(async () => {
    try {
      await server
        .get(`post/search?name=&content=${search}&age=`)
        .then((res) => {
          dispatch(getAllPostInfo(res.data.data));
        });
    } catch (err) {
      throw err;
    }
  }, [search]);

  const handleInputValue = (event) => {
    setSearch(event.target.value);
  };

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

  const handleClickSignin = (bool) => {
    setClickSignin(bool);
  };

  const handleClickSignup = (bool) => {
    setClickSignup(bool);
  };

  const inputHandler = (event) => {
    setSearch(event.target.value);
  };

  const handleClickSearchBtn = async () => {
    try {
      await server
        .get(`post/search?name=&content=${search}&age=`)
        .then((res) => {
          dispatch(getAllPostInfo(res.data.data));
        });
    } catch (err) {
      throw err;
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
            <div>
              <input
                className="product-search"
                value={search}
                placeholder="  search..."
                onChange={handleInputValue}
              ></input>
            </div>
            <div className="responsiveAvatar">
              {localStorage.getItem("accessToken") ? (
                <Popover
                  content={
                    <>
                      <button
                        onClick={handleClicklogout}
                        className="nav-btn-logout"
                      >
                        로그아웃
                      </button>
                    </>
                  }
                  trigger="click"
                >
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
              isMobile={true}
              handleClickSignin={handleClickSignin}
              handleClickSignup={handleClickSignup}
            />
          ) : null}
          {clickSignup ? (
            <Signup
              isMobile={true}
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
