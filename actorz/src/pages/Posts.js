import React, { useEffect, useState } from "react";
import Post from "../pages/Post";
import Nav from "../components/Nav";
import server from "../apis/server";
import Iconlist from "../components/Iconlist";
import Footer from "../components/Footer";
import Loading from "../components/loading";
import { Pagination } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Posts.css";

const Posts = (props) => {
  const [clickModal, setClickModal] = useState(false);
  const [userinfo, setUserInfo] = useState({});
  const [userPost, setUserPost] = useState({});
  let [data, setData] = useState([]);
  let [totalPage, setTotalPage] = useState(0);
  let [current, setCurrent] = useState(1);
  let [minIndex, setMinIndex] = useState(0);
  let [maxIndex, setMaxIndex] = useState(0);
  let pageSize = 4;

  useEffect(() => {
    const p = async () => {
      await server
        .get(`/post/user/${props.history.location.state.id}`)
        .then((res) => {
          setUserPost(res.data.data);
          setData(res.data.data.posts);
          setTotalPage(Math.ceil(res.data.data.posts.length / pageSize));
          setMinIndex(0);
          setMaxIndex(pageSize);
        })
        .catch((err) => {
          throw err;
        });

      await server
        .get(`/user/${props.history.location.state.id}`)
        .then((res) => {
          setUserInfo(res.data.data);
        })
        .catch((err) => {
          throw err;
        });
    };
    p();
  }, []);

  const handleClickPost = (boolean, id) => {
    if (boolean) {
      setClickModal(true);
      window.history.pushState(null, "", `/post/${id}`);
    } else {
      setClickModal(false);
      window.history.pushState(null, "", `/posts`);
    }
  };

  const handleChange = (page) => {
    setCurrent(page);
    setMinIndex((page - 1) * pageSize);
    setMaxIndex((maxIndex = page * pageSize));
  };

  return (
    <>
      <div className="blockhere"> </div>
      <div className="mainPage">
        <Nav />
        <Iconlist />

        <div className="newblockPosition"> </div>
        {userinfo.userInfo ? (
          <div className="middleSpace">
            <div className="midContents">
              <div className="buttonHeader">
                <div className="profileTitleName">
                  {userinfo.userInfo.name}'s profile
                </div>
              </div>

              <div className="midContentDownPart">
                <div className="displayPosition">
                  <div className="fixedSize">
                    <img
                      src={userinfo.userInfo.mainPic}
                      className="testPic"
                      alt=""
                    />
                  </div>
                  <div className="fixedContent">
                    <p className="name">{userinfo.userInfo.name}</p>
                    <ul>
                      <strong>생년월일</strong>
                      <li className="dob">{userinfo.userInfo.dob}</li>
                      <strong>이메일</strong>
                      <li className="email">{userinfo.userInfo.email}</li>
                      {userinfo.userInfo.role === "actor" ? (
                        <>
                          <strong>소속사</strong>
                          <li className="company">
                            {userinfo.userInfo.company}
                          </li>
                        </>
                      ) : (
                        <>
                          <strong>회사</strong>
                          <li className="company">
                            {userinfo.userInfo.recruiter.bName}
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="careerTitle">Career 🏆</div>
                <div className="careerContent">
                  <div className="career">
                    {userinfo.userInfo.careers.map((career) => {
                      return (
                        <li key={career._id}>
                          {`${career.year}` +
                            ` ${career.title}` +
                            ` / ` +
                            `${career.type}`}
                        </li>
                      );
                    })}
                  </div>
                </div>
                <div className="slider-img-box">
                  <div className="postsGallery">
                    {userPost.posts
                      ? userPost.posts.map((post, index) => {
                          return (
                            index >= minIndex &&
                            index < maxIndex && (
                              <>
                                <div
                                  className="galleryComponents"
                                  onClick={() =>
                                    handleClickPost(true, post._id)
                                  }
                                >
                                  {post.media[0].type === "img" ? (
                                    <img
                                      className="postGallery-img"
                                      key={post._id}
                                      src={post.media[0].path}
                                      onClick={() =>
                                        handleClickPost(true, post._id)
                                      }
                                    ></img>
                                  ) : (
                                    <video
                                      className="postGallery-img"
                                      key={post._id}
                                      src={post.media[0].path}
                                      onClick={() =>
                                        handleClickPost(true, post._id)
                                      }
                                    ></video>
                                  )}
                                </div>
                              </>
                            )
                          );
                        })
                      : null}

                    {clickModal ? (
                      <Post handleClickPost={handleClickPost} />
                    ) : null}
                  </div>
                  <Pagination
                    pageSize={pageSize}
                    current={current}
                    total={data.length}
                    onChange={handleChange}
                  />
                </div>
                {clickModal ? <Post handleClickPost={handleClickPost} /> : null}
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
        <div className="newblockPosition2"> </div>

        <div className="rightSpace">
          <div className="iconList2"> </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Posts;
