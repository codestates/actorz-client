import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Nav from "../components/Nav";
import PostEdit from "./PostEdit";
import server from "../apis/server";
import { Link } from "react-router-dom";
import profile from "../images/profile.png";
import love from "../images/thumb-up.png";
import email from "../images/email.png";
import heart from "../images/heart.png";
import "../styles/Post.css";

const Post = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const post = useSelector((post) => post.postInfoReducer);
  const [postinfo, setPostinfo] = useState({});
  const user = useSelector((user) => user.userInfoReducer);
  //console.log(post); //업데이트된 정보가 담겨있음

  let index = window.location.pathname.lastIndexOf("/");
  let url = window.location.pathname.slice(index + 1);

  useEffect(async () => {
    await server
      .get(`/post/${url}`)
      .then((res) => {
        setPostinfo(res.data.data.post);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const handleClickEditBtn = (boolean) => {
    if (boolean) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
      console.log(post);
    }
  };
  return (
    <>
      <Nav />
      {!isEdit ? (
        <div id="post-modal-background">
          <div className="float-btn-box">
            <Link to="/posts">
              <div className="float-btn">
                <img src={profile} className="float-profile-btn"></img>
                <div className="float-profile-title">프로필</div>
              </div>
            </Link>
            <div className="float-btn">
              <img src={love} className="float-love-btn"></img>
              <div className="float-love-title">좋아요</div>
            </div>
            {user.data.userInfo.role === "recruiter" ? (
              <div className="float-btn">
                <img src={email} className="float-email-btn"></img>
                <div className="float-email-title">연락하기</div>
              </div>
            ) : null}
            {postinfo.userInfo &&
            user.data.userInfo.id === postinfo.userInfo.user_id ? (
              <div className="float-btn">
                <img
                  src={email}
                  className="float-edit-btn"
                  onClick={() => handleClickEditBtn(true)}
                ></img>
                <div className="float-email-title">수정하기</div>
              </div>
            ) : null}
          </div>
          <div className="container">
            {postinfo.genre ? (
              <div className="info">
                <div className="info-box">
                  <div className="post-name">{postinfo.userInfo.name}</div>
                  <img src={heart} className="heart-img"></img>
                  <span className="genre">|{postinfo.genre}</span>
                  <span className="like">{postinfo.likes.length}</span>
                  <button
                    className="delete-btn"
                    onClick={() => props.handleClickPost(false)}
                  >
                    X
                  </button>
                  <span className="desc">{postinfo.content}</span>
                </div>
                <div className="img-box">
                  <div className="div-img">
                    {postinfo.media.map((img) => {
                      if (img.type === "img") {
                        return (
                          <>
                            <img
                              src={img.path}
                              className="post-image"
                              alt="이미지"
                            ></img>
                          </>
                        );
                      } else {
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
            ) : (
              <div></div>
            )}
          </div>
        </div>
      ) : (
        <PostEdit
          handleClickPost={props.handleClickPost}
          handleClickEditBtn={handleClickEditBtn}
          userPostinfo={postinfo}
        />
      )}
    </>
  );
};
export default Post;
