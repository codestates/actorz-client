import React from "react";
import { useSelector } from "react-redux";
import image1 from "../images/1.jpg";
import image2 from "../images/2.jpg";
import image3 from "../images/3.jpg";
import profile from "../images/profile.png";
import love from "../images/thumb-up.png";
import email from "../images/email.png";
import video from "../images/video.mp4";
import Nav from "../components/Nav";
import heart from "../images/heart.png";
import "../styles/Post.css";
const Post = ({ handleClickPost }) => {
  return (
    <>
      <Nav />
      <div id="post-modal-background" onClick={() => handleClickPost(false)}>
        <div className="float-btn-box">
          <div className="float-btn">
            <img src={profile} className="float-profile-btn"></img>
            <div className="float-profile-title">프로필</div>
          </div>
          <div className="float-btn">
            <img src={love} className="float-love-btn"></img>
            <div className="float-love-title">좋아요</div>
          </div>
          <div className="float-btn">
            <img src={email} className="float-email-btn"></img>
            <div className="float-email-title">연락하기</div>
          </div>
        </div>
        <div className="container">
          <div className="info">
            <div className="info-box">
              <div className="post-name">Kimcoding</div>
              <img src={heart} className="heart-img"></img>
              <span className="genre">| 공포, 스릴러</span>
              <span className="like">31</span>
            </div>
            <div className="img-box">
              <div className="div-img">
                <img
                  src="https://media.vlpt.us/images/iooi75/post/a0e76905-5ec8-4bcc-8d64-2db0a6e6e168/image.png"
                  className="post-image"
                  alt="이미지"
                ></img>
              </div>
              <div className="imgg">
                <img src={image2} className="post-image" alt="이미지"></img>
              </div>
              <div className="imgg">
                <img src={image3} className="post-image" alt="이미지"></img>
              </div>
              <div className="imgg">
                <video controls className="video">
                  <source src={video}></source>
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Post;
