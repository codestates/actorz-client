import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Post from "./Post";
import SocialSignup from "../components/SocialSignup";
import server from "../apis/server";
import Footer from "../components/Footer";
import Iconlist from "../components/Iconlist";
import { HeartOutlined } from "@ant-design/icons";
import { Card, Icon, Image } from "semantic-ui-react";
import ResponsiveNav from "../components/responsiveApp/ResponsiveNav";
import ResponsiveFooter from "../components/responsiveApp/ResponsiveFooter";
import ResponsiveIconlistTablet from "../components/responsiveApp/ResponsiveIconlistTablet";
import Loading from "../components/loading";
import failed from "../images/depression.png";

import "antd/dist/antd.css";
import "../mainpage.css";
import { Modal } from "antd";
import "semantic-ui-css/semantic.min.css";

const Like = () => {
  const [clickModal, setClickModal] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [oauthSignup, setOauthSignup] = useState("");
  const [modalSocialSignup, setModalSocialSignup] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [clickLike, setClickLike] = useState(false);
  const [likePost, setLikePost] = useState(null);

  const post = useSelector((post) => post.postInfoReducer);
  const user = useSelector((user) => user.userInfoReducer);
  const dispatch = useDispatch();

  const loading = (boolean) => {
    setIsLoading(!boolean);
  };

  const handleClickPost = (boolean, id) => {
    if (boolean) {
      setClickModal(true);
      window.history.pushState(null, "", `/post/${id}`);
    } else {
      setClickModal(false);
      window.history.pushState(null, "", `/mainpage`);
    }
  };

  useEffect(() => {
    const p = async () => {
      await server
        .get(`/like/${user.data.userInfo.id}`)
        .then((res) => {
          setLikePost(res.data.data.posts);
        })
        .catch((err) => {
          throw err;
        });
    };
    p();
  }, [clickLike]);

  const handleClickFiltering = () => {
    setIsFilter(!isFilter);
  };

  const handleClickLikeBtn = async (state, post_id) => {
    let path = null;

    if (state === "unlike") {
      path = `/post/${post_id}/like`;
    } else if (state === "like") {
      path = `/post/${post_id}/unlike`;
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
        setClickLike(!clickLike);
      })
      .catch((err) => {
        throw err;
      });
  };

  const redirectPage = () => {
    Modal.warning({
      title: "접근 실패",
      content: "로그인 후 이용 가능합니다.",
      onOk() {
        window.location = "/mainpage";
      },
    });
  };

  const isPc = useMediaQuery({
    query: "(min-width:1024px)",
  });

  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });
  console.log(likePost);
  console.log(post);
  console.log(user);

  return (
    <>
      {isPc && (
        <>
          {localStorage.getItem("accessToken") ? (
            <>
              <div className="blockhere"> </div>
              <div className="mainPage">
                <Nav
                  loading={loading}
                  handleClickFiltering={handleClickFiltering}
                />
                <Iconlist />

                <div className="newblockPosition"> </div>

                <div className="middleSpace">
                  <div className="midContents2 midContentsReverse">
                    {likePost ? (
                      likePost.length !== 0 ? (
                        likePost.map((post) => {
                          return (
                            <Card centered={true} fluid={true} key={post._id}>
                              <div className="effecTest">
                                <div
                                  className="screen"
                                  onClick={() =>
                                    handleClickPost(true, post._id)
                                  }
                                >
                                  <div className="bottom">
                                    <HeartOutlined className="testIcon" />
                                  </div>
                                  {post.media[0].type === "img" ? (
                                    <Image
                                      src={post.media[0].path}
                                      className="exampleIMG"
                                    />
                                  ) : (
                                    <video
                                      autoPlay="autoplay"
                                      muted="muted"
                                      loop="loop"
                                      className="video"
                                      style={{ width: "100%", margin: 0 }}
                                    >
                                      <source
                                        src={post.media[0].path}
                                        className="exampleIMG"
                                      ></source>
                                    </video>
                                  )}
                                </div>
                              </div>

                              <Card.Content>
                                <Card.Header>
                                  <div className="nothing2">
                                    <Link
                                      to={{
                                        pathname: `/posts`,
                                        state: {
                                          id: post.userInfo.user_id,
                                        },
                                      }}
                                    >
                                      <div className="nothing">
                                        {post.userInfo.name}
                                      </div>
                                    </Link>
                                  </div>
                                </Card.Header>
                                <Card.Meta>
                                  <span className="date">
                                    Updated at {post.updatedAt}
                                  </span>
                                </Card.Meta>
                                <Card.Description>
                                  {post.content}
                                </Card.Description>
                              </Card.Content>
                              <Card.Content extra>
                                {post.likes.length !== 0 ? (
                                  <>
                                    {post.likes.map((like, index) => {
                                      return like.user_id ===
                                        user.data.userInfo.id ? (
                                        <Icon
                                          key={index}
                                          name="like"
                                          className="mylike"
                                          onClick={() =>
                                            handleClickLikeBtn("like", post._id)
                                          }
                                        />
                                      ) : null;
                                    })}
                                  </>
                                ) : (
                                  <Icon
                                    name="like"
                                    className="unlike"
                                    onClick={() =>
                                      handleClickLikeBtn("unlike", post._id)
                                    }
                                  />
                                )}

                                {post.likes.length}
                              </Card.Content>
                            </Card>
                          );
                        })
                      ) : (
                        <center>
                          <div className="failed-box">
                            <img src={failed} className="failed-icon"></img>
                            <span className="failed-span">
                              아무것도 없어요!
                            </span>
                          </div>
                        </center>
                      )
                    ) : (
                      <Loading />
                    )}
                    {clickModal ? (
                      <Post handleClickPost={handleClickPost} />
                    ) : null}
                  </div>
                </div>
                <div className="newblockPosition2"> </div>

                <div className="rightSpace">
                  <div className="iconList2">
                    {/* {isFilter ? <Search /> : null} */}
                  </div>
                </div>
              </div>
              <Footer />
              {modalSocialSignup ? (
                <SocialSignup
                  oauthSignup={oauthSignup}
                  modalSocialClose={() => {
                    setModalSocialSignup(false);
                  }}
                ></SocialSignup>
              ) : null}
            </>
          ) : (
            redirectPage()
          )}
        </>
      )}

      {isTablet && (
        <>
          {localStorage.getItem("accessToken") ? (
            <>
              <Nav
                loading={loading}
                handleClickFiltering={handleClickFiltering}
              />
              <div className="blockhere"> </div>
              <div className="mainPageResponsive">
                <ResponsiveIconlistTablet />

                <div className="newblockPosition"> </div>

                <div className="middleSpace2">
                  <div className="midContentsResponsive midContentsReverse">
                    {likePost ? (
                      likePost.length !== 0 ? (
                        likePost.map((post) => {
                          return (
                            <Card centered={true} fluid={true} key={post._id}>
                              <div className="effecTest">
                                <div
                                  className="screen"
                                  onClick={() =>
                                    handleClickPost(true, post._id)
                                  }
                                >
                                  <div className="bottom">
                                    <HeartOutlined className="testIcon" />
                                  </div>
                                  {post.media[0].type === "img" ? (
                                    <Image
                                      src={post.media[0].path}
                                      className="exampleIMG"
                                    />
                                  ) : (
                                    <video
                                      autoPlay="autoplay"
                                      muted="muted"
                                      loop="loop"
                                      className="video"
                                      style={{ width: "100%", margin: 0 }}
                                    >
                                      <source
                                        src={post.media[0].path}
                                        className="exampleIMG"
                                      ></source>
                                    </video>
                                  )}
                                </div>
                              </div>

                              <Card.Content>
                                <Card.Header>
                                  <div className="nothing2">
                                    <Link
                                      to={{
                                        pathname: `/posts`,
                                        state: {
                                          id: post.userInfo.user_id,
                                        },
                                      }}
                                    >
                                      <div className="nothing">
                                        {post.userInfo.name}
                                      </div>
                                    </Link>
                                  </div>
                                </Card.Header>
                                <Card.Meta>
                                  <span className="date">
                                    Updated at {post.updatedAt}
                                  </span>
                                </Card.Meta>
                                <Card.Description>
                                  {post.content}
                                </Card.Description>
                              </Card.Content>
                              <Card.Content extra>
                                {post.likes.length !== 0 ? (
                                  <>
                                    {post.likes.map((like) => {
                                      return like.user_id ===
                                        user.data.userInfo.id ? (
                                        <Icon
                                          key={like._id}
                                          name="like"
                                          className="mylike"
                                          onClick={() =>
                                            handleClickLikeBtn("like", post._id)
                                          }
                                        />
                                      ) : null;
                                    })}
                                  </>
                                ) : (
                                  <Icon
                                    name="like"
                                    className="unlike"
                                    onClick={() =>
                                      handleClickLikeBtn("unlike", post._id)
                                    }
                                  />
                                )}

                                {post.likes.length}
                              </Card.Content>
                            </Card>
                          );
                        })
                      ) : (
                        <center>
                          <div className="failed-box">
                            <img src={failed} className="failed-icon"></img>
                            <span className="failed-span">
                              아무것도 없어요!
                            </span>
                          </div>
                        </center>
                      )
                    ) : (
                      <Loading />
                    )}
                    {clickModal ? (
                      <Post handleClickPost={handleClickPost} />
                    ) : null}
                  </div>
                </div>
                <div className="newblockPosition2"> </div>

                <div className="rightSpace">
                  <div className="iconList2"></div>
                </div>
              </div>
              <Footer />
              {modalSocialSignup ? (
                <SocialSignup
                  oauthSignup={oauthSignup}
                  modalSocialClose={() => {
                    setModalSocialSignup(false);
                  }}
                ></SocialSignup>
              ) : null}
            </>
          ) : (
            redirectPage()
          )}
        </>
      )}

      {isMobile && (
        <>
          {localStorage.getItem("accessToken") ? (
            <>
              <div className="blockhere"> </div>
              <div className="mainPageResponsive2">
                <ResponsiveNav />

                <div className="newblockPosition"> </div>

                <div className="middleSpaceResponsive2">
                  <div className="midContentsResponsive2 midContentsReverse">
                    {likePost ? (
                      likePost.length !== 0 ? (
                        likePost.map((post) => {
                          return (
                            <Card centered={true} fluid={true} key={post._id}>
                              <div className="effecTest">
                                <div
                                  className="screen"
                                  onClick={() =>
                                    handleClickPost(true, post._id)
                                  }
                                >
                                  <div className="bottom">
                                    <HeartOutlined className="testIcon" />
                                  </div>
                                  {post.media[0].type === "img" ? (
                                    <Image
                                      src={post.media[0].path}
                                      className="exampleIMG"
                                    />
                                  ) : (
                                    <video
                                      autoPlay="autoplay"
                                      muted="muted"
                                      loop="loop"
                                      className="video"
                                      style={{ width: "100%", margin: 0 }}
                                    >
                                      <source
                                        src={post.media[0].path}
                                        className="exampleIMG"
                                      ></source>
                                    </video>
                                  )}
                                </div>
                              </div>

                              <Card.Content>
                                <Card.Header>
                                  <div className="nothing2">
                                    <Link
                                      to={{
                                        pathname: `/posts`,
                                        state: {
                                          id: post.userInfo.user_id,
                                        },
                                      }}
                                    >
                                      <div className="nothing">
                                        {post.userInfo.name}
                                      </div>
                                    </Link>
                                  </div>
                                </Card.Header>
                                <Card.Meta>
                                  <span className="date">
                                    Updated at {post.updatedAt}
                                  </span>
                                </Card.Meta>
                                <Card.Description>
                                  {post.content}
                                </Card.Description>
                              </Card.Content>
                              <Card.Content extra>
                                {post.likes.length !== 0 ? (
                                  <>
                                    {post.likes.map((like) => {
                                      return like.user_id ===
                                        user.data.userInfo.id ? (
                                        <Icon
                                          key={like._id}
                                          name="like"
                                          className="mylike"
                                          onClick={() =>
                                            handleClickLikeBtn("like", post._id)
                                          }
                                        />
                                      ) : null;
                                    })}
                                  </>
                                ) : (
                                  <Icon
                                    name="like"
                                    className="unlike"
                                    onClick={() =>
                                      handleClickLikeBtn("unlike", post._id)
                                    }
                                  />
                                )}

                                {post.likes.length}
                              </Card.Content>
                            </Card>
                          );
                        })
                      ) : (
                        <center>
                          <div className="failed-box">
                            <img src={failed} className="failed-icon"></img>
                            <span className="failed-span">
                              아무것도 없어요!
                            </span>
                          </div>
                        </center>
                      )
                    ) : (
                      <Loading />
                    )}
                    {clickModal ? (
                      <Post handleClickPost={handleClickPost} />
                    ) : null}
                  </div>
                </div>
              </div>
              <ResponsiveFooter />
              {modalSocialSignup ? (
                <SocialSignup
                  oauthSignup={oauthSignup}
                  modalSocialClose={() => {
                    setModalSocialSignup(false);
                  }}
                ></SocialSignup>
              ) : null}
            </>
          ) : (
            redirectPage()
          )}
        </>
      )}
    </>
  );
};

export default Like;
