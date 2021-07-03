import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editPostInfo, removePostPhoto } from "../actions/postAction";
import Nav from "../components/Nav";
import profile from "../images/profile.png";
import love from "../images/thumb-up.png";
import email from "../images/email.png";
import heart from "../images/heart.png";
import "../styles/PostEdit.css";
import Postupload from "../components/post-upload/post-upload.component";

const PostEdit = ({ handleClickPost, handleClickEditBtn }) => {
  const [desc, setDesc] = useState("");
  const post = useSelector((post) => post.postInfoReducer);
  const dispatch = useDispatch();
  //console.log(post);

  //console.log(post);
  //console.log(post.data.posts[0].path);

  const handleClickDeleteBtn = (id) => {
    //console.log(id);
    dispatch(removePostPhoto(id));
  };

  const [newfile, setNewFile] = useState([...post.data.posts[0].path]);

  const [clickupload, setClickUpload] = useState(false);

  const handleClickUpload = (boolean) => {
    if (boolean) {
      setClickUpload(true);
    } else {
      setClickUpload(false);
    }
  };

  const handleInputValue = (key) => (event) => {
    if (key === "desc") {
      setDesc({ [key]: event.target.value });
      //console.log(desc);
    }
  };

  const handleClickSaveBtn = () => {
    //console.log("aaaaaaaaaaa");
    handleClickEditBtn(false);
    //console.log(newfile, desc.desc, post.data.posts[0].genre);
    dispatch(
      editPostInfo({
        type: "file",
        path: newfile,
        content: desc.desc,
        genre: post.data.posts[0].genre,
      })
    );
  };

  const updateUploadedFiles = (files) => {
    setNewFile([...newfile, { id: null, path: files[0].name }]);
    //console.log(newfile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기에 이미지 올리는 로직 작성해야 함
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
              <div className="post-name">Kimcoding</div>
              <img src={heart} className="heart-img"></img>
              <span className="genre">
                |
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
              <input
                type="text"
                defaultValue={post.data.posts[0].content}
                className="desc"
                onChange={handleInputValue("desc")}
              ></input>
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
                        <button
                          className="photo-delete-btn"
                          onClick={() => handleClickDeleteBtn(img.id)}
                        >
                          X
                        </button>
                      </>
                    );
                  } else if (fileExt === "mp4") {
                    return (
                      <>
                        <video controls className="video">
                          <source src={img.path}></source>
                        </video>
                        <button
                          className="photo-delete-btn"
                          onClick={() => handleClickDeleteBtn(img.id)}
                        >
                          X
                        </button>
                      </>
                    );
                  }
                })}
              </div>
              <form onSubmit={handleSubmit}>
                <Postupload
                  accept=".jpg,.png,.jpeg, .mp4"
                  multiple
                  updateFilesCb={updateUploadedFiles}
                  handleClickUpload={handleClickUpload}
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
