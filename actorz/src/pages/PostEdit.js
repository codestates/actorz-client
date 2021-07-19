//선들님꺼(최신꺼)
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { removePostPhoto } from "../actions/postAction";
import Nav from "../components/Nav";
import Postupload from "../components/post-upload/post-upload.component";
import server from "../apis/server";
import { CloseOutlined } from "@ant-design/icons";
import Loading from "../components/loading";
import { Select, Modal } from "antd";
import { Icon, Card, Dropdown } from "semantic-ui-react";

import "../styles/PostEdit.css";
import { useMediaQuery } from "react-responsive";
import {
  RemoveFileIcon3,
  FileMetaData2,
  PreviewContainer2,
} from "../components/file-upload/file-upload.styles";
const { Option } = Select;

const PostEdit = ({
  handleClickDeleteButton,
  closePost,
  userPostinfo,
  handleClickEditBtn,
}) => {
  const post = useSelector((post) => post.postInfoReducer);
  const user = useSelector((user) => user.userInfoReducer);
  const [desc, setDesc] = useState("");
  const [newfile, setNewFile] = useState(userPostinfo.media);
  const [postinfo, setPostinfo] = useState(userPostinfo);
  const [genre, setGenre] = useState(postinfo.genre);
  const dispatch = useDispatch();

  const isPcOrTablet = useMediaQuery({
    query: "(min-width:768px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  let s3Url = null;
  let result = null;
  //console.log(post.data.data.posts.posts);
  var index = post.data.data.posts.posts.findIndex(
    (post) => post._id === postinfo._id
  );
  //console.log(index);
  useEffect(() => {
    //post의 상태가 업데이트 될 때마다 새로 넣어준다
    setPostinfo(post.data.data.posts.posts[index]);
    setNewFile(post.data.data.posts.posts[index].media);
  }, [post, index]);
  
  const handleClickCloseBtn = () => {
    closePost();
  };

  const handleClickDeleteBtn = (post_id, img_id) => {

    console.log(post_id, img_id);
    dispatch(removePostPhoto(post_id, img_id));
  };

  // const handleClickDeleteBtn = (post_id, img_id) => {
  //   const postDeleteProcess = async () => {
  //     await server
  //     .post(
  //       `/post/${url}/delete`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       if (res.status === 200) {
  //         window.location = "/mainpage";
  //       }
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  //   }

  //   let node = null;
    
  //   if(isMobile) {
  //     node = "#post-container-mobile";
  //   } else {
  //     node = "#post-container";
  //   }
  //   Modal.confirm({
  //     title: "포스트 삭제",
  //     content: "정말로 포스트를 삭제하시겠습니까?",
  //     getContainer: node,
  //     cancelText: "삭제하지 않겠습니다",
  //     okText: "삭제",
  //     onOk: postDeleteProcess,
  //     maskClosable: true
  //   });      
  // };

  const handleInputValue = (key) => (event) => {
    if (key === "desc") {
      setDesc({ [key]: event.target.value });
    } else if (key === "genre") {
      setGenre(event);
    }
  };
  const handleClickSaveBtn = async () => {
    await server
      .post(
        `/post/${postinfo._id}/update`,
        {
          genre: genre,
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
        handleClickCloseBtn();
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
    handleClickEditBtn(false);
  };

  const updateUploadedFiles = async (files) => {
    console.log(files);
    //newfile이랑 files랑 비교해서
    if (files.length !== 0) {
      await server
        .get(`/upload`, {
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
      let fileData = files[files.length - 1];

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
      var fileExt = files[files.length - 1].name.substring(
        files[files.length - 1].name.lastIndexOf(".") + 1
      );

      if (fileExt === "mp4") {
        setNewFile([...newfile, { path: result, type: "video" }]);
      } else {
        setNewFile([...newfile, { path: result, type: "img" }]);
        //console.log(newfile);
      }
    }
  };

  return (
    <>
      <Nav />
      <>
        {isPcOrTablet && ( // 일반 모드 PC OR TABLET
          <>
            <div id="post-modal-background" onClick={handleClickCloseBtn}>
              <div id="post-modal-container">
                <div
                  id="post-container"
                  onClick={(event) => event.stopPropagation()}
                >
                  {postinfo.genre ? (
                    <>
                      <div id="post-container-1">
                        <div className="post-1-wrap">
                          {postinfo.userInfo &&
                          user.data.userInfo.id ===
                            postinfo.userInfo.user_id ? (
                            <>
                              <div className="post-1-content post-btn-hover">
                                <div className="post-1-content-icon-container">
                                  <Icon
                                    name="trash alternate outline"
                                    className="post-1-content-icon"
                                    onClick={handleClickDeleteButton}
                                  ></Icon>
                                </div>
                              </div>
                              <div
                                className="post-1-content post-btn-hover"
                                onClick={() => handleClickEditBtn(false)}
                                onClick={handleClickSaveBtn}
                              >
                                <div className="post-1-content-icon-container">
                                  <Icon
                                    name="edit outline"
                                    className="post-1-content-icon post-icon-btn-config"
                                  ></Icon>
                                </div>
                              </div>
                            </>
                          ) : null}

                          <div
                            className="post-1-content post-btn-hover"
                            onClick={handleClickCloseBtn}
                          >
                            <div className="post-1-content-icon-container">
                              <CloseOutlined
                                style={{ paddingTop: "0.2rem" }}
                                name="close"
                                className="post-1-content-icon post-1-content-icon-close"
                              ></CloseOutlined>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="post-container-2">
                        <div className="post-2-content">
                          <div className="post-name post-btn-hover">
                            {postinfo.userInfo.name}
                          </div>
                        </div>
                        <div className="post-2-content-width-100">
                          <div id="post-2-wrap2">
                            <Dropdown text={genre}>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  text="액션"
                                  onClick={() => setGenre("액션")}
                                />
                                <Dropdown.Item
                                  text="공포"
                                  onClick={() => setGenre("공포")}
                                />
                                <Dropdown.Item
                                  text="코미디"
                                  onClick={() => setGenre("코미디")}
                                />
                                <Dropdown.Item
                                  text="드라마"
                                  onClick={() => setGenre("드라마")}
                                />
                                <Dropdown.Item
                                  text="판타지"
                                  onClick={() => setGenre("판타지")}
                                />
                                <Dropdown.Item
                                  text="기타"
                                  onClick={() => setGenre("기타")}
                                />
                              </Dropdown.Menu>
                            </Dropdown>

                            <input
                              type="text"
                              defaultValue={postinfo.content}
                              className="desc"
                              onChange={handleInputValue("desc")}
                            ></input>
                          </div>
                        </div>

                        <div className="post-info"></div>
                      </div>
                      <div id="post-container-3">
                        <div className="post-div-img2">
                          <PreviewContainer2 className="post-edit-upload-container">
                            <form className="post-edit-drag-and-drop">
                              <Postupload
                                accept="*"
                                multiple
                                updateFilesCb={updateUploadedFiles}
                              />
                            </form>
                            {postinfo.media.map((img) => {
                              if (img.type === "img") {
                                return (
                                  <>
                                    <Card
                                      className="post-media-data"
                                      centered={true}
                                      fluid={true}
                                      key={img._id}
                                    >
                                      <img
                                        key={img._id}
                                        src={img.path}
                                        className="post-image"
                                        alt="이미지"
                                      ></img>

                                      <FileMetaData2>
                                        <aside>
                                          <RemoveFileIcon3
                                            className="fas fa-trash-alt"
                                            onClick={() =>
                                              handleClickDeleteBtn(
                                                postinfo._id,
                                                img._id
                                              )
                                            }
                                          />
                                        </aside>
                                      </FileMetaData2>
                                    </Card>
                                  </>
                                );
                              } else {
                                return (
                                  <>
                                      <Card
                                        className="post-media-data"
                                        centered={true}
                                        fluid={true}
                                        key={img._id}
                                      >
                                        <video
                                          loop="loop"
                                          controls
                                          className="post-video"
                                          key={img._id}
                                        >
                                          <source src={img.path}></source>
                                        </video>
                                      <FileMetaData2>
                                        <aside>
                                          <RemoveFileIcon3
                                            className="fas fa-trash-alt"
                                            onClick={() =>
                                              handleClickDeleteBtn(
                                                postinfo._id,
                                                img._id
                                                )
                                              }
                                              />
                                        </aside>
                                      </FileMetaData2>
                                    </Card>
                                  </>
                                );
                              }
                            })}
                          </PreviewContainer2>
                        </div>
                      </div>
                      <div className="mobile"></div>
                    </>
                  ) : (
                    <Loading />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {isMobile && (
          <>
          <div id="post-modal-background" onClick={handleClickCloseBtn}>
            <div id="post-modal-container-mobile">
              <div
                id="post-container-mobile"
                onClick={(event) => event.stopPropagation()}
              >
                {postinfo.genre ? (
                  <>
                    <div id="post-container-1">
                      <div className="post-1-wrap">
                        {postinfo.userInfo &&
                        user.data.userInfo.id ===
                          postinfo.userInfo.user_id ? (
                          <>
                            <div className="post-1-content">
                              <div className="post-1-content-icon-container">
                                <Icon
                                  name="trash alternate outline"
                                  className="post-1-content-icon"
                                  onClick={handleClickDeleteButton}
                                ></Icon>
                              </div>
                            </div>
                            <div
                              className="post-1-content"
                              onClick={() => handleClickEditBtn(false)}
                              onClick={handleClickSaveBtn}
                            >
                              <div className="post-1-content-icon-container">
                                <Icon
                                  name="edit outline"
                                  className="post-1-content-icon post-icon-btn-config"
                                ></Icon>
                              </div>
                            </div>
                          </>
                        ) : null}

                        <div
                          className="post-1-content post-btn-hover"
                          onClick={handleClickCloseBtn}
                        >
                          <div className="post-1-content-icon-container">
                            <CloseOutlined
                              style={{ paddingTop: "0.2rem" }}
                              name="close"
                              className="post-1-content-icon post-1-content-icon-close"
                            ></CloseOutlined>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="post-container-2-mobile">
                      <div className="post-2-content">
                        <div className="post-name">
                          {postinfo.userInfo.name}
                        </div>
                      </div>
                      <div className="post-2-content-width-100">
                        <div id="post-2-wrap2">
                          <Dropdown text={genre}>
                            <Dropdown.Menu className="post-2-genre-dropdown">
                              <Dropdown.Item
                                text="액션"
                                onClick={() => setGenre("액션")}
                              />
                              <Dropdown.Item
                                text="공포"
                                onClick={() => setGenre("공포")}
                              />
                              <Dropdown.Item
                                text="코미디"
                                onClick={() => setGenre("코미디")}
                              />
                              <Dropdown.Item
                                text="드라마"
                                onClick={() => setGenre("드라마")}
                              />
                              <Dropdown.Item
                                text="판타지"
                                onClick={() => setGenre("판타지")}
                              />
                              <Dropdown.Item
                                text="기타"
                                onClick={() => setGenre("기타")}
                              />
                            </Dropdown.Menu>
                          </Dropdown>

                          <input
                            type="text"
                            defaultValue={postinfo.content}
                            className="post-edit-desc"
                            onChange={handleInputValue("desc")}
                          ></input>
                        </div>
                      </div>

                      <div className="post-info"></div>
                    </div>
                    <div id="post-container-3">
                      <div className="post-div-img2">
                        <PreviewContainer2 className="post-edit-upload-container-mobile">
                          <form className="post-edit-drag-and-drop">
                            <Postupload
                              accept="*"
                              multiple
                              updateFilesCb={updateUploadedFiles}
                            />
                          </form>
                          {postinfo.media.map((img) => {
                            if (img.type === "img") {
                              return (
                                <>
                                  <Card
                                    className="post-media-data"
                                    centered={true}
                                    fluid={true}
                                    key={img._id}
                                  >
                                    <img
                                      key={img._id}
                                      src={img.path}
                                      className="post-image"
                                      alt="이미지"
                                    ></img>

                                    <FileMetaData2>
                                      <aside>
                                        <RemoveFileIcon3
                                          className="fas fa-trash-alt"
                                          onClick={() =>
                                            handleClickDeleteBtn(
                                              postinfo._id,
                                              img._id
                                            )
                                          }
                                        />
                                      </aside>
                                    </FileMetaData2>
                                  </Card>
                                </>
                              );
                            } else {
                              return (
                                <>
                                    <Card
                                      className="post-media-data-mobile"
                                      centered={true}
                                      fluid={true}
                                      key={img._id}
                                    >
                                      <video
                                        loop="loop"
                                        controls
                                        className="post-video-mobile"
                                        key={img._id}
                                      >
                                        <source src={img.path}></source>
                                      </video>
                                    <FileMetaData2>
                                      <aside>
                                        <RemoveFileIcon3
                                          className="fas fa-trash-alt"
                                          onClick={() =>
                                            handleClickDeleteBtn(
                                              postinfo._id,
                                              img._id
                                              )
                                            }
                                            />
                                      </aside>
                                    </FileMetaData2>
                                  </Card>
                                </>
                              );
                            }
                          })}
                        </PreviewContainer2>
                      </div>
                    </div>
                    <div className="mobile"></div>
                  </>
                ) : (
                  <Loading />
                )}
              </div>
            </div>
          </div>
        </>
        )}
      </>
    </>
  );
};
export default PostEdit;
