import React, { useState } from "react";
import { useSelector } from "react-redux";
import Nav from "../components/Nav";
import PostEdit from "./PostEdit";
import profile from "../images/profile.png";
import love from "../images/thumb-up.png";
import email from "../images/email.png";
import heart from "../images/heart.png";
import "../styles/Post.css";

const Post = ({ handleClickPost }) => {
  const [isEdit, setIsEdit] = useState(false);
  const post = useSelector((post) => post.postInfoReducer);

  const handleClickEditBtn = (boolean) => {
    if (boolean) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };

  return (
    <>
      <Nav />
      {!isEdit ? (
        <div id="post-modal-background">
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
            <div className="float-btn">
              <img
                src={email}
                className="float-edit-btn"
                onClick={() => handleClickEditBtn(true)}
              ></img>
              <div className="float-email-title">수정하기</div>
            </div>
          </div>
          <div className="container">
            <div className="info">
              <div className="info-box">
                <div className="post-name">Kimcoding</div>
                <img src={heart} className="heart-img"></img>
                <span className="genre">
                  |{" "}
                  {post.data.posts[0].genre.map((genre) => {
                    return `${genre},`;
                  })}
                </span>
                <span className="like">{post.data.posts[0].likes.length}</span>
                <button
                  className="delete-btn"
                  onClick={() => handleClickPost(false)}
                >
                  X
                </button>
                <span className="desc">{post.data.posts[0].content}</span>
              </div>
              <div className="img-box">
                <div className="div-img">
                  {post.data.posts[0].path.map((img) => {
                    var fileExt = img.path.substring(
                      img.path.lastIndexOf(".") + 1
                    );
                    if (
                      fileExt === "png" ||
                      fileExt === "jpg" ||
                      fileExt === "jpeg"
                    ) {
                      return (
                        <>
                          <img
                            src="https://media.vlpt.us/images/iooi75/post/a0e76905-5ec8-4bcc-8d64-2db0a6e6e168/image.png"
                            className="post-image"
                            alt="이미지"
                          ></img>
                        </>
                      );
                    } else if (fileExt === "mp4") {
                      return (
                        <>
                          <video controls className="video">
                            <source src={img.path}></source>
                          </video>
                        </>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PostEdit
          handleClickPost={handleClickPost}
          handleClickEditBtn={handleClickEditBtn}
        />
      )}
    </>
  );
};
export default Post;
