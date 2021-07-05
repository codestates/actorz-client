import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Post from "../pages/Post";
import Nav from "../components/Nav";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Posts.css";
import Iconlist from "../components/Iconlist";
import { DeleteOutlined } from "@ant-design/icons";
import Footer from "../components/Footer";

const Posts = () => {
  const [clickModal, setClickModal] = useState(false);
  //console.log(user);
  const user = useSelector((user) => user.userInfoReducer);
  const post = useSelector((post) => post.postInfoReducer);
  //console.log(post);

  useEffect(() => {
    console.log(user);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    pauseOnHover: true,
    autoplay: true,
    draggable: false,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: true,
  };

  const handleClickPost = (boolean, id) => {
    if (boolean) {
      setClickModal(true);
      window.history.pushState(null, "", `/post/${id}`);
    } else {
      setClickModal(false);
      window.history.pushState(null, "", `/posts`);
    }
  };

  return (
    <>
      <div className="blockhere"> </div>
      <div className="mainPage">
        <Nav />
        <Iconlist />

        <div className="newblockPosition"> </div>

        <div className="middleSpace">
          <div className="midContents">
            <div className="midContentDownPart">
              <div className="displayPosition">
                <div className="fixedSize">
                  <img
                    src="https://media.vlpt.us/images/iooi75/post/a0e76905-5ec8-4bcc-8d64-2db0a6e6e168/image.png"
                    className="testPic"
                  />
                </div>

                <div className="fixedContent">
                  <p className="name">{user.data.userInfo.name}</p>
                  <ul>
                    <strong>생년월일</strong>
                    <li className="dob">{user.data.userInfo.dob}</li>
                    <strong>이메일</strong>
                    <li className="email">{user.data.userInfo.email}</li>
                    <strong>소속사</strong>
                    <li className="company">{user.data.userInfo.company}</li>
                  </ul>
                </div>
              </div>
              {/* 영화랑 드라마 경력 나눌꺼면 여기서 */}
              <div className="careerTitle">Career 🏆</div>
              <div className="careerContent">
                <div className="career">
                  {user.data.userInfo.careers.map((career) => {
                    return (
                      <li>
                        {`${career.year}` +
                          ` ${career.title}` +
                          ` / ` +
                          `${career.type.map((type) => {
                            return type;
                          })}`}
                      </li>
                    );
                  })}
                </div>
              </div>
              <div className="slider-img-box">
                {/* {
                  <Slider {...settings} className="slider">
                    {post.data.posts.map((post) => {
                      console.log(post.path[0].path);
                      return (
                        <img
                          src={post.path[0].path}
                          onClick={() => handleClickPost(true, post.id)}
                        ></img>
                      );
                    })}
                  </Slider>
                } */}
              </div>

              {clickModal ? <Post handleClickPost={handleClickPost} /> : null}
            </div>
          </div>
        </div>
        <div className="newblockPosition2"> </div>

        <div className="rightSpace">
          <div className="iconList2"> </div>
        </div>
      </div>
      <Footer />

      {/* <Nav />
      <div id="post-container1"></div>
      <div id="post-title">Actor</div>
      <div id="container">
        <img src={img} className="img" alt="프로필"></img>
        <span id="post-info">
          <p className="name">{user.data.userInfo.name}</p>
          <ul>
            <strong>생년월일</strong>
            <li className="dob">{user.data.userInfo.dob}</li>
            <strong>이메일</strong>
            <li className="email">{user.data.userInfo.email}</li>
            <strong>소속사</strong>
            <li className="company">{user.data.userInfo.company}</li>
          </ul>
        </span>
      </div>
      <span className="post-career">
        {user.data.userInfo.careers.map((career) => {
          return (
            <li>
              {`${career.year}` +
                ` ${career.title}` +
                ` / ` +
                `${career.type.map((type) => {
                  return type;
                })}`}
            </li>
          );
        })}
      </span>
      {
        <Slider {...settings} className="slider">
          {post.data.posts.map((post) => {
            return (
              <img
                src={post.path}
                onClick={() => handleClickPost(true, post.id)}
              ></img>
            );
          })}
        </Slider>
      }
      {clickModal ? <Post handleClickPost={handleClickPost} /> : null} */}
    </>
  );
};
export default Posts;
