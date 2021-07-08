import React, { useState, useEffect } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import server from "../apis/server";
import { persistor } from "../store/store";
import Loading from "../components/loading";

const Nav = () => {
  const [search, setSearch] = useState("");
  const [clickSignin, setClickSignin] = useState(false);
  const [clickSignup, setClickSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const user = useSelector((user) => user.userInfoReducer);
  const [loading, setLoading] = useState(false);

  const inputHandler = (event) => {
    setSearch(event.target.value);
  };

  const handleClicklogout = async () => {
    setLoading(true);
    await server
      .get(`/user/logout`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.data.id !== null) {
            persistor.purge();
            console.log("logout success!");
            localStorage.removeItem("accessToken");
            window.location = "/mainpage";
          }
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

  // useEffect( async () => {
  //   //console.log('새로고침');
  //   setLoading(true);

  // })

  return (
    <>
      {!loading ? (
        <div id="nav">
          <div className="search">
            <div>
              <Link to="/">
                <img
                  src="https://media.vlpt.us/images/iooi75/post/f8c2abf6-7870-4347-b971-2a4b5a5ecdc5/Screen%20Shot%202021-06-28%20at%203.13.02%20PM.png"
                  className="headerLogo"
                />
              </Link>
            </div>

            <div className="blackNav"> </div>

            <div className="searchTotalNav">
              <input
                className="product-search"
                value={search}
                placeholder="  search..."
                onChange={(e) => inputHandler(e)}
              ></input>
              <Button variant="outlined" className="product-search-btn">
                검색
              </Button>
            </div>

            <div className="blackNav2"> </div>

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
                  onClick={handleClickSignin}
                >
                  Sign in
                </Button>
                &nbsp;
                <Button
                  variant="outlined"
                  className="navSignInBtn"
                  onClick={handleClickSignup}
                >
                  Sign up
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
