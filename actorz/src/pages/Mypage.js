import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import server from "../apis/server";
import Nav from "../components/Nav";
import ResponsiveNav from "../components/responsiveApp/ResponsiveNav";
import MypageEdit from "./MypageEdit";
import Iconlist from "../components/Iconlist";
import Footer from "../components/Footer";
import FooterFixed from "../components/FooterFixed";
import "../styles/Mypage.css";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Loading from "../components/loading";
import { Tabs } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import { useMediaQuery } from "react-responsive";
import ResponsiveFooter from "../components/responsiveApp/ResponsiveFooter";
import ResponsiveIconlistTablet from "../components/responsiveApp/ResponsiveIconlistTablet";

const { TabPane } = Tabs;

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
    )}
  </Sticky>
);

const Mypage = () => {
  const user = useSelector((user) => user.userInfoReducer);
  // const dispatch = useDispatch();
  // const [userinfo, setUserinfo] = useState({});
  // const [clickupload, setClickUpload] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  //console.log('user정보: '+user.data.userInfo);

  //useEffect(() => getUser(), []);

  const handleDeleteAccount = async () => {
    await server
      .get(`/user/${localStorage.getItem("id")}/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("회원탈퇴");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("id");
          window.location = "/mainpage";
        }
      })
      .catch((err) => {
        throw err;
      });
  };
  
  const isPc = useMediaQuery({
    query : "(min-width:1024px)"
  });

  const isTablet = useMediaQuery({
    query : "(min-width:768px) and (max-width:1023px)"
  });

  const isMobile = useMediaQuery({
    query : "(max-width:767px)"
  });

  const [newfile, setNewFile] = useState({
    profileImages: [],
  });

  const handeClickEditBtn = (boolean) => {
    if (boolean) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };

  // const handleClickUpload = (boolean) => {
  //   if (boolean) {
  //     setClickUpload(true);
  //   } else {
  //     setClickUpload(false);
  //   }
  // };

  // const updateUploadedFiles = (files) =>
  //   setNewFile({ ...newfile, profileImages: files });

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // 여기에 이미지 올리는 로직 작성해야 함
  // };

  const redirectPage = () => {
    alert("로그인 후 이용 가능합니다.");
    window.location = "/mainpage";
  };
  //console.log(user); //여기에 서버에서 가져온 유저 정보가 담겨있음.
  //console.log(userinfo);

  return (
    <>
      {isPc && 
        <>
        {!isloading ? (
          <>
            {localStorage.getItem("accessToken") ? (
              <>
                <Nav />
                {!isEdit ? (
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
                                {user.data.userInfo.name}'s profile
                            </div>
                            <div className="profileButtonAll">
                              <EditOutlined
                                className="editButton"
                                onClick={() => handeClickEditBtn(true)}
                              />
                              <DeleteOutlined
                                className="deleteButton"
                                onClick={() => handleDeleteAccount()}
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
                                  <li className="dob">
                                    {user.data.userInfo.dob}
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
                          <div className="stickyContainerPosition">
                            <StickyContainer>
                              <Tabs defaultActiveKey="1" renderTabBar={renderTabBar} centered="true">
                              <TabPane tab="INFO" key="1">
                                <div className="fixedContent2">
                                  <div className="nameTitle">{user.data.userInfo.name}</div>
                                  <ul>
                                    <strong>생년월일</strong>
                                    <li className="dob">{user.data.userInfo.dob}</li>
                                    <strong>이메일</strong>
                                    <li className="email">{user.data.userInfo.email}</li>
                                    <strong>소속사</strong>
                                    <li className="company">{user.data.userInfo.company}</li>
                                  </ul>
                                </div> 
                              </TabPane>
                              <TabPane tab="POSTS" key="2" >
                                <div>
                                  <div className="postsGallery">
                                    <div className="galleryComponents">1</div>
                                    <div className="galleryComponents">2</div>
                                    <div className="galleryComponents">3</div>
                                  </div>
  
                                  <div className="postsGallery">
                                    <div className="galleryComponents">4</div>
                                    <div className="galleryComponents">5</div>
                                    <div className="galleryComponents">6</div>
                                  </div>
  
                                  <div className="postsGallery">
                                    <div className="galleryComponents">7</div>
                                    <div className="galleryComponents">8</div>
                                    <div className="galleryComponents">9</div>
                                  </div>
                                </div>
  
                                <div className="nextpageBtn"> 일단 버튼은 놔두기</div>
                              </TabPane>
                                <TabPane tab="CAREER" key="3">
                                  <div className="careerContent">
                                    {user.data.userInfo.careers ? (
                                      <div className="career">
                                        {user.data.userInfo.careers.map((career) => {
                                          return (
                                            <li>
                                              {`${career.year}` +
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
                                </TabPane>
                                <TabPane tab="LIKES" key="4">
                                  좋아요 했던 게시물들 모아보는 공간
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
                      <div className="newblockPosition2"> </div>
  
                      <div className="rightSpace">
                        <div className="iconList2"> </div>
                      </div>
                    </div>
                    <Footer />
                  </>
                ) : (
                  <MypageEdit handeClickEditBtn={handeClickEditBtn} />
                )}
              </>
            ) : (
              redirectPage()
            )}
          </>
        ) : (
          <Loading />
        )}
      </>
      }

      {isTablet && 
        <>
        {!isloading ? (
          <>
            {localStorage.getItem("accessToken") ? (
              <>
                <Nav />
                {!isEdit ? (
                  <>
                    <div className="blockhere"> </div>
                    <div className="mainPage">
                      <Nav />
                      <ResponsiveIconlistTablet />
                     
  
                      <div className="newblockPosition"> </div>
  
                      <div className="middleSpace2">
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
                              <DeleteOutlined
                                className="deleteButton"
                                onClick={() => handleDeleteAccount()}
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
                                  <li className="dob">
                                    {user.data.userInfo.dob}
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
                          <div className="stickyContainerPosition">
                            <StickyContainer>
                              <Tabs defaultActiveKey="1" renderTabBar={renderTabBar} centered="true">
                              <TabPane tab="INFO" key="1">
                                <div className="fixedContent2">
                                  <div className="nameTitle">{user.data.userInfo.name}</div>
                                  <ul>
                                    <strong>생년월일</strong>
                                    <li className="dob">{user.data.userInfo.dob}</li>
                                    <strong>이메일</strong>
                                    <li className="email">{user.data.userInfo.email}</li>
                                    <strong>소속사</strong>
                                    <li className="company">{user.data.userInfo.company}</li>
                                  </ul>
                                </div> 
                              </TabPane>
                              <TabPane tab="POSTS" key="2" >
                                <div>
                                  <div className="postsGallery">
                                    <div className="galleryComponents">1</div>
                                    <div className="galleryComponents">2</div>
                                    <div className="galleryComponents">3</div>
                                  </div>
  
                                  <div className="postsGallery">
                                    <div className="galleryComponents">4</div>
                                    <div className="galleryComponents">5</div>
                                    <div className="galleryComponents">6</div>
                                  </div>
  
                                  <div className="postsGallery">
                                    <div className="galleryComponents">7</div>
                                    <div className="galleryComponents">8</div>
                                    <div className="galleryComponents">9</div>
                                  </div>
                                </div>
  
                                <div className="nextpageBtn"> 일단 버튼은 놔두기</div>
                              </TabPane>
                                <TabPane tab="CAREER" key="3">
                                  <div className="careerContent">
                                    {user.data.userInfo.careers ? (
                                      <div className="career">
                                        {user.data.userInfo.careers.map((career) => {
                                          return (
                                            <li>
                                              {`${career.year}` +
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
                                </TabPane>
                                <TabPane tab="LIKES" key="4">
                                  좋아요 했던 게시물들 모아보는 공간
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
                      <div className="responsiveNewblockPosition2"> </div>
                    </div>
                    
                    <FooterFixed />
                  </>
                ) : (
                  <MypageEdit handeClickEditBtn={handeClickEditBtn} />
                )}
              </>
            ) : (
              redirectPage()
            )}
          </>
        ) : (
          <Loading />
        )}
      </>
      }

      {isMobile && 
        <>
        {!isloading ? (
          <>
            {localStorage.getItem("accessToken") ? (
              <>
                <ResponsiveNav />
                {!isEdit ? (
                  <>
                    <div className="blockhere"> </div>
                    <div className="mainPage">
                      <ResponsiveNav />
                      <ResponsiveFooter /> 
  
                      <div className="newblockPosition"> </div>
  
                      <div className="middleSpace3">
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
                              <DeleteOutlined
                                className="deleteButton"
                                onClick={() => handleDeleteAccount()}
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
                                  <li className="dob">
                                    {user.data.userInfo.dob}
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
                          <div className="stickyContainerPosition">
                            <StickyContainer>
                              <Tabs defaultActiveKey="1" renderTabBar={renderTabBar} centered="true">
                              <TabPane tab="INFO" key="1">
                                <div className="fixedContent2">
                                  <div className="nameTitle">{user.data.userInfo.name}</div>
                                  <ul>
                                    <strong>생년월일</strong>
                                    <li className="dob">{user.data.userInfo.dob}</li>
                                    <strong>이메일</strong>
                                    <li className="email">{user.data.userInfo.email}</li>
                                    <strong>소속사</strong>
                                    <li className="company">{user.data.userInfo.company}</li>
                                  </ul>
                                </div> 
                              </TabPane>
                              <TabPane tab="POSTS" key="2" >
                                <div>
                                  <div className="postsGallery">
                                    <div className="galleryComponents">1</div>
                                    <div className="galleryComponents">2</div>
                                    <div className="galleryComponents">3</div>
                                  </div>
  
                                  <div className="postsGallery">
                                    <div className="galleryComponents">4</div>
                                    <div className="galleryComponents">5</div>
                                    <div className="galleryComponents">6</div>
                                  </div>
  
                                  <div className="postsGallery">
                                    <div className="galleryComponents">7</div>
                                    <div className="galleryComponents">8</div>
                                    <div className="galleryComponents">9</div>
                                  </div>
                                </div>
  
                                <div className="nextpageBtn"> 일단 버튼은 놔두기</div>
                              </TabPane>
                                <TabPane tab="CAREER" key="3">
                                  <div className="careerContent">
                                    {user.data.userInfo.careers ? (
                                      <div className="career">
                                        {user.data.userInfo.careers.map((career) => {
                                          return (
                                            <li>
                                              {`${career.year}` +
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
                                </TabPane>
                                <TabPane tab="LIKES" key="4">
                                  좋아요 했던 게시물들 모아보는 공간
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
                  </>
                ) : (
                  <MypageEdit handeClickEditBtn={handeClickEditBtn} />
                )}
              </>
            ) : (
              redirectPage()
            )}
          </>
        ) : (
          <Loading />
        )}
      </>
      }
    </>

    
  );
};
export default Mypage;
