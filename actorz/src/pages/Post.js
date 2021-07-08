import React, { useEffect, useState } from "react";
import server from "../apis/server";
import { useSelector } from "react-redux";
import Nav from "../components/Nav";
import PostEdit from "./PostEdit";
import Loading from "../components/loading";
import { Link } from "react-router-dom";
import profile from "../images/profile.png";
import love from "../images/thumb-up.png";
import email from "../images/email.png";
import heart from "../images/heart.png";
import "../styles/Post.css";

const Post = ({ handleClickPost }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [postinfo, setPostinfo] = useState({});
  const post = useSelector((post) => post.postInfoReducer);
  const user = useSelector((user) => user.userInfoReducer);

  let index = window.location.pathname.lastIndexOf("/");
  let url = window.location.pathname.slice(index + 1);

  useEffect(async () => {
    await server
      .get(`/post/${url}`)
      .then((res) => {
        setPostinfo(res.data.data.post);
        setIsLoading(true);
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

  const handleClickDeleteBtn = async () => {
    await server
      .post(`/post/${url}/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          window.location = "/mainpage";
        }
      })
      .catch((err) => {
        throw err;
      });
  };
  return (
    <>
      <Nav />
      {isloading ? (
        <>
          {!isEdit ? (
            <div
              id="post-modal-background"
              onClick={() => handleClickPost(false)}
            >
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
                {postinfo.userInfo &&
                user.data.userInfo.id === postinfo.userInfo.user_id ? (
                  <div className="float-btn">
                    <img
                      src={email}
                      className="float-edit-btn"
                      onClick={handleClickDeleteBtn}
                    ></img>
                    <div className="float-email-title">삭제하기</div>
                  </div>
                ) : null}
              </div>

              <div
                className="container"
                onClick={(event) => event.stopPropagation()}
              >
                {postinfo.genre ? (
                  <div className="info">
                    <div className="info-box">
                      <div className="post-name">{postinfo.userInfo.name}</div>
                      <img src={heart} className="heart-img"></img>
                      <span className="genre">|{postinfo.genre}</span>
                      <span className="like">{postinfo.likes.length}</span>
                      <button
                        className="delete-btn"
                        onClick={() => handleClickPost(false)}
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
                              <img
                                key={img._id}
                                src={img.path}
                                className="post-image"
                                alt="이미지"
                              ></img>
                            );
                          } else {
                            return (
                              <video controls className="video" key={img._id}>
                                <source src={img.path}></source>
                              </video>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Loading />
                )}
              </div>
            </div>
          ) : (
            <PostEdit
              handleClickPost={handleClickPost}
              handleClickEditBtn={handleClickEditBtn}
              userPostinfo={postinfo}
            />
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
export default Post;
