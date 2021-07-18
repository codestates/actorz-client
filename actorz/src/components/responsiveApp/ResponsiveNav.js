import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPostInfo } from "../../actions/postAction";
import server from "../../apis/server";
import Signin from "../Signin";
import Signup from "../Signup";
import Loading from "../../components/loading";
import { Link } from "react-router-dom";
import { persistor } from "../../store/store";
import { Avatar, Popover, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import gear from "../../images/gear.png";
import { Input, Col, Row, Select } from "antd";
import "antd/dist/antd.css";
import "../../styles/ResponsiveNav.css";

const { Option } = Select;

const ResponsiveApp = () => {
  const user = useSelector((user) => user.userInfoReducer);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [clickSignin, setClickSignin] = useState(false);
  const [clickSignup, setClickSignup] = useState(false);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [age, setAge] = useState("");

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

  const handleInputSearchValue = async (event) => {
    setSearch(event.target.value);
    try {
      await server
        .get(`post/search?name=&content=${event.target.value}&age=`)
        .then((res) => {
          dispatch(getAllPostInfo(res.data.data));
        });
    } catch (err) {
      throw err;
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

  return (
    <>
      {!loading ? (
        <div id="ResponsiveNavHeader">
          <div className="search2">
            <div>
              <Link to="/">
                <div className="headerLogoResponsive">Actorz</div>
              </Link>
            </div>
            <div>
              <input
                className="product-search"
                value={search}
                placeholder="  search..."
                onChange={handleInputSearchValue}
              ></input>
              <Popover
                placement="bottom"
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
                <img src={gear} className="gear-img"></img>
              </Popover>
            </div>
            <div className="responsiveAvatar">
              {localStorage.getItem("accessToken") ? (
                <Popover
                  placement="bottomRight"
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
                  placement="bottomRight"
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
