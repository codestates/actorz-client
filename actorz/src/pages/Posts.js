import React, { useState } from "react";
import { useSelector } from "react-redux";
import Post from "../pages/Post";
import Nav from "../components/Nav";
import img from "../images/actor.jpeg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Posts.css";

const Posts = () => {
  const [clickModal, setClickModal] = useState(false);
  const user = useSelector((user) => user.userInfoReducer);
  const post = useSelector((post) => post.postInfoReducer);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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
      <Nav />
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
      {clickModal ? <Post handleClickPost={handleClickPost} /> : null}
    </>
  );
};
export default Posts;

/* 

 <Link
                to={{
                  pathname: `/post/${post.id}`,
                  state: { id: post.id },
                }}
              >
                <img src={post.path} />
              </Link>
*/
