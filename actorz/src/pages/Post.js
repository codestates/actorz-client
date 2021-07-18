import React, { useEffect, useState } from "react";
import { editLike } from "../actions/postAction";
import { useSelector, useDispatch } from "react-redux";
import server from "../apis/server";
import Nav from "../components/Nav";
import PostEdit from "./PostEdit";
import Loading from "../components/loading";
import { Link } from "react-router-dom";
import { Icon, Card, Dropdown } from "semantic-ui-react";
import "../styles/Post.css";
import SendEmail from "../components/SendEmail";
import "../styles/Fileupload.css";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";



const Post = ({ clickModal, closePost }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [postinfo, setPostinfo] = useState({});
  const [likebtnclick, setlikebtnclick] = useState(false);
  const post = useSelector((post) => post.postInfoReducer);
  const user = useSelector((user) => user.userInfoReducer);
  const [like, setIsLike] = useState(false);
  const [profile, setProfile] = useState();
  const [emailClick, setEmailClick] = useState(false);
  const dispatch = useDispatch();
  console.log(post);

  // var idx = post.data.data.post.posts.findIndex(
  //   (post) => post._id === postinfo._id
  // );

  const isPcOrTablet = useMediaQuery({
    query: "(min-width:768px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  let index = window.location.pathname.lastIndexOf("/");
  let url = window.location.pathname.slice(index + 1);

  useEffect(() => {
    const f = async () => {
      await server
        .get(`/post/${url}`)
        .then((res) => {
          setPostinfo(res.data.data.post);
          setProfile(res.data.data.userPic);
          setIsLoading(true);
          console.log(profile)
        })
        .catch((err) => {
          throw err;
        });

      await server
        .post(
          `post/${url}/islike`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          if (res.data.message === "like") {
            setIsLike(true);
          }
        })
        .catch((err) => {
          throw err;
        });
    };
    f();

  }, [url, likebtnclick]);

  const handleClickEditBtn = (boolean) => {
    if (boolean) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };

  const handleClickDeleteBtn = async () => {
    await server
      .post(
        `/post/${url}/delete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          window.location = "/mainpage";
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const closePostChecker = () => {
    if(clickModal){
      closePost();
    }else{
      window.location = "/mainpage";
    }
  }

  const handleClickLikeBtn = async (state, post_id) => {
    if (!localStorage.getItem("accessToken")) {
      Modal.error({
        getContainer: document.getElementById("post-container-3"),
        content: "로그인 후 이용 가능합니다",
      });
      //alert("로그인 후 이용 가능합니다");
    }else{
      let path = null;
      if (state === "unlike") {
        path = `/post/${post_id}/like`;
        setIsLike(true);
      } else if (state === "like") {
        path = `/post/${post_id}/unlike`;
        setIsLike(false);
      }
  
      await server
        .post(
          path,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          console.log(state)
          console.log(res)
          dispatch(editLike(url, res.data.data.likes));
        })
        .catch((err) => {
          throw err;
        });
        
        if(likebtnclick === true) {
          setlikebtnclick(false);
        }else{
          setlikebtnclick(true)
        }
      }
    }


  return (
    <>
      <Nav />
      {isloading ? (
        <>
          {!isEdit ? ( //Edit 모드가 아닐 때
          <>
            {isPcOrTablet && ( // 일반 모드 PC OR TABLET
              <>
                <div
                  id="post-modal-background"
                  onClick={closePostChecker}
                >
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
                                user.data.userInfo.id === postinfo.userInfo.user_id ? (
                                  <div className="post-1-content post-btn-hover"
                                  onClick={() => handleClickDeleteBtn(true)}>
                                    <div className="post-1-content-icon-container">
                                      <Icon
                                        name="trash alternate outline"
                                        className="post-1-content-icon"
                                      ></Icon>
                                    </div>
                                  </div>
                                ) : null}
                              {postinfo.userInfo &&
                                user.data.userInfo.id === postinfo.userInfo.user_id ? (
                                  <div className="post-1-content post-btn-hover"
                                  onClick={() => handleClickEditBtn(true)}>
                                    <div className="post-1-content-icon-container">
                                      <Icon
                                        name="edit outline"
                                        className="post-1-content-icon post-icon-btn-config"
                                      ></Icon>
                                    </div>
                                  </div>
                                ) : null}
                              {postinfo.userInfo &&
                                user.data.userInfo.role === "recruiter" ? (
                                  <div 
                                    className="post-1-content post-btn-hover"
                                    onClick={() => setEmailClick(true)}
                                  >
                                    <div className="post-1-content-icon-container">
                                      <Icon
                                        name="mail outline"
                                        className="post-1-content-icon"
                                      ></Icon>
                                    </div>
                                  </div>
                                ) : null}
                              <div 
                                className="post-1-content post-btn-hover"
                              >
                                <Link
                                  to={{
                                    pathname: `/posts`,
                                    state: {
                                      id: postinfo.userInfo.user_id,
                                    },
                                  }}
                                >
                                  <img
                                  alt=""
                                  src={profile}
                                  id="post-profile-img"
                                  // className="post-btn-hover"
                                  ></img>
                                </Link>
                              </div>
                              <div className="post-1-content post-btn-hover"
                              onClick={closePostChecker}
                              >
                                <div className="post-1-content-icon-container">
                                  <CloseOutlined
                                    style={{paddingTop: "0.2rem"}}
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
                                    <Link
                                      style={{color: "black"}}
                                      to={{
                                        pathname: `/posts`,
                                        state: {
                                          id: postinfo.userInfo.user_id,
                                        },
                                      }}
                                    >
                                      {postinfo.userInfo.name}
                                    </Link>
                                </div>
                            </div>
                            <div className="post-2-content-width-100">
                              <div id="post-2-wrap">
                                <div>
                                  <span className="post-genre">{postinfo.genre}</span>
                                  <span className="post-desc">{postinfo.content}</span>
                                </div>
                                <div>
                                  {postinfo.likes.length !== 0 &&
                                  localStorage.getItem("accessToken") ? (
                                    <>
                                    {like ? (
                                      <>
                                        <div 
                                          className="post-like-box"
                                          onClick={() =>
                                            handleClickLikeBtn("like", postinfo._id)
                                          }
                                        >
                                          <Icon
                                            name="like"
                                            className="post-like-img"
                                          />
                                          <span className="post-like">
                                            {postinfo.likes.length}
                                          </span>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <div 
                                          className="post-like-box"
                                          onClick={() =>
                                            handleClickLikeBtn("unlike", postinfo._id)
                                          }
                                        >
                                          <Icon
                                            name="like"
                                            className="post-unlike-img"
                                          />
                                          <span className="post-like">
                                            {postinfo.likes.length}
                                          </span>
                                        </div>
                                      </>
                                    )}
                                    </>
                                    ) : (
                                      <>
                                        <div 
                                        className="post-like-box" 
                                        onClick={() => handleClickLikeBtn("unlike", postinfo._id)}>
                                          <Icon
                                            name="like"
                                            className="post-unlike-img"
                                          />
                                          <span className="post-like">
                                            {postinfo.likes.length}
                                          </span>
                                        </div>
                                      </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="post-info">
                            </div>
                          </div>
                          <div id="post-container-3">
                            <div className="post-div-img">
                              {postinfo.media.map((img) => {
                                if (img.type === "img") {
                                  return (
                                    <Card className="post-media-data" centered={true} fluid={true} key={img._id}>
                                      <img
                                        key={img._id}
                                        src={img.path}
                                        className="post-image"
                                        alt="이미지"
                                      ></img>
                                    </Card>
                                  );
                                } else {
                                  return (
                                    <Card className="post-media-data" centered={true} fluid={true} key={img._id}>
                                      <video 
                                        loop="loop"
                                        controls 
                                        className="post-video" 
                                        key={img._id}
                                      >
                                        <source src={img.path}></source>
                                      </video>
                                    </Card>
                                  );
                                }
                              })}
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
              <div
                id="post-modal-background"
                onClick={closePostChecker}
              >
                <div id="post-modal-container-mobile">
                  <div
                    id="post-container-mobile"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {postinfo.genre ? (
                      <>
                        <div id="post-container-1-mobile">
                          <Dropdown 
                            text={(
                              <img
                                alt=""
                                src={profile}
                                id="post-profile-img"
                                // className="post-btn-hover"
                              ></img>
                            )}>
                            <Dropdown.Menu>
                              <Dropdown.Item 
                              text='Profile' 
                              icon="user"
                              as={Link}
                              to={{
                                pathname: `/posts`,
                                state: {
                                  id: postinfo.userInfo.user_id,
                                },
                              }}
                            />
                              {postinfo.userInfo &&
                                user.data.userInfo.role === "recruiter" ? (
                                  <Dropdown.Item 
                                  text='Send email'
                                  icon="mail" 
                                  onClick={() => setEmailClick(true)}
                                  />
                                ) : null}
                              {postinfo.userInfo &&
                                user.data.userInfo.id === postinfo.userInfo.user_id ? (
                                  <Dropdown.Item 
                                  text='Edit'
                                  icon="edit"
                                  onClick={() => handleClickEditBtn(true)}
                                  />
                                ) : null}
                              {postinfo.userInfo &&
                                user.data.userInfo.id === postinfo.userInfo.user_id ? (
                                  <Dropdown.Item 
                                  text='Delete'
                                  icon="trash"
                                  onClick={() => handleClickDeleteBtn(true)}
                                  />
                                ) : null}
                            </Dropdown.Menu>
                          </Dropdown>
                          <div className="post-1-content post-btn-hover"
                          onClick={closePostChecker}
                          >
                            <div className="post-1-content-icon-container">
                              <CloseOutlined
                                style={{paddingTop: "0.2rem"}}
                                name="close"
                                className="post-1-content-icon post-1-content-icon-close"
                              ></CloseOutlined>
                            </div>
                          </div>
                        </div>
                        <div id="post-container-2-mobile">
                            <div className="post-2-content">
                              <div className="post-name post-btn-hover">
                                  {postinfo.userInfo.name}
                              </div>
                          </div>
                          <div className="post-2-content-width-100">
                            <div id="post-2-wrap">
                              <div>
                                <span className="post-genre">{postinfo.genre}</span>
                                <span className="post-desc">{postinfo.content}</span>
                              </div>
                              <div>
                                {postinfo.likes.length !== 0 &&
                                localStorage.getItem("accessToken") ? (
                                  <>
                                  {like ? (
                                    <>
                                      <div 
                                        className="post-like-box"
                                        onClick={() =>
                                          handleClickLikeBtn("like", postinfo._id)
                                        }
                                      >
                                        <Icon
                                          name="like"
                                          className="post-like-img"
                                        />
                                        <span className="post-like">
                                          {postinfo.likes.length}
                                        </span>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div 
                                        className="post-like-box"
                                        onClick={() =>
                                          handleClickLikeBtn("unlike", postinfo._id)
                                        }
                                      >
                                        <Icon
                                          name="like"
                                          className="post-unlike-img"
                                        />
                                        <span className="post-like">
                                          {postinfo.likes.length}
                                        </span>
                                      </div>
                                    </>
                                  )}
                                  </>
                                  ) : (
                                    <>
                                      <div 
                                      className="post-like-box" 
                                      onClick={() => handleClickLikeBtn("unlike", postinfo._id)}>
                                        <Icon
                                          name="like"
                                          className="post-unlike-img"
                                        />
                                        <span className="post-like">
                                          {postinfo.likes.length}
                                        </span>
                                      </div>
                                    </>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="post-info">
                          </div>
                        </div>
                        <div id="post-container-3">
                          <div className="post-div-img">
                            {postinfo.media.map((img) => {
                              if (img.type === "img") {
                                return (
                                  <Card className="post-media-data-mobile" centered={true} fluid={true} key={img._id}>
                                    <img
                                      key={img._id}
                                      src={img.path}
                                      className="post-image-mobile"
                                      alt="이미지"
                                    ></img>
                                  </Card>
                                );
                              } else {
                                return (
                                  <Card className="post-media-data-mobile" centered={true} fluid={true} key={img._id}>
                                    <video 
                                      loop="loop"
                                      controls 
                                      className="post-video-mobile" 
                                      key={img._id}
                                    >
                                      <source src={img.path}></source>
                                    </video>
                                  </Card>
                                );
                              }
                            })}
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
          ) : ( // 일반모드 끝. Edit 모드 시작
            <PostEdit
              closePost={closePostChecker}
              handleClickEditBtn={handleClickEditBtn}
              userPostinfo={postinfo}
            />
          )}
        </>
      ) : (
        <Loading />
      )}
      {emailClick ? (
        <SendEmail
          closePost={closePostChecker}
          setEmailClick={setEmailClick}
          postData={postinfo}
          userInfo={user.data.userInfo}
        ></SendEmail>
      ) : null}
    </>
  );
};
export default Post;
