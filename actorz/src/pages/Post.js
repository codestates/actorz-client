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
  //const post = useSelector((post) => post.postInfoReducer);
  // const dispatch = useDispatch();
  // dispatch(selectPostInfo(props.history.location.state.id));

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
              <img src={image1} className="post-image" alt="이미지"></img>
              <img src={image2} className="post-image" alt="이미지"></img>
              <img src={image3} className="post-image" alt="이미지"></img>
              <video controls className="video">
                <source src={video}></source>
              </video>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Post;
