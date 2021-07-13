import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import server from "../apis/server";
import axios from "axios";

import Nav from "../components/Nav";
import Iconlist from "../components/Iconlist";
import Footer from "../components/Footer";

import Loading from "../components/loading";

import "../styles/Portfolio.css";
import "antd/dist/antd.css";
import PortfolioEdit from "../components/portfolio/portfolio.component";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";


import { PortfolioPostBtn } from "../components/portfolio/portfolio.styles";



const Portfolio = () => {
  const user = useSelector((user) => user.userInfoReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [postsData, setPostsData] = useState([]);
  const [clickPfEdit, setClickPfEdit] = useState(false);




  const handleClickPfEdit = (boolean) => {
    setClickPfEdit(boolean);
  };





  const handleDeleteAccount = async () => {
    console.log("delete portfolio");
    // await server
    //   .get(`/user/${localStorage.getItem("id")}/delete`, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //     },
    //   })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       console.log("회원탈퇴");
    //       localStorage.removeItem("accessToken");
    //       localStorage.removeItem("id");
    //       window.location = "/mainpage";
    //     }
    //   })
    //   .catch((err) => {
    //     throw err;
    //   });
  };

  const handeClickEditBtn = () => {
    console.log("edit portfolio");
    // edit modal창 띄우기
  };

  const redirectPage = () => {
    alert("로그인 후 이용 가능합니다.");
    window.location = "/mainpage";
  };

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
                          {postsData[0] ? 
                            <>
                              <EditOutlined
                                className="editButton"
                                onClick={() => handeClickEditBtn(true)}
                              />
                              <DeleteOutlined
                                className="deleteButton"
                                onClick={() => handleDeleteAccount()}
                              />
                            </> : null}
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
                        <div className="careerTitle">Career </div>
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

                        <div className="postsTitle">Posts </div>
                        <div className="portFolioEdit">
                          {postsData[0] ? 
                            <>
                            </> :
                            <>
                              <PortfolioPostBtn type="button" onClick={() => handleClickPfEdit(true)}>
                                <i class="fas fa-paste"></i>
                                <span>Portfolio 등록</span>
                              </PortfolioPostBtn>
                            </>
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
                      <form onSubmit={() => console.log("submit")}>
                        <PortfolioEdit
                        handleClickPfEdit={handleClickPfEdit}
                        isLoading={isLoading}
                        />
                      </form>
                    </div> 
                  ) : null}
                </div>
                <Footer />
              </>
            </>
          ) : (
            redirectPage()
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};
export default Portfolio;
