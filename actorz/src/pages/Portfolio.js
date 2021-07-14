import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import server from "../apis/server";
import { Modal } from 'antd';
import Nav from "../components/Nav";
import Iconlist from "../components/Iconlist";
import Footer from "../components/Footer";

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
  speed: 500,
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

  // post modal 창 띄우기 유무
  const handleClickPfEdit = (boolean) => {
    setClickPfEdit(boolean);
  };

  // portfolio post button 클릭
  const handleClickPortfolioPostBtn = async () => {
    setIsLoading(true);
    await server.get(`/post/user/${user.data.userInfo.id}`)
    .then((result) => {
      setMyPostsData(result.data.data.posts);
      setIsLoading(false);
    });
    handleClickPfEdit(true);
  };

  // modal post button 클릭
  const handleClickPostBtn = (postsData) => {
    setSelectData(postsData);
  };

  // save icon 클릭
  const handleClickSaveBtn = async () => {
    if(!selectData[0]) return noSaveModal();
    setIsLoading(true);

    const bodyData = {
      posts: selectData
    };
    const headers = {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`
    };
    // portfolio를 생성한 적이 없다면, 생성 요청
    if(!postsData[0]){
      return await server.post(`portfolio/${user.data.userInfo.id}/create`, bodyData, { headers })
      .then(() => {
        setIsLoading(false);
        saveModal();
      });
    };
    // portfolio 업데이트 요청
    await server.post(`portfolio/${user.data.userInfo.id}/update`, bodyData, { headers })
    .then(() => {
      setIsLoading(false);
      saveModal();
    });
  };

  // portfolio 삭제 요청
  const handleDeleteAccount = async () => {
    setIsLoading(true);
    const headers = {
      authorization: `Bearer ${localStorage.getItem("accessToken")}`
    };
    await server.post(`/portfolio/${user.data.userInfo.id}/delete`, null, { headers })
    .then(() => {
      setIsLoading(false);
      deleteModal();
    });
  };
  
  // 미로그인시 모달 경고창
  const isNotLoginModal = () => {
    Modal.warning({
      title: '접근 실패',
      content: '로그인 후 이용 가능합니다.',
      onOk(){window.location = "/mainpage";}
    });
  };
  
  // post 미 선택시, 경고 모달
  const noSaveModal = () => {
    Modal.warning({
      title: '저장 실패',
      content: '포스트 선택 후 저장 가능합니다.'
    });
  };

  // 저장 완료 모달창
  const saveModal = () => {
    Modal.success({
      title: '저장 완료',
      content: '정상적으로 저장 되었습니다.',
      onOk(){window.location = "/portfolio";}
    });
  };

  // 삭제 완료 모달창
  const deleteModal = () => {
    Modal.success({
      title: '삭제 완료',
      content: '정상적으로 삭제 되었습니다.',
      onOk(){window.location = "/portfolio";}
    });
  };

  // portfolio page 접근시, portfolio 정보 요청
  useEffect(() => {
    setIsLoading(true);
    server.get(`/portfolio/${user.data.userInfo.id}`)
    .then((result) => {
      setIsLoading(false);
      if(!result.data){
        return setPostsData([]);
      };
      setPostsData(result.data.data.portfolio.posts);
    });
  }, [user]);

  return (
    <>
      {!isLoading ? (
        <>
          {localStorage.getItem("accessToken") ? (
            <>
              <Nav />
              <>
                <div className="blockhere"> </div>
                <div className="mainPage">
                  <Nav />
                  <Iconlist />

                  <div className="newblockPosition"> </div>

                  <div className="middleSpace">
                    <div className="midContents">
                      <div className="buttonHeader">
                        <div className="profileTitleName">
                          {user.data.userInfo.name}'s portfolio
                        </div>

                        <div className="profileButtonAll">
                          {selectData[0] ? 
                            postsData[0] ? (
                              <>
                                <EditOutlined
                                  className="editButton"
                                  onClick={() => handleClickPortfolioPostBtn()}
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
                                  onClick={() => handleClickPortfolioPostBtn()}
                                />
                                <SaveOutlined 
                                  className="editButton"
                                  onClick={() => handleClickSaveBtn()}
                                />  
                              </>
                            ) :
                            postsData[0] ? (
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
                            )
                          }
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
                        {/* 영화랑 드라마 경력 나눌꺼면 여기서 */}
                        <div className="pf careerTitle">Career </div>
                        {/* <div className="iconTitle">🏆</div> */}
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
                          {selectData[0] ? 
                            selectData.map((post) => {
                              return (
                                <div key={post._id}>
                                  <Slider {...settings}>
                                    {post.media.map((data) => data.type === "img" ? 
                                      <img 
                                        key={data._id}
                                        className="pf selectImg"
                                        src={data.path}
                                        alt="post img"
                                      /> : 
                                      <video
                                        controls
                                        key={data._id}
                                        className="pf selectVideo"
                                        src={data.path}
                                      />
                                    )}
                                  </Slider>
                                  <div className="pf postHeader">
                                    <label>{post.content}</label>
                                  </div>
                                </div> 
                              )
                            }) : 
                            postsData[0] ?
                              postsData.map((post) => {
                                return (
                                  <div key={post._id}>
                                    <Slider {...settings}>
                                      {post.media.map((data) => data.type === "img" ? 
                                        <img 
                                          key={data._id}
                                          className="pf selectImg"
                                          src={data.path}
                                          alt="post img"
                                        /> : 
                                        <video
                                          controls
                                          key={data._id}
                                          className="pf selectVideo"
                                          src={data.path}
                                        />
                                      )}
                                    </Slider>
                                    <div className="pf postHeader">
                                      <label>{post.content}</label>
                                    </div>
                                  </div> 
                                )
                              }) : (
                              <>
                                <PortfolioPostBtn type="button" onClick={handleClickPortfolioPostBtn}>
                                  <i className="fas fa-paste"></i>
                                  <span>Portfolio 등록</span>
                                </PortfolioPostBtn>
                              </>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="newblockPosition2"> </div>

                  <div className="rightSpace">
                    <div className="iconList2"> </div>
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
            </>
          ) : (
            isNotLoginModal()
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Portfolio;
