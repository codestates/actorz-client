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
import img from "../../images/search.png";
import { Input, Col, Row, Select } from "antd";

const ResponsiveApp = () => {
  const user = useSelector((user) => user.userInfoReducer);
  const [loading, setLoading] = useState(false);
  const [clickSignin, setClickSignin] = useState(false);
  const [clickSignup, setClickSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [age, setAge] = useState("");

  const dispatch = useDispatch();
  const { Option } = Select;

  useEffect(async () => {
    try {
      if (Number(age) === 50) {
        await server
          .get(`post/search?name=${name}&content=${content}`)
          .then((res) => {
            dispatch(getAllPostInfo(res.data.data));
          });
      } else {
        await server
          .get(`post/search?name=${name}&content=${content}&age=${age}`)
          .then((res) => {
            dispatch(getAllPostInfo(res.data.data));
          });
      }
    } catch (err) {
      throw err;
    }
  }, [name, content, age]);

  const handleInputValue = (key) => (event) => {
    console.log(event);
    if (key === "name") {
      setName(event.target.value);
    } else if (key === "conent") {
      setContent(event.target.value);
    } else if (key === "age") {
      setAge(event);
    }
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
              <Popover
                className="searchResponsive"
                placement="bottomRight"
                trigger="click"
                content={
                  <>
                    <Input.Group>
                      <Row gutter={8}>
                        <Col span={21}>
                          <Input
                            onChange={handleInputValue("name")}
                            placeholder="이름"
                          />
                        </Col>
                      </Row>
                      <Row gutter={8}>
                        <Col span={21}>
                          <Input
                            onChange={handleInputValue("conent")}
                            placeholder="내용"
                          />
                        </Col>
                      </Row>
                    </Input.Group>
                    <Input.Group compact>
                      <Select
                        defaultValue="50"
                        onChange={handleInputValue("age")}
                      >
                        <Option value="10" name="age">
                          ~10대
                        </Option>
                        <Option value="20" name="age">
                          20대
                        </Option>
                        <Option value="30" name="age">
                          30대
                        </Option>
                        <Option value="40" name="age">
                          40대~
                        </Option>
                        <Option value="50" name="age">
                          전체
                        </Option>
                      </Select>
                    </Input.Group>
                  </>
                }
              >
                <img src={img} className="res-search-img"></img>
              </Popover>
            </div>

            <div className="responsiveAvatar">
              {localStorage.getItem("accessToken") ? (
                <Popover
                  overlayClassName="ant-popover"
                  placement="bottom"
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
                  <Avatar
                    size={30}
                    icon={<UserOutlined />}
                    src={user.data.userInfo.mainPic}
                  />
                </Popover>
              ) : (
                <Popover
                  overlayClassName="ant-popover"
                  placement="bottom"
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
