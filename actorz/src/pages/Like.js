import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPostInfo, editPostInfo } from "../actions/postAction";
import { getUserInfo } from "../actions/userAction";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Post from "./Post";
import SocialSignup from "../components/SocialSignup";
import server from "../apis/server";
import Footer from "../components/Footer";
import Search from "../components/Search";
import Iconlist from "../components/Iconlist";
import { HeartOutlined } from "@ant-design/icons";
import { Card, Icon, Image } from "semantic-ui-react";
import "antd/dist/antd.css";
import "../mainpage.css";
import { Modal } from 'antd';
import "semantic-ui-css/semantic.min.css";
import Loading from "../components/loading";
import FileUpload from "../components/file-upload/file-upload.component";
import { redirectUri } from "../config";

const Like = () => {
  const [clickupload, setClickUpload] = useState(false);
  const [clickModal, setClickModal] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [oauthSignup, setOauthSignup] = useState("");
  const [modalSocialSignup, setModalSocialSignup] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [clickLike, setClickLike] = useState(false);
  const [likePost, setLikePost] = useState([]);

  const post = useSelector((post) => post.postInfoReducer);
  const user = useSelector((user) => user.userInfoReducer);
  const dispatch = useDispatch();
  //console.log(user.data.userInfo.id);

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
  useEffect(async () => {
    await server
      .get(`like/${user.data.userInfo.id}`)
      .then((res) => {
        setLikePost(res.data.data.posts);
      })
      .catch((err) => {
        throw err;
      });
  }, [clickLike]);

  useEffect(() => {
    setIsLoading(true);
    const oauthLogin = async () => {
      try {
        const [provider, code] = oauthSignup.split("=");
        if (!code.includes("@")) {
          await server
            .post(`/login/${provider}`, { code })
            .then(async (res) => {
              if (res.status === 200) {
                //로그인 성공
                localStorage.setItem("accessToken", res.data.data.accessToken);
                localStorage.setItem("id", res.data.data.id);
                console.log(res.data.data.accessToken);
                await server //로그인한 유저의 정보를 state에 저장
                  .get(`/user/${localStorage.getItem("id")}`)
                  .then((res) => {
                    if (res.status === 200) {
                      setModalSocialSignup(false);
                      setIsLoading(false);
                      dispatch(getUserInfo(res.data.data.userInfo));
                    }
                  })
                  .catch((err) => {
                    setIsLoading(false);
                    throw err;
                  });
              } else if (res.status === 201) {
                //새로운 유저
                setIsLoading(false);
                setModalSocialSignup(true);
                setOauthSignup(`${provider}=${res.data.data.email}`);
              } else {
                setIsLoading(false);
                Modal.error({
                  content: '소셜 로그인 중 오류가 발생했습니다.',
                });
                // alert("소셜 로그인 중 오류가 발생했습니다.");
                return;
              }
            });
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };

    const parseQueryString = function () {
      const str = window.location.search;
      let objURL = {};

      str.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function ($0, $1, $2, $3) {
          objURL[$1] = $3;
        }
      );
      return objURL;
    };

    const getQuery = () => {
      const query = parseQueryString();
      if (query.code && !oauthSignup) {
        if (query.state) {
          query.provider = "naver";
        } else if (query.scope) {
          query.provider = "google";
        }
        setOauthSignup(`${query.provider}=${query.code}`);
      } else {
        setIsLoading(false);
      }
    };
    getQuery();
    if (oauthSignup) {
      oauthLogin();
    }
  }, [oauthSignup, dispatch]);

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
        console.log(post);
      })
      .catch((err) => {
        throw err;
      });
  };

  const redirectPage = () => {
    Modal.warning({
      title: '접근 실패',
      content: '로그인 후 이용 가능합니다.',
      onOk(){window.location = "/mainpage";}
    });
    // alert("로그인 후 이용 가능합니다.");
    // window.location = "/mainpage";
  };

  //console.log(post); //여기에 서버에서 가져온 모든 post list가 담겨있음.

  return (
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
              <div className="midContents">
                {post.data.data
                  ? likePost.map((post) => {
                      return (
                        <Card centered={true} fluid={true} key={post._id}>
                          <div className="effecTest">
                            <div
                              className="screen"
                              onClick={() => handleClickPost(true, post._id)}
                            >
                              {/* <div className="top"> 이기능쓰긴함?</div> */}
                              <div className="bottom">
                                <HeartOutlined className="testIcon" />
                              </div>
                              {post.media[0] ? (
                                <Image
                                  src={post.media[0].path}
                                  className="exampleIMG"
                                />
                              ) : null}{" "}
                              {/* 사진 다 지워버리면 메인페이지 여기에 어떤 사진을 출력해야 할까, 기본 이미지..? */}
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
                            <Card.Description>{post.content}</Card.Description>
                          </Card.Content>
                          <Card.Content extra>
                            {post.likes.length !== 0 ? (
                              <>
                                {post.likes.map((like) => {
                                  return like.user_id ===
                                    user.data.userInfo.id ? (
                                    <Icon
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
                  : null}
                {clickModal ? <Post handleClickPost={handleClickPost} /> : null}
              </div>
            </div>
            <div className="newblockPosition2"> </div>

            <div className="rightSpace">
              <div className="iconList2">{isFilter ? <Search /> : null}</div>
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
  );
};

export default Like;
