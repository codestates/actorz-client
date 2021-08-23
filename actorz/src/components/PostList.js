import React, { useEffect, useState } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { HeartOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import server from "../apis/server";
import { Modal } from "antd";
import Post from "../pages/Post";
import { getAllPostInfo } from "../actions/postAction";

const PostList = ({ post, page }) => {
  const [clickModal, setClickModal] = useState(false);
  const user = useSelector((user) => user.userInfoReducer);
  const [clickLike, setClickLike] = useState(false);
  const [likePost, setLikePost] = useState(post);
  const dispatch = useDispatch();
  let list = null;

  if (page === "mainpage") {
    list = post;
  } else if (page === "likepage") {
    list = likePost;
  }

  useEffect(() => {
    const getPostLists = async () => {
      try {
        await server.get(`/post`).then((res) => {
          if (res.status === 200) {
            dispatch(getAllPostInfo(res.data.data));
          }
        });
      } catch (err) {
        Modal.warning({
          title: "실패",
          content:
            "게시물 정보를 가져오는 중에 예상치 못한 오류가 발생했습니다  \n 잠시 후 다시 이용해주세요",
        });
      }
    };
    getPostLists();
  }, [dispatch, clickLike]);

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
  }, [dispatch, clickLike, post]);

  const handleClickPost = (boolean, id) => {
    if (boolean) {
      setClickModal(true);
      window.history.pushState(null, "", `/post/${id}`);
    } else {
      setClickModal(false);
      window.location = "/mainpage";
    }
  };

  const handleClickLikeBtn = async (state, post_id) => {
    let path = null;
    if (localStorage.getItem("accessToken")) {
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
    } else {
      return Modal.warning({
        title: "Login first",
        content: "로그인 후 이용 가능합니다.",
      });
    }
  };

  return (
    <>
      {post
        ? list.map((post) => {
            return (
              <Card centered={true} fluid={true} key={post._id}>
                <div
                  className="effecTest"
                  onClick={() => handleClickPost(true, post._id)}
                >
                  <div className="screen">
                    <div className="bottom">
                      <HeartOutlined className="testIcon" />
                    </div>
                    {post.media.length !== 0 && post.media[0] ? (
                      post.media[0].type === "img" ? (
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
                      )
                    ) : null}
                  </div>
                </div>

                <Card.Content onClick={() => handleClickPost(true, post._id)}>
                  <Card.Header>
                    <div className="nothing">{post.userInfo.name}</div>
                  </Card.Header>
                  <Card.Meta>
                    <span className="date">
                      Updated at {post.updatedAt.split("T")[0]}{" "}
                      {post.updatedAt.split("T")[1].slice(0, 8)}
                    </span>
                  </Card.Meta>
                  <Card.Description>{post.content}</Card.Description>
                </Card.Content>

                <Card.Content extra>
                  {post.likes.length !== 0 && user.isLogin ? (
                    <>
                      {post.likes.findIndex(
                        (i) => i.user_id === user.data.userInfo.id
                      ) !== -1 ? (
                        <Icon
                          name="like"
                          className="mylike"
                          onClick={(e) => {
                            handleClickLikeBtn("like", post._id);
                          }}
                        />
                      ) : (
                        <Icon
                          name="like"
                          className="unlike"
                          onClick={() => handleClickLikeBtn("unlike", post._id)}
                        />
                      )}
                    </>
                  ) : (
                    <Icon
                      name="like"
                      className="unlike"
                      onClick={() => handleClickLikeBtn("unlike", post._id)}
                    />
                  )}
                  {post.likes.length}
                </Card.Content>
              </Card>
            );
          })
        : null}
      {clickModal ? (
        <Post
          clickModal={clickModal}
          closePost={() => handleClickPost(false)}
        />
      ) : null}
    </>
  );
};

export default PostList;
