import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import server from "../apis/server";
import Nav from "../components/Nav";
import Post from "./Post";
import MypageEdit from "./MypageEdit";
import Iconlist from "../components/Iconlist";
import Footer from "../components/Footer";
import ResponsiveNav from "../components/responsiveApp/ResponsiveNav";
import ResponsiveFooter from "../components/responsiveApp/ResponsiveFooter";
import ResponsiveIconlistTablet from "../components/responsiveApp/ResponsiveIconlistTablet";
import { Tabs, Pagination } from "antd";
import { StickyContainer, Sticky } from "react-sticky";
import { EditOutlined } from "@ant-design/icons";
import "../styles/Mypage.css";
import Alert from "../components/Alert";
import "antd/dist/antd.css";

const { TabPane } = Tabs;

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar
        {...props}
        className="site-custom-tab-bar"
        style={{ ...style }}
      />
    )}
  </Sticky>
);

const Mypage = () => {
  const user = useSelector((user) => user.userInfoReducer);
  const post = useSelector((post) => post.postInfoReducer);

  const [isEdit, setIsEdit] = useState(false);
  const [userPost, setUserPost] = useState({});
  const [clickModal, setClickModal] = useState(false);
  const [likePost, setLikePost] = useState([]);

  let [post_data, setPostData] = useState([]);
  let [post_current, setPostCurrent] = useState(1);
  let [post_minIndex, setPostMinIndex] = useState(0);
  let [post_maxIndex, setPostMaxIndex] = useState(0);
  let post_pageSize;

  let [like_data, setLikeData] = useState([]);
  let [like_current, setLikeCurrent] = useState(1);
  let [like_minIndex, setLikeMinIndex] = useState(0);
  let [like_maxIndex, setLikeMaxIndex] = useState(0);
  let like_pageSize;

  useEffect(() => {
    const getInfo = async () => {
      await server
        .get(`/post/user/${user.data.userInfo.id}`)
        .then((res) => {
          setUserPost(res.data.data);
          setPostData(res.data.data.posts);
          setPostMinIndex(0);
          setPostMaxIndex(post_pageSize);
        })
        .catch((err) => {
          throw err;
        });

      await server
        .get(`like/${user.data.userInfo.id}`)
        .then((res) => {
          setLikePost(res.data.data.posts);
          setLikeData(res.data.data.posts);
          setLikeMinIndex(0);
          setLikeMaxIndex(like_pageSize);
        })
        .catch((err) => {
          throw err;
        });
    };
    getInfo();
  }, [post, user]);

  const handeClickEditBtn = (boolean) => {
    if (boolean) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };

  const redirectPage = () => {
    return (
      <Alert
        content="로그인 후 이용 가능합니다."
        handleClickBtn={() => (window.location = "./mainpage")}
      />
    );
  };

  const handleClickPost = (boolean, id) => {
    if (boolean) {
      setClickModal(true);
      window.history.pushState(null, "", `/post/${id}`);
    } else {
      setClickModal(false);
      window.history.pushState(null, "", `/mypage`);
    }
  };

  const handleChange = (page) => {
    setPostCurrent(page);
    setPostMinIndex((page - 1) * post_pageSize);
    setPostMaxIndex((post_maxIndex = page * post_pageSize));
  };

  const handleLikeChange = (page) => {
    setLikeCurrent(page);
    setLikeMinIndex((page - 1) * like_pageSize);
    setLikeMaxIndex((like_maxIndex = page * like_pageSize));
  };

  // if (isPc) {
  //   post_pageSize = 6;
  //   like_pageSize = 6;
  // } else if (isTablet) {
  //   post_pageSize = 8;
  //   like_pageSize = 8;
  // } else {
  //   post_pageSize = 4;
  //   like_pageSize = 4;
  // }
  post_pageSize = 6;
  like_pageSize = 6;

  return (
    <>
      {user.isLogin ? (
        <>
          {!isEdit ? (
            <>
              <ResponsiveIconlistTablet />

              <div className="mainPage">
                <Nav />
                <Iconlist />

                <div className="middleSpace">
                  <div className="midContents">
                    <div className="buttonHeader">
                      <div className="profileTitleName">
                        {user.data.userInfo.name}'s profile
                      </div>
                      <div className="profileButtonAll">
                        <EditOutlined
                          className="editButton"
                          onClick={() => handeClickEditBtn(true)}
                        />
                      </div>
                    </div>

                    <div className="midContentDownPart">
                      <div className="displayPosition">
                        <div className="fixedSize">
                          <img
                            alt="testPic"
                            src={user.data.userInfo.mainPic}
                            className="testPic"
                          />
                        </div>

                        <div className="fixedContent">
                          <ul>
                            <div className="nameTitle">
                              {user.data.userInfo.name}
                            </div>
                            <strong>생년월일</strong>
                            <li className="dob">{user.data.userInfo.dob}</li>
                            <strong>이메일</strong>
                            <li className="email">
                              {user.data.userInfo.email}
                            </li>
                            {user.data.userInfo.role === "actor" ? (
                              <>
                                <strong>소속사</strong>
                                <li className="company">
                                  {user.data.userInfo.company}
                                </li>
                              </>
                            ) : (
                              <>
                                <strong>회사</strong>
                                <li className="company">
                                  {user.data.userInfo.recruiter.bName}
                                </li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                      <div className="stickyContainerPosition">
                        <StickyContainer>
                          <Tabs
                            defaultActiveKey="1"
                            renderTabBar={renderTabBar}
                            centered="true"
                          >
                            <TabPane tab="INFO" key="1">
                              <div className="fixedContent2">
                                <ul>
                                  <div className="nameTitle">
                                    {user.data.userInfo.name}
                                  </div>
                                  <strong>생년월일</strong>

                                  <li className="dob">
                                    {user.data.userInfo.dob}
                                  </li>

                                  <strong>이메일</strong>
                                  <li className="email">
                                    {user.data.userInfo.email}
                                  </li>
                                  {user.data.userInfo.role === "actor" ? (
                                    <>
                                      <strong>소속사</strong>
                                      {user.data.userInfo.company ? (
                                        <li className="company">
                                          {user.data.userInfo.company}
                                        </li>
                                      ) : (
                                        <li className="company"></li>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      <strong>회사</strong>
                                      {user.data.userInfo.recruiter.bName ? (
                                        <li className="email">
                                          {user.data.userInfo.recruiter.bName}
                                        </li>
                                      ) : (
                                        <li className="email"></li>
                                      )}
                                      <strong>직책</strong>
                                      {user.data.userInfo.recruiter.jobTitle ? (
                                        <li className="email">
                                          {
                                            user.data.userInfo.recruiter
                                              .jobTitle
                                          }
                                        </li>
                                      ) : (
                                        <li className="email"></li>
                                      )}
                                      <strong>회사 이메일</strong>
                                      {user.data.userInfo.recruiter.bEmail ? (
                                        <li className="email">
                                          {user.data.userInfo.recruiter.bEmail}
                                        </li>
                                      ) : (
                                        <li className="email"></li>
                                      )}
                                      <strong>회사 전화번호</strong>
                                      {user.data.userInfo.recruiter.phoneNum ? (
                                        <li className="email">
                                          {
                                            user.data.userInfo.recruiter
                                              .phoneNum
                                          }
                                        </li>
                                      ) : (
                                        <li className="email"></li>
                                      )}
                                      <strong>회사 주소</strong>
                                      {user.data.userInfo.recruiter.bAddress
                                        .city ? (
                                        <li className="email">
                                          {
                                            user.data.userInfo.recruiter
                                              .bAddress.city
                                          }
                                          <br />
                                          {
                                            user.data.userInfo.recruiter
                                              .bAddress.street
                                          }
                                          <br />
                                          {
                                            user.data.userInfo.recruiter
                                              .bAddress.zipCode
                                          }
                                        </li>
                                      ) : (
                                        <li className="email"></li>
                                      )}
                                    </>
                                  )}
                                </ul>
                              </div>
                            </TabPane>
                            <TabPane tab="POSTS" key="2">
                              <div>
                                <div className="postsGallery">
                                  {userPost.posts
                                    ? userPost.posts.map((post, index) => {
                                        return (
                                          index >= post_minIndex &&
                                          index < post_maxIndex && (
                                            <>
                                              <div
                                                key={index}
                                                className="galleryComponents"
                                                onClick={() =>
                                                  handleClickPost(
                                                    true,
                                                    post._id
                                                  )
                                                }
                                              >
                                                {post.media[0].type ===
                                                "img" ? (
                                                  <img
                                                    alt=""
                                                    className="postGallery-img"
                                                    key={post._id}
                                                    src={post.media[0].path}
                                                  ></img>
                                                ) : (
                                                  <video
                                                    className="postGallery-img"
                                                    key={post._id}
                                                    src={post.media[0].path}
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
                                  pageSize={post_pageSize}
                                  current={post_current}
                                  total={post_data.length}
                                  onChange={handleChange}
                                />
                              </div>
                            </TabPane>
                            <TabPane tab="CAREER" key="3">
                              <div className="careerContent">
                                {user.data.userInfo.careers ? (
                                  <div className="career">
                                    {user.data.userInfo.careers.map(
                                      (career) => {
                                        return (
                                          <li key={career._id}>
                                            {`${career.year.split("T")[0]}` +
                                              ` ${career.title}` +
                                              ` / ` +
                                              `${career.type}`}
                                          </li>
                                        );
                                      }
                                    )}
                                  </div>
                                ) : (
                                  <div className="career"></div>
                                )}
                              </div>
                            </TabPane>
                            <TabPane tab="LIKES" key="4">
                              <div>
                                <div className="postsGallery">
                                  {likePost
                                    ? likePost.map((post, index) => {
                                        return (
                                          index >= like_minIndex &&
                                          index < like_maxIndex && (
                                            <>
                                              <div
                                                key={index}
                                                className="galleryComponents"
                                                onClick={() =>
                                                  handleClickPost(
                                                    true,
                                                    post._id
                                                  )
                                                }
                                              >
                                                {post.media[0].type ===
                                                "img" ? (
                                                  <img
                                                    alt=""
                                                    className="postGallery-img"
                                                    key={post._id}
                                                    src={post.media[0].path}
                                                  ></img>
                                                ) : (
                                                  <video
                                                    className="postGallery-img"
                                                    key={post._id}
                                                    src={post.media[0].path}
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
                                  pageSize={like_pageSize}
                                  current={like_current}
                                  total={like_data.length}
                                  onChange={handleLikeChange}
                                />
                              </div>
                            </TabPane>
                            <TabPane tab="TAGGED" key="5">
                              컨텐츠 준비 중입니다.
                            </TabPane>
                          </Tabs>
                        </StickyContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
              <ResponsiveNav />
              <ResponsiveFooter />
            </>
          ) : (
            <MypageEdit handeClickEditBtn={handeClickEditBtn} />
          )}
        </>
      ) : (
        redirectPage()
      )}
    </>
  );
};
export default Mypage;
