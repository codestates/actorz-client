import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Signin from "./Signin";
import Signup from "./Signup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Popover } from "antd";
import server from "../apis/server";
import { persistor } from "../store/store";
import Loading from "../components/loading";
import { getAllPostInfo } from "../actions/postAction";
import { Input, Col, Row, Select } from "antd";
import "antd/dist/antd.css";
import "../styles/Nav.css";
import "../styles/Search.css";

const { Option } = Select;

const Nav = () => {
  const user = useSelector((user) => user.userInfoReducer);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [clickSignin, setClickSignin] = useState(false);
  const [clickSignup, setClickSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [age, setAge] = useState("");

  const inputHandler = (event) => {
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
          localStorage.removeItem("id");
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
    setSearch("");
  };

  return (
    <>
      {!loading ? (
        <div id="nav">
          <div className="search">
            <div>
              <Link to="/">
                <img
                  alt=""
                  src="https://media.vlpt.us/images/iooi75/post/f8c2abf6-7870-4347-b971-2a4b5a5ecdc5/Screen%20Shot%202021-06-28%20at%203.13.02%20PM.png"
                  className="headerLogo"
                />
              </Link>
            </div>

            <div className="searchTotalNav">
              <input
                className="product-search-pc"
                value={search}
                placeholder="  search..."
                onChange={(e) => inputHandler(e)}
              ></input>
              <Button
                variant="outlined"
                className="product-search-btn"
                onClick={handleClickSearchBtn}
              >
                검색
              </Button>
              <Popover
                placement="bottomLeft"
                trigger="click"
                content={
                  <>
                    <Input.Group>
                      <Row gutter={8} className="row">
                        <Col span={21}>
                          <Input
                            className="input"
                            onChange={handleInputValue("name")}
                            placeholder="이름"
                          />
                        </Col>
                      </Row>
                      <Row gutter={8} className="row">
                        <Col span={21}>
                          <Input
                            className="input"
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
                <Button variant="outlined" className="product-search-btn">
                  조건검색
                </Button>
              </Popover>
            </div>

            {user.isLogin ? (
              <div className="signBtnPosition">
                <Button
                  variant="outlined"
                  className="navSignInBtn2"
                  onClick={handleClicklogout}
                >
                  logout
                </Button>
              </div>
            ) : (
              <div className="signBtnPosition">
                <Button
                  variant="outlined"
                  className="navSignInBtn"
                  onClick={() => handleClickSignin(true)}
                >
                  로그인
                </Button>
                &nbsp;
                <Button
                  variant="outlined"
                  className="navSignInBtn"
                  onClick={() => handleClickSignup(true)}
                >
                  회원가입
                </Button>
              </div>
            )}
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

export default Nav;
