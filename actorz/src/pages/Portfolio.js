import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import server from "../apis/server";
import { Modal } from "antd";
import Nav from "../components/Nav";
import Iconlist from "../components/Iconlist";
import Footer from "../components/Footer";
import Alert from "../components/Alert";
import ResponsiveNav from "../components/responsiveApp/ResponsiveNav";
import ResponsiveIconlistTablet from "../components/responsiveApp/ResponsiveIconlistTablet";
import ResponsiveFooter from "../components/responsiveApp/ResponsiveFooter";
import Loading from "../components/loading";
import "../styles/Portfolio.css";
import "antd/dist/antd.css";
import PortfolioEdit from "../components/portfolio/portfolio.component";
import { SaveOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { PortfolioPostBtn } from "../components/portfolio/portfolio.styles";
import Slider from "react-slick";

const settings = {
  className: "pf-select-slick",
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: false,
};

const Portfolio = () => {
  const user = useSelector((user) => user.userInfoReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [clickPfEdit, setClickPfEdit] = useState(false);
  const [myPostsData, setMyPostsData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [selectData, setSelectData] = useState([]);

  const isPc = useMediaQuery({
    query: "(min-width:1024px)",
  });

  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  const handleClickPfEdit = (boolean) => {
    setClickPfEdit(boolean);
  };

  const handleClickPortfolioPostBtn = async () => {
    setIsLoading(true);
    await server.get(`/post/user/${user.data.userInfo.id}`).then((result) => {
      setMyPostsData(result.data.data.posts);
      setIsLoading(false);
    });
    handleClickPfEdit(true);
  };

  const handleClickPostBtn = (postsData) => {
    setSelectData(postsData);
  };

  const handleClickSaveBtn = async () => {
    if (!selectData[0]) return noSaveModal();
    setIsLoading(true);

    const bodyData = {
      posts: selectData,
    };
    const headers = {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    if (!postsData[0]) {
      return await server
        .post(`portfolio/${user.data.userInfo.id}/create`, bodyData, {
          headers,
        })
        .then(() => {
          setIsLoading(false);
          saveModal();
        });
    }
    await server
      .post(`portfolio/${user.data.userInfo.id}/update`, bodyData, { headers })
      .then(() => {
        setIsLoading(false);
        saveModal();
      });
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    const headers = {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    await server
      .post(`/portfolio/${user.data.userInfo.id}/delete`, null, { headers })
      .then(() => {
        setIsLoading(false);
        deleteModal();
      });
  };

  const isNotLoginModal = () => {
    return (
      <Alert
        content="로그인 후 이용 가능합니다."
        handleClickBtn={() => (window.location = "./mainpage")}
      />
    );
  };

  const noSaveModal = () => {
    Modal.warning({
      title: "저장 실패",
      content: "포스트 선택 후 저장 가능합니다.",
    });
  };

  const saveModal = () => {
    Modal.success({
      title: "저장 완료",
      content: "정상적으로 저장 되었습니다.",
      onOk() {
        window.location = "/portfolio";
      },
    });
  };

  const deleteModal = () => {
    Modal.success({
      title: "삭제 완료",
      content: "정상적으로 삭제 되었습니다.",
      onOk() {
        window.location = "/portfolio";
      },
    });
  };

  useEffect(() => {
    setIsLoading(true);
    server.get(`/portfolio/${user.data.userInfo.id}`).then((result) => {
      setIsLoading(false);
      if (!result.data) {
        return setPostsData([]);
      }
      setPostsData(result.data.data.portfolio.posts);
    });
  }, [user]);

  return (
    <>
      {isPc && (
        <>
          {!isLoading ? (
            <>
              {user.isLogin ? (
                <>
                  <div className="mainPage">
                    <Nav />
                    <Iconlist />

                    <div className="middleSpace">
                      <div className="midContents">
                        <div className="buttonHeader">
                          <div className="profileTitleName">
                            {user.data.userInfo.name}'s portfolio
                          </div>

                          <div className="profileButtonAll">
                            {selectData[0] ? (
                              postsData[0] ? (
                                <>
                                  <EditOutlined
                                    className="editButton"
                                    onClick={() =>
                                      handleClickPortfolioPostBtn()
                                    }
                                  />
                                  <SaveOutlined
                                    className="editButton"
                                    onClick={() => handleClickSaveBtn()}
                                  />
                                  <DeleteOutlined
                                    className="deleteButton"
                                    onClick={() => handleDeleteAccount()}
                                  />
                                </>
                              ) : (
                                <>
                                  <EditOutlined
                                    className="editButton"
                                    onClick={() =>
                                      handleClickPortfolioPostBtn()
                                    }
                                  />
                                  <SaveOutlined
                                    className="editButton"
                                    onClick={() => handleClickSaveBtn()}
                                  />
                                </>
                              )
                            ) : postsData[0] ? (
                              <>
                                <EditOutlined
                                  className="editButton"
                                  onClick={() => handleClickPortfolioPostBtn()}
                                />
                                <DeleteOutlined
                                  className="deleteButton"
                                  onClick={() => handleDeleteAccount()}
                                />
                              </>
                            ) : (
                              <>
                                <SaveOutlined
                                  className="editButton"
                                  onClick={() => handleClickSaveBtn()}
                                />
                              </>
                            )}
                          </div>
                        </div>

                        <div className="midContentDownPart">
                          <div className="displayPosition">
                            <div className="pf fixedSize">
                              <img
                                alt="testPic"
                                src={user.data.userInfo.mainPic}
                                className="pf testPic"
                              />
                            </div>

                            <div className="pf fixedContent">
                              <ul>
                                <div className="pf nameTitle">
                                  {user.data.userInfo.name}
                                </div>
                                <strong>생년월일</strong>
                                <li className="dob">
                                  {user.data.userInfo.dob.split("T")[0]}
                                </li>
                                <strong>이메일</strong>
                                <li className="email">
                                  {user.data.userInfo.email}
                                </li>
                                <strong>소속사</strong>
                                {user.data.userInfo.company ? (
                                  <li className="company">
                                    {user.data.userInfo.company}
                                  </li>
                                ) : (
                                  <li className="company"></li>
                                )}
                              </ul>
                            </div>
                          </div>
                          <div className="pf careerTitle">Career </div>
                          <div className="careerContent">
                            {user.data.userInfo.careers ? (
                              <div className="career">
                                {user.data.userInfo.careers.map((career) => {
                                  return (
                                    <li>
                                      {`${career.year.split("T")[0]}` +
                                        ` ${career.title}` +
                                        ` / ` +
                                        `${career.type}`}
                                    </li>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="career"></div>
                            )}
                          </div>

                          <div className="pf postsTitle">Posts </div>
                          <div className="portFolioEdit">
                            {selectData[0] ? (
                              selectData.map((post) => {
                                return (
                                  <div
                                    key={post._id}
                                    className="pf pf-post-container"
                                  >
                                    <Slider {...settings}>
                                      {post.media.map((data) =>
                                        data.type === "img" ? (
                                          <img
                                            key={data._id}
                                            className="pf selectImg"
                                            src={data.path}
                                            alt="post img"
                                          />
                                        ) : (
                                          <video
                                            controls
                                            key={data._id}
                                            className="pf selectVideo"
                                            src={data.path}
                                          />
                                        )
                                      )}
                                    </Slider>
                                    <div className="pf postHeader">
                                      <label>{post.content}</label>
                                    </div>
                                  </div>
                                );
                              })
                            ) : postsData[0] ? (
                              postsData.map((post) => {
                                return (
                                  <div
                                    key={post._id}
                                    className="pf pf-post-container"
                                  >
                                    <Slider {...settings}>
                                      {post.media.map((data) =>
                                        data.type === "img" ? (
                                          <img
                                            key={data._id}
                                            className="pf selectImg"
                                            src={data.path}
                                            alt="post img"
                                          />
                                        ) : (
                                          <video
                                            controls
                                            key={data._id}
                                            className="pf selectVideo"
                                            src={data.path}
                                          />
                                        )
                                      )}
                                    </Slider>
                                    <div className="pf postHeader">
                                      <label> {post.content}</label>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <>
                                <PortfolioPostBtn
                                  type="button"
                                  onClick={handleClickPortfolioPostBtn}
                                >
                                  <i className="fas fa-paste"></i>
                                  <span>Portfolio 등록</span>
                                </PortfolioPostBtn>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {clickPfEdit ? (
                      <div>
                        <PortfolioEdit
                          handleClickPfEdit={handleClickPfEdit}
                          myPostsData={myPostsData}
                          clickPostBtn={handleClickPostBtn}
                          isLoading={isLoading}
                        />
                      </div>
                    ) : null}
                  </div>
                  <Footer />
                </>
              ) : (
                <Alert
                  content="로그인 후 이용 가능합니다."
                  handleClickBtn={() => (window.location = "./mainpage")}
                />
              )}
            </>
          ) : (
            <Loading />
          )}
        </>
      )}
      {isTablet && (
        <>
          {!isLoading ? (
            <>
              {localStorage.getItem("accessToken") ? (
                <>
                  <div className="mainPageResponsive">
                    <Nav />
                    <ResponsiveIconlistTablet />

                    <div className="pf middleSpace2">
                      <div className="midContents">
                        <div className="buttonHeader">
                          <div className="profileTitleName">
                            {user.data.userInfo.name}'s portfolio
                          </div>

                          <div className="profileButtonAll">
                            {selectData[0] ? (
                              postsData[0] ? (
                                <>
                                  <EditOutlined
                                    className="editButton"
                                    onClick={() =>
                                      handleClickPortfolioPostBtn()
                                    }
                                  />
                                  <SaveOutlined
                                    className="editButton"
                                    onClick={() => handleClickSaveBtn()}
                                  />
                                  <DeleteOutlined
                                    className="deleteButton"
                                    onClick={() => handleDeleteAccount()}
                                  />
                                </>
                              ) : (
                                <>
                                  <EditOutlined
                                    className="editButton"
                                    onClick={() =>
                                      handleClickPortfolioPostBtn()
                                    }
                                  />
                                  <SaveOutlined
                                    className="editButton"
                                    onClick={() => handleClickSaveBtn()}
                                  />
                                </>
                              )
                            ) : postsData[0] ? (
                              <>
                                <EditOutlined
                                  className="editButton"
                                  onClick={() => handleClickPortfolioPostBtn()}
                                />
                                <DeleteOutlined
                                  className="deleteButton"
                                  onClick={() => handleDeleteAccount()}
                                />
                              </>
                            ) : (
                              <>
                                <SaveOutlined
                                  className="editButton"
                                  onClick={() => handleClickSaveBtn()}
                                />
                              </>
                            )}
                          </div>
                        </div>

                        <div className="midContentDownPart">
                          <div className="displayPosition">
                            <div className="pf fixedSize">
                              <img
                                alt="testPic"
                                src={user.data.userInfo.mainPic}
                                className="pf testPic"
                              />
                            </div>

                            <div className="pf fixedContent">
                              <ul>
                                <div className="pf nameTitle">
                                  {user.data.userInfo.name}
                                </div>
                                <strong>생년월일</strong>
                                <li className="dob">
                                  {user.data.userInfo.dob.split("T")[0]}
                                </li>
                                <strong>이메일</strong>
                                <li className="email">
                                  {user.data.userInfo.email}
                                </li>
                                <strong>소속사</strong>
                                {user.data.userInfo.company ? (
                                  <li className="company">
                                    {user.data.userInfo.company}
                                  </li>
                                ) : (
                                  <li className="company"></li>
                                )}
                              </ul>
                            </div>
                          </div>
                          <div className="pf careerTitle">Career </div>
                          <div className="careerContent">
                            {user.data.userInfo.careers ? (
                              <div className="career">
                                {user.data.userInfo.careers.map((career) => {
                                  return (
                                    <li>
                                      {`${career.year.split("T")[0]}` +
                                        ` ${career.title}` +
                                        ` / ` +
                                        `${career.type}`}
                                    </li>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="career"></div>
                            )}
                          </div>

                          <div className="pf postsTitle">Posts </div>
                          <div className="portFolioEdit">
                            {selectData[0] ? (
                              selectData.map((post) => {
                                return (
                                  <div key={post._id}>
                                    <Slider {...settings}>
                                      {post.media.map((data) =>
                                        data.type === "img" ? (
                                          <img
                                            key={data._id}
                                            className="pf selectImg"
                                            src={data.path}
                                            alt="post img"
                                          />
                                        ) : (
                                          <video
                                            controls
                                            key={data._id}
                                            className="pf selectVideo"
                                            src={data.path}
                                          />
                                        )
                                      )}
                                    </Slider>
                                    <div className="pf postHeader">
                                      <label>{post.content}</label>
                                    </div>
                                  </div>
                                );
                              })
                            ) : postsData[0] ? (
                              postsData.map((post) => {
                                return (
                                  <div key={post._id}>
                                    <Slider {...settings}>
                                      {post.media.map((data) =>
                                        data.type === "img" ? (
                                          <img
                                            key={data._id}
                                            className="pf selectImg"
                                            src={data.path}
                                            alt="post img"
                                          />
                                        ) : (
                                          <video
                                            controls
                                            key={data._id}
                                            className="pf selectVideo"
                                            src={data.path}
                                          />
                                        )
                                      )}
                                    </Slider>
                                    <div className="pf postHeader">
                                      <label>{post.content}</label>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <>
                                <PortfolioPostBtn
                                  type="button"
                                  onClick={handleClickPortfolioPostBtn}
                                >
                                  <i className="fas fa-paste"></i>
                                  <span>Portfolio 등록</span>
                                </PortfolioPostBtn>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {clickPfEdit ? (
                      <div>
                        <PortfolioEdit
                          handleClickPfEdit={handleClickPfEdit}
                          myPostsData={myPostsData}
                          clickPostBtn={handleClickPostBtn}
                          isLoading={isLoading}
                        />
                      </div>
                    ) : null}
                  </div>
                </>
              ) : (
                isNotLoginModal()
              )}
            </>
          ) : (
            <Loading />
          )}
        </>
      )}
      {isMobile && (
        <>
          {!isLoading ? (
            <>
              {localStorage.getItem("accessToken") ? (
                <>
                  <div className="mainPageResponsive2">
                    <ResponsiveNav />

                    <div className="middleSpace3">
                      <div className="midContents">
                        <div className="buttonHeader">
                          <div className="profileTitleName">
                            {user.data.userInfo.name}'s portfolio
                          </div>

                          <div className="profileButtonAll">
                            {selectData[0] ? (
                              postsData[0] ? (
                                <>
                                  <EditOutlined
                                    className="editButton"
                                    onClick={() =>
                                      handleClickPortfolioPostBtn()
                                    }
                                  />
                                  <SaveOutlined
                                    className="editButton"
                                    onClick={() => handleClickSaveBtn()}
                                  />
                                  <DeleteOutlined
                                    className="deleteButton"
                                    onClick={() => handleDeleteAccount()}
                                  />
                                </>
                              ) : (
                                <>
                                  <EditOutlined
                                    className="editButton"
                                    onClick={() =>
                                      handleClickPortfolioPostBtn()
                                    }
                                  />
                                  <SaveOutlined
                                    className="editButton"
                                    onClick={() => handleClickSaveBtn()}
                                  />
                                </>
                              )
                            ) : postsData[0] ? (
                              <>
                                <EditOutlined
                                  className="editButton"
                                  onClick={() => handleClickPortfolioPostBtn()}
                                />
                                <DeleteOutlined
                                  className="deleteButton"
                                  onClick={() => handleDeleteAccount()}
                                />
                              </>
                            ) : (
                              <>
                                <SaveOutlined
                                  className="editButton"
                                  onClick={() => handleClickSaveBtn()}
                                />
                              </>
                            )}
                          </div>
                        </div>

                        <div className="midContentDownPart">
                          <div className="displayPosition">
                            <div className="pf fixedSize">
                              <img
                                alt="testPic"
                                src={user.data.userInfo.mainPic}
                                className="pf testPic"
                              />
                            </div>

                            <div className="pf fixedContent">
                              <ul>
                                <div className="pf nameTitle">
                                  {user.data.userInfo.name}
                                </div>
                                <strong>생년월일</strong>
                                <li className="dob">
                                  {user.data.userInfo.dob.split("T")[0]}
                                </li>
                                <strong>이메일</strong>
                                <li className="email">
                                  {user.data.userInfo.email}
                                </li>
                                <strong>소속사</strong>
                                {user.data.userInfo.company ? (
                                  <li className="company">
                                    {user.data.userInfo.company}
                                  </li>
                                ) : (
                                  <li className="company"></li>
                                )}
                              </ul>
                            </div>
                          </div>
                          <div className="pf careerTitle">Career </div>
                          <div className="careerContent">
                            {user.data.userInfo.careers ? (
                              <div className="career">
                                {user.data.userInfo.careers.map((career) => {
                                  return (
                                    <li>
                                      {`${career.year.split("T")[0]}` +
                                        ` ${career.title}` +
                                        ` / ` +
                                        `${career.type}`}
                                    </li>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="career"></div>
                            )}
                          </div>

                          <div className="pf postsTitle">Posts </div>
                          <div className="portFolioEdit">
                            {selectData[0] ? (
                              selectData.map((post) => {
                                return (
                                  <div key={post._id}>
                                    <Slider {...settings}>
                                      {post.media.map((data) =>
                                        data.type === "img" ? (
                                          <img
                                            key={data._id}
                                            className="pf selectImg"
                                            src={data.path}
                                            alt="post img"
                                          />
                                        ) : (
                                          <video
                                            controls
                                            key={data._id}
                                            className="pf selectVideo"
                                            src={data.path}
                                          />
                                        )
                                      )}
                                    </Slider>
                                    <div className="pf postHeader">
                                      <label>{post.content}</label>
                                    </div>
                                  </div>
                                );
                              })
                            ) : postsData[0] ? (
                              postsData.map((post) => {
                                return (
                                  <div key={post._id}>
                                    <Slider {...settings}>
                                      {post.media.map((data) =>
                                        data.type === "img" ? (
                                          <img
                                            key={data._id}
                                            className="pf selectImg"
                                            src={data.path}
                                            alt="post img"
                                          />
                                        ) : (
                                          <video
                                            controls
                                            key={data._id}
                                            className="pf selectVideo"
                                            src={data.path}
                                          />
                                        )
                                      )}
                                    </Slider>
                                    <div className="pf postHeader">
                                      <label>{post.content}</label>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <>
                                <PortfolioPostBtn
                                  type="button"
                                  onClick={handleClickPortfolioPostBtn}
                                >
                                  <i className="fas fa-paste"></i>
                                  <span>Portfolio 등록</span>
                                </PortfolioPostBtn>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {clickPfEdit ? (
                      <div>
                        <PortfolioEdit
                          handleClickPfEdit={handleClickPfEdit}
                          myPostsData={myPostsData}
                          clickPostBtn={handleClickPostBtn}
                          isLoading={isLoading}
                        />
                      </div>
                    ) : null}
                  </div>
                  <ResponsiveFooter />
                </>
              ) : (
                isNotLoginModal()
              )}
            </>
          ) : (
            <Loading />
          )}
        </>
      )}
    </>
  );
};

export default Portfolio;
