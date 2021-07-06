import React, { useState } from "react";
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

const PostEdit = ({ postinfo, handleClickPost, handleClickEditBtn }) => {
  const [desc, setDesc] = useState("");
  const post = useSelector((post) => post.postInfoReducer);
  const [newfile, setNewFile] = useState(postinfo.media);
  const dispatch = useDispatch();
  console.log(postinfo);
  //console.log(postinfo);
  //console.log(postinfo.media);
  //console.log(post);

  //console.log(post);
  //console.log(post.data.posts[0].path);

  const handleClickDeleteBtn = (post_id, img_id) => {
    console.log(post_id, img_id);
    dispatch(removePostPhoto(post_id, img_id));
  };

  /* const handleClickUpload = (boolean) => {
    if (boolean) {
      setClickUpload(true);
    } else {
      setClickUpload(false);
    }
  }; */

  const handleInputValue = (key) => (event) => {
    if (key === "desc") {
      setDesc({ [key]: event.target.value });
      //console.log(desc);
    }
  };

  const handleClickSaveBtn = async () => {
    //console.log(postinfo);
    handleClickEditBtn(false);
    //console.log(desc.desc);
    // dispatch(
    //   editPostInfo({
    //     ...postinfo,
    //     genre: postinfo.genre,
    //     media: newfile,
    //     content: desc.desc,
    //     userInfo: postinfo.userInfo,
    //   })
    // );
    //console.log(newfile);
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
        console.log(res);
      })
      .catch((err) => {
        throw err;
      });
  };

  const updateUploadedFiles = (files) => {
    var fileExt = files[0].name.substring(files[0].name.lastIndexOf(".") + 1);
    if (
      fileExt === "img" ||
      fileExt === "jpg" ||
      fileExt === "png" ||
      fileExt === "jpeg"
    ) {
      console.log("Aa");
      setNewFile([...newfile, { path: files[0].name, type: "img" }]);
    } else if (fileExt === "mp4") {
      setNewFile([...newfile, { path: files[0].name, type: "video" }]);
    }
  };

  return (
    <>
      <Nav />
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
              onClick={() => handleClickEditBtn(false)}
              onClick={handleClickSaveBtn}
            ></img>
            <div className="float-email-title">저장하기</div>
          </div>
        </div>
        <div className="container">
          <div className="info">
            <div className="info-box">
              <div className="post-name">{postinfo.name}</div>
              <img src={heart} className="heart-img"></img>
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
                        <video controls className="video">
                          <source src={img.path}></source>
                        </video>
                        <button
                          className="photo-delete-btn"
                          onClick={() => handleClickDeleteBtn(img.id)}
                        ></button>
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
