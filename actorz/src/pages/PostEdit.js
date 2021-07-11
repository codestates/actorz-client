import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { editPostInfo, removePostPhoto } from "../actions/postAction";
import Nav from "../components/Nav";
import Postupload from "../components/post-upload/post-upload.component";
import server from "../apis/server";
import profile from "../images/profile.png";
import love from "../images/thumb-up.png";
import email from "../images/email.png";
import heart from "../images/heart.png";
import "../styles/PostEdit.css";

const PostEdit = ({ userPostinfo, handleClickPost, handleClickEditBtn }) => {
  const post = useSelector((post) => post.postInfoReducer);
  const [desc, setDesc] = useState("");
  const [newfile, setNewFile] = useState(userPostinfo.media);
  const [postinfo, setPostinfo] = useState(userPostinfo);
  const dispatch = useDispatch();
  console.log(postinfo);

  let s3Url = null;
  let result = null;

  useEffect(() => {
    //post의 상태가 업데이트 될 때마다 새로 넣어준다
    setPostinfo(post.data.data.posts.posts[0]);
    setNewFile(post.data.data.posts.posts[0].media);
  }, [post]);

  const handleClickDeleteBtn = (post_id, img_id) => {
    dispatch(removePostPhoto(post_id, img_id));
  };

  const handleInputValue = (key) => (event) => {
    if (key === "desc") {
      setDesc({ [key]: event.target.value });
    }
  };
  const handleClickSaveBtn = async () => {
    handleClickEditBtn(false);

    dispatch(
      editPostInfo({
        ...postinfo,
        content: desc.desc,
        media: newfile,
      })
    );

    await server
      .post(
        `/post/${postinfo._id}/update`,
        {
          genre: postinfo.genre,
          media: newfile,
          content: desc.desc,
          userInfo: postinfo.userInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        window.location = "/mainpage";
      })
      .catch((err) => {
        throw err;
      });
  };

  const updateUploadedFiles = async (files) => {
    await server
      .get(`upload`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          s3Url = res.data.data;
        }
      })
      .catch((err) => {
        throw err;
      });
    let fileData = files[0];

    await axios
      .put(s3Url, fileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        result = res.config.url.split("?")[0];
      })
      .catch((err) => {
        throw err;
      });
    var fileExt = files[0].name.substring(files[0].name.lastIndexOf(".") + 1);

    // if (
    //   fileExt === "img" ||
    //   fileExt === "jpg" ||
    //   fileExt === "png" ||
    //   fileExt === "jpeg"
    // ) {
    //   setNewFile([...newfile, { path: result, type: "img" }]);
    // } else if (fileExt === "mp4") {
    //   setNewFile([...newfile, { path: result, type: "video" }]);
    // }

    if (fileExt === "mp4") {
      setNewFile([...newfile, { path: result, type: "video" }]);
    } else {
      setNewFile([...newfile, { path: result, type: "img" }]);
    }
  };
  return (
    <>
      <Nav />
      <div id="post-modal-background" onClick={() => handleClickPost(false)}>
        <div className="float-btn-box">
          <div
            className="float-btn"
            onClick={(event) => event.stopPropagation()}
          >
            <img alt="" src={profile} className="float-profile-btn"></img>
            <div className="float-profile-title">프로필</div>
          </div>
          <div className="float-btn">
            <img alt="" src={love} className="float-love-btn"></img>
            <div className="float-love-title">좋아요</div>
          </div>
          <div className="float-btn">
            <img alt="" src={email} className="float-email-btn"></img>
            <div className="float-email-title">연락하기</div>
          </div>
          <div className="float-btn">
            <img
              alt=""
              src={email}
              className="float-edit-btn"
              onClick={() => handleClickEditBtn(false)}
              onClick={handleClickSaveBtn}
            ></img>
            <div className="float-email-title">저장하기</div>
          </div>
        </div>
        <div className="container" onClick={(event) => event.stopPropagation()}>
          <div className="info">
            <div className="info-box">
              <div className="post-name">{postinfo.userInfo.name}</div>
              <img alt="" src={heart} className="heart-img"></img>
              <span className="genre">|{postinfo.genre}</span>
              <span className="like">{postinfo.likes.length}</span>
              <button
                className="delete-btn"
                onClick={() => handleClickPost(false)}
              >
                X
              </button>
              <input
                type="text"
                defaultValue={postinfo.content}
                className="desc"
                onChange={handleInputValue("desc")}
              ></input>
            </div>
            <div className="img-box">
              <div className="div-img">
                {postinfo.media.map((img) => {
                  if (img.type === "img") {
                    return (
                      <>
                        <img
                          key={img._id}
                          src={img.path}
                          className="post-image"
                          alt="이미지"
                        ></img>

                        <button
                          className="photo-delete-btn"
                          onClick={() =>
                            handleClickDeleteBtn(postinfo._id, img._id)
                          }
                        >
                          X
                        </button>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <video controls className="video" key={img._id}>
                          <source src={img.path}></source>
                        </video>
                        <button
                          className="photo-delete-btn"
                          onClick={() =>
                            handleClickDeleteBtn(postinfo._id, img._id)
                          }
                        >
                          X
                        </button>
                      </>
                    );
                  }
                })}
              </div>
              <form>
                <Postupload
                  accept=".jpg,.png,.jpeg, .mp4"
                  multiple
                  updateFilesCb={updateUploadedFiles}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostEdit;
