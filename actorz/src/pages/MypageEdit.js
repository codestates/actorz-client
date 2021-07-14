import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import server from "../apis/server";
import axios from "axios";
import {
  editUserInfo,
  addUserCareer,
  removeUserCareer,
} from "../actions/userAction";
import "../styles/MypageEdit.css";
import Iconlist from "../components/Iconlist";
import Nav from "../components/Nav";
import { CloseOutlined, SaveOutlined, DeleteOutlined } from "@ant-design/icons";
//import Footer from "../components/Footer";
import { useMediaQuery } from "react-responsive";
import FooterFixed from "../components/FooterFixed";
import "antd/dist/antd.css";
import {
  Button,
  Radio,
  Modal,
  Form,
  Input,
  Space,
  Select,
  DatePicker,
} from "antd";
import { Tabs } from "antd";
import { StickyContainer, Sticky } from "react-sticky";
import Footer from "../components/Footer";
import ResponsiveIconlistTablet from "../components/responsiveApp/ResponsiveIconlistTablet";
import ResponsiveNav from "../components/responsiveApp/ResponsiveNav";
import ResponsiveFooter from "../components/responsiveApp/ResponsiveFooter";
import DaumPostcode from "react-daum-postcode"; ///
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import {
  RemoveFileIcon,
  FileMetaData,
  PreviewContainer,
} from "../components/file-upload/file-upload.styles";
import { removePost } from "../actions/postAction";

const { TabPane } = Tabs;
const { Option } = Select;

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

const onFinish = (values) => {
  // console.log('테스트', values);
};

const MypageEdit = ({ handeClickEditBtn }) => {
  const user = useSelector((user) => user.userInfoReducer);
  // userinforeducer에서 판단한다.
  const dispatch = useDispatch();
  //const [clickCareer, setClickCareer] = useState([]);
  const [tag, setTag] = useState("");
  const [dob, setDob] = useState(user.data.userInfo.dob);
  // console.log(dob)
  // console.log(typeof dob)
  const [email, setEmail] = useState(user.data.userInfo.email);
  const [company, setCompany] = useState(user.data.userInfo.company);
  const [password, setPassword] = useState("");
  const [recruiter, setRecruiter] = useState(user.data.userInfo.recruiter);
  const [addressModalVisible, setAddressModalVisible] = useState(false);

  //const [password, setPassword] = useState(user.data.userInfo.password);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [write, setWrite] = useState(true);
  const post = useSelector((post) => post.postInfoReducer);

  const [userPost, setUserPost] = useState({});

  //const [upload, setUpload] = useState({});

  let s3Url = null;
  let result = null;

  useEffect(() => {
    const p = async () => {
      await server // 유저의 포스트를 가져옴
        .get(`/post/user/${user.data.userInfo.id}`)
        .then((res) => {
          setUserPost(res.data.data);
          console.log(res.data.data);
        })
        .catch((err) => {
          throw err;
        });
    };
    p();
  }, [post]);

  const tagOptions = [
    { label: "드라마", value: "드라마" },
    { label: "영화", value: "영화" },
    { label: "뮤지컬", value: "뮤지컬" },
    { label: "연극", value: "연극" },
    { label: "광고", value: "광고" },
    { label: "뮤직비디오", value: "뮤직비디오" },
  ];

  const handleAddressComplete = (data) => { ///
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setRecruiter({
      bAddress: {
        ...recruiter.bAddress,
        zipCode: data.zonecode,
        city: fullAddress
      }
    });
    setAddressModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const initInputBox = async () => {
    document.getElementById("formCareer_users_0_first").value = "";
    document.getElementById("formCareer_users_0_last").value = "";
  };

  const handleOk = async () => {
    let pwd1 = document.getElementsByClassName("passwordDef")[0].value;
    let pwd2 = document.getElementsByClassName("passwordDef")[1].value;
    let pwdLength =
      document.getElementsByClassName("passwordDef")[0].value.length;
    let checkCount = 0;

    //console.log('비밀번호 글자수: ' + pwdLength);

    if (pwdLength < 9 || pwdLength > 20) {
      Modal.error({
        title: "비밀번호 변경 실패",
        content: "비밀번호는 9자 이상 20자 이하여야합니다!",
      });
      pwd1 = "";
      pwd2 = "";
    } else {
      checkCount++;
    }
    if (pwd1 !== pwd2) {
      Modal.error({
        title: "비밀번호 변경 실패",
        content: "비밀번호가 일치하지 않습니다!",
      });
      pwd1 = "";
      pwd2 = "";
    } else {
      checkCount++;
    }

    if (checkCount >= 2) {
      checkCount = 0;
      setIsModalVisible(false);
      pwd1 = "";
      pwd2 = "";
    }
  };

  const handleCancel = () => {
    //setPassword(password.password);
    setIsModalVisible(false);
  };

  const onChangeTag = (e) => {
    if (e === "드라마") {
      setTag(e);
    } else if (e === "영화") {
      setTag(e);
    } else if (e === "뮤지컬") {
      setTag(e);
    } else if (e === "연극") {
      setTag(e);
    } else if (e === "광고") {
      setTag(e);
    } else if (e === "뮤직비디오") {
      setTag(e);
    }
  };

  // const onChangeTag = (e) => {
  //   console.log(e)
  //   if (e.target.value === "드라마") {
  //     setTag(e.target.value);
  //   } else if (e.target.value === "영화") {
  //     setTag(e.target.value);
  //   } else if (e.target.value === "뮤지컬") {
  //     setTag(e.target.value);
  //   } else if (e.target.value === "연극") {
  //     setTag(e.target.value);
  //   } else if (e.target.value === "광고") {
  //     setTag(e.target.value);
  //   } else if (e.target.value === "뮤직비디오") {
  //     setTag(e.target.value);
  //   }
  // };

  const onCalChange = (date, dateString) => {
    console.log("dateString: " + dateString);
    setYear({ year: dateString });
  };

  const handleInputValue = (key) => (event) => {
    if (key === "email") {
      setEmail(event.target.value);
    } else if (key === "company") {
      setCompany(event.target.value);
    } else if (key === "title") {
      setTitle({ [key]: event.target.value });
    } else if (key === "year") {
      console.log(key);
      // setYear({ [key]: event.target.value });
    } else if (key === "password") {
      setPassword({ [key]: event.target.value });
    } else if (key === "bName") {
      setRecruiter({ [key]: event.target.value });
    } else if (key === "jobTitle") {
      setRecruiter({ 
        ...recruiter,
        [key]: event.target.value 
      });
    } else if (key === "phoneNum") {
      setRecruiter({ 
        ...recruiter,
        [key]: event.target.value 
      });
    } else if (key === "bEmail") {
      setRecruiter({ 
        ...recruiter,
        [key]: event.target.value 
      });
    } else if (key === "street") {
      setRecruiter({
        ...recruiter,
        bAddress: { 
        ...recruiter.bAddress,
        street: event.target.value 
      }});

    }
  };

  const handleDeleteBtn = (id) => {
    dispatch(removeUserCareer(id));
    // id = > career.title
  };

  const handleDeleteAccount = async () => {
    await server
      .get(`/user/${localStorage.get("id")}/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          Modal.error({
            title: "회원탈퇴",
            content: "들어올 때는 마음대로였지만 나갈 때는 아니란다",
          });
          window.location = "/mainpage";
        }
      })
      .catch((err) => {
        throw err;
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

  const handleClickSaveBtn = async () => {
    handeClickEditBtn(false);
    let newUserInfo = {
      id: user.data.userInfo.id,
      mainPic: user.data.userInfo.mainPic,
      email: email,
      name: user.data.userInfo.name,
      company: company,
      provider: user.data.userInfo.provider,
      gender: user.data.userInfo.gender,
      dob: new Date(dob),
      careers: user.data.userInfo.careers,
      password: password.password,
      role: user.data.userInfo.role

    };

    if(user.data.userInfo.role === "recruiter"){
      newUserInfo.recruiter = recruiter;
    }

    dispatch(editUserInfo({
      ...newUserInfo,
      dob
    }));
    await server
      .post(`/user/${newUserInfo.id}/update`, newUserInfo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        Modal.success({
          content: "회원정보가 성공적으로 변경되었습니다",
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleprofileButton = async (event) => {
    // 서버한테 s3버킷 url 받아오는 거에요

    await server
      .get(`/upload`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          s3Url = res.data.data;
          console.log("s3Url: " + s3Url); //s3 url 가져옴
        }
      })
      .catch((err) => {
        throw err;
      });

    // 우리가 서버에 보낼 filepath(파일경로)를 받는 과정!
    let fileData = event.target.files[0];
    await axios
      .put(s3Url, fileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        result = res.config.url.split("?")[0];
        console.log("result: " + result);
      })
      .catch((err) => {
        throw err;
      });

    // var fileExt = fileData.name.substring(fileData.name.lastIndexOf(".") + 1);
    // console.log("fileExt: "+fileExt);

    //서버기준으로 정해놓음
    // s3 버킷에 올림
    let profile = {
      mainPic: result,
    };

    //dispatch(editUserInfo(profile));

    let newUserInfo = {
      id: user.data.userInfo.id,
      mainPic: result,
      email: user.data.userInfo.email,
      name: user.data.userInfo.name,
      company: user.data.userInfo.company,
      provider: user.data.userInfo.provider,
      gender: user.data.userInfo.gender,
      dob: new Date(dob),
      careers: user.data.userInfo.careers,
      role: user.data.userInfo.role

    };

    if(user.data.userInfo.role === "actor"){
      newUserInfo.recruiter = recruiter;
    }

    dispatch(editUserInfo({
      ...newUserInfo,
      dob
    }));

    await server
      .post(`/user/${newUserInfo.id}/update`, newUserInfo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log("프로필 사진 변경 완료");
      })
      .catch((err) => {
        throw err;
      });

    // 경로를 서버에 보내줘야한다.

    //그래서 그걸 받아서 다시 사진을 투척
  };

  const handleClickConfirmBtn = () => {
    //document.getElementsByClassName("highlightDisplay")[1].value = "";
    //document.getElementsByClassName("highlightDisplay")[2].value = "";
    if (title.title !== undefined && year.year !== undefined) {
      dispatch(
        addUserCareer({
          id: null,
          title: title.title,
          year: year.year,
          type: tag,
        })
      );
    }
  };

  const handleClickDeleteBtn = async (post_id) => {
    await server
      .post(
        `/post/${post_id}/delete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          dispatch(removePost(post_id));
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <>
      {isPc && (
        <>
        <div className="blockhere"> </div>
        <div className="mainPage">
          <Nav />
          <Iconlist />
  
          <div className="newblockPosition"> </div>
  
          <div className="middleSpace">
            <div className="midContents">
              <div className="buttonHeader">
                <div className="profileTitleName"> 회원정보 수정</div>
                <div>
                  <SaveOutlined
                    className="editButton"
                    onClick={() => handleClickSaveBtn()}
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
                    
  
                    <div className="filebox">
                      <label className="fileboxCSS" htmlFor="ex_file">
                        <div className="profileImgContainer">
                          <img
                            alt=""
                            src={user.data.userInfo.mainPic}
                            className="testPic profileImgEdit"
                          />
                          <div
                            className="profileImgEditText"
                          >
                            <div className="profileImgEditTextText">프로필 사진 편집</div>
                          </div>
                        </div>
                      </label>
                      <input
                        type="file"
                        id="ex_file"
                        accept="image/jpeg, image/jpg, image/JPG, image/JPEG, image/img, image/png, image/IMG, image/PNG"
                        onChange={handleprofileButton}
                      />
                    </div>
                  </div>
  
                  <div className="fixedContent">
                    <div className="nameTitle">{user.data.userInfo.name}</div>
                    <ul>
                      <strong>생년월일</strong>
                      <li className="dob">{user.data.userInfo.dob}</li>
                      <strong>이메일</strong>
                      <li className="email">{user.data.userInfo.email}</li>
                      {
                        user.data.userInfo.role === "actor" ? (
                          <>
                            <strong>소속사</strong>
                            <li className="company">{user.data.userInfo.company}</li>
                          </>
                        ):(
                          <>
                            <strong>회사</strong>
                            <li className="company">{recruiter.bName}</li>
                          </>
                        )
                      }
                    </ul>
                  </div>
                </div>
  
                <div className="stickyContainerPosition">
                  <StickyContainer>
                    <Tabs defaultActiveKey="1" renderTabBar={renderTabBar} centered="true">
                    <TabPane tab="INFO" key="1">
                      <div className="fixedContent2">
                        <div className="nameTitle">{user.data.userInfo.name}</div>
                        <ul>
                          <strong>생년월일</strong>
                          <li className="dob">
                            <DatePicker 
                              defaultValue={moment(dob, "YYYY-MM-DD")}
                              onChange={(date, dateString) => {setDob(dateString)}}></DatePicker>
                          </li>

                          <strong>이메일</strong>
                          <li className="email">{user.data.userInfo.email}</li>
                          {
                            user.data.userInfo.role === "actor" ? (
                              <>
                                <strong>소속사</strong>
                                <li className="company">
                                  <input
                                    type="text"
                                    className="highlightDisplay"
                                    defaultValue={user.data.userInfo.company}
                                    onChange={handleInputValue("company")}
                                  ></input>
                                </li>
                              </>
                            ) : (
                              <>
                                <strong>회사</strong>
                                <li className="company">
                                  <input
                                    type="text"
                                    className="highlightDisplay"
                                    defaultValue={recruiter.bName}
                                    onChange={handleInputValue("bName")}
                                  ></input>
                                </li>
                                <strong>직책</strong>
                                <li className="company">
                                  <input
                                    type="text"
                                    className="highlightDisplay"
                                    defaultValue={recruiter.jobTitle}
                                    onChange={handleInputValue("jobTitle")}
                                  ></input>
                                </li>
                                <strong>회사 이메일</strong>
                                <li className="company">
                                  <input
                                    type="text"
                                    className="highlightDisplay"
                                    defaultValue={recruiter.bEmail}
                                    onChange={handleInputValue("bEmail")}
                                  ></input>
                                </li>
                                <strong>전화번호</strong>
                                <li className="company">
                                  <input
                                    type="text"
                                    className="highlightDisplay"
                                    defaultValue={recruiter.phoneNum}
                                    onChange={handleInputValue("phoneNum")}
                                  ></input>
                                </li>
                                <strong>회사 주소</strong>
                                <li className="company">
                                  {recruiter.bAddress.zipCode}
                                  <br/>
                                  {recruiter.bAddress.city }
                                  <br/>
                                  <input
                                    type="text"
                                    className="highlightDisplay"
                                    defaultValue={recruiter.bAddress.street}
                                    onChange={handleInputValue("street")}
                                  ></input>
                                  <br/>
                                </li>
                              </>
                            )
                          }
                        </ul>
                        {
                          user.data.userInfo.role === "actor" ? null : (
                            <div className="passwordModifyButton">
                              <Button
                                variant="outlined"
                                className="passwordModifyBtn"
                                onClick={() => setAddressModalVisible(true)}
                              >
                                주소 변경
                              </Button>
                              <Modal
                                title="회사 주소 변경"
                                visible={addressModalVisible}
                                onCancel={() => setAddressModalVisible(false)}
                                footer={null}
                              >
                                <DaumPostcode
                                  onComplete={handleAddressComplete} 
                                />
                              </Modal>
                            </div>
                          )
                        }
                        <div className="passwordModifyButton">
                          <Button
                            variant="outlined"
                            className="passwordModifyBtn"
                            onClick={showModal}
                          >
                            비밀번호 변경
                          </Button>
                          <Modal
                            title="비밀번호 변경"
                            visible={isModalVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            width={330}
                            okText="변경"
                            cancelText="취소"
                          >
                            <p>변경하실 비밀번호를 입력하여주세요. </p>
                            <br />
                            <div>
                              비밀번호 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                              <input
                                type="password"
                                className="passwordDef"
                                onChange={handleInputValue("password")}
                              ></input>
                            </div>
                            <br />
                            <div>
                              비밀번호 확인
                              <input
                                type="password"
                                defaultValue=""
                                className="passwordDef"
                              ></input>
                            </div>
                          </Modal>
                        </div>
                      </div>
                      
                    </TabPane>
                    <TabPane tab="POSTS" key="2">
                          <div>
                            <div className="postsGallery">
                              {userPost.posts
                                ? userPost.posts.map((post) => {
                                    return (
                                      <>
                                        <div className="galleryComponents">
                                          <PreviewContainer>
                                            <div className="img-container">
                                              <img
                                                className="postGallery-img"
                                                key={post._id}
                                                src={post.media[0].path}
                                              ></img>
                                              <FileMetaData>
                                                <aside>
                                                  <RemoveFileIcon
                                                    className="fas fa-trash-alt"
                                                    onClick={() =>
                                                      handleClickDeleteBtn(
                                                        post._id
                                                      )
                                                    }
                                                  />
                                                </aside>
                                              </FileMetaData>
                                            </div>
                                          </PreviewContainer>
                                        </div>
                                      </>
                                    );
                                  })
                                : null}
                            </div>
                          </div>
                        </TabPane>
                        <TabPane tab="CAREER" key="3">
                          <Form
                            name="formCareer"
                            onFinish={onFinish}
                            autoComplete="off"
                          >
                            <Form.List name="users">
                              {(fields, { add, remove }) => (
                                <>
                                  {fields.map(
                                    ({ key, name, fieldKey, ...restField }) => (
                                      <Space
                                        key={key}
                                        style={{
                                          display: "flex",
                                          marginBottom: 8,
                                        }}
                                        align="baseline"
                                      >
                                        <Form.Item
                                          {...restField}
                                          name={[name, "first"]}
                                          fieldKey={[fieldKey, "first"]}
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "타이틀을 입력해야합니다",
                                            },
                                          ]}
                                        >
                                          <Input
                                            placeholder="Title"
                                            onChange={handleInputValue("title")}
                                          />
                                        </Form.Item>
                                        <Form.Item
                                          {...restField}
                                          name={[name, "last"]}
                                          fieldKey={[fieldKey, "last"]}
                                          rules={[
                                            {
                                              required: true,
                                              message: "연도를 입력해야합니다",
                                            },
                                          ]}
                                        >
                                          <DatePicker
                                            onChange={onCalChange}
                                            style={{ width: "100%" }}
                                          />
                                        </Form.Item>
                                        <Form.Item
                                          {...restField}
                                          name={[name, "tag"]}
                                          fieldKey={[fieldKey, "tag"]}
                                          rules={[{ required: false }]}
                                        >
                                          {/* <Input placeholder="tag" /> */}
                                          <Select
                                            style={{ width: 110 }}
                                            onChange={onChangeTag}
                                          >
                                            <Option value="드라마">
                                              드라마
                                            </Option>
                                            <Option value="영화">영화</Option>
                                            <Option value="뮤지컬">
                                              뮤지컬
                                            </Option>
                                            <Option value="연극">연극</Option>
                                            <Option value="광고">광고</Option>
                                            <Option value="뮤직비디오">
                                              뮤직비디오
                                            </Option>
                                          </Select>
                                        </Form.Item>
                                        {/* <Button type="primary" onClick={() => {
                                      remove(name)
                                      setWrite(true)}
                                    } danger>
                                      취소하기
                                    </Button> */}
                                        <MinusCircleOutlined
                                          onClick={() => {
                                            remove(name);
                                            setWrite(true);
                                          }}
                                        />
                                      </Space>
                                    )
                                  )}

                                  {write ? (
                                    <Form.Item>
                                      <Button
                                        type="dashed"
                                        onClick={() => {
                                          add();
                                          setWrite(false);
                                        }}
                                        block
                                        icon={<PlusOutlined />}
                                      >
                                        경력 추가하기
                                      </Button>
                                    </Form.Item>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              )}
                            </Form.List>
                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                onClick={() => {
                                  handleClickConfirmBtn();
                                  initInputBox();
                                }}
                              >
                                저장하기
                              </Button>
                            </Form.Item>
                          </Form>

                          <span className="career-box">
                            {user.data.userInfo.careers.map((career) => {
                              return (
                                <>
                                  <li className="career-li">
                                    <div className="careerDivide">
                                      <div className="career-title">
                                        제목:{career.title}
                                      </div>
                                      {/* <div>{career.title}</div> */}
                                      <div className="career-year">
                                        활동연도:{career.year.split("T")[0]}
                                      </div>
                                      {/* <div>{career.year}</div> */}
                                      <div className="blockhereplz"></div>
                                      <CloseOutlined
                                        className="career-delete-btn"
                                        onClick={() => {
                                          handleDeleteBtn(career._id);
                                        }}
                                      />
                                    </div>
                                    <div className="careerDivide">
                                      <div className="tag">
                                        <div className="tagPosition">태그:</div>
                                        <div>{career.type}</div>
                                      </div>
                                    </div>
                                  </li>
                                </>
                              );
                            })}
                          </span>
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
      )}

{isTablet && 
        <>
        <div className="blockhere"> </div>
        <div className="mainPage">
          <Nav />
          <ResponsiveIconlistTablet />
  
          <div className="newblockPosition"> </div>
  
          <div className="middleSpace2">
            <div className="midContents">
              <div className="buttonHeader">
                <div className="profileTitleName"> 회원정보 수정</div>
                <div>
                  <SaveOutlined
                    className="editButton"
                    onClick={() => handleClickSaveBtn()}
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
                    
  
                    <div className="filebox">
                      <label className="fileboxCSS" htmlFor="ex_file">
  
                        <img
                          alt=""
                          src={user.data.userInfo.mainPic}
                          className="testPic"
                        />
                      </label>
                      <input
                        type="file"
                        id="ex_file"
                        accept="image/jpeg, image/jpg, image/JPG, image/JPEG, image/img, image/png, image/IMG, image/PNG"
                        onChange={handleprofileButton}
                      />
                    </div>
                  </div>
  
                  <div className="fixedContent">
                    <div className="nameTitle">{user.data.userInfo.name}</div>
                    <ul>
                      <strong>생년월일</strong>
                      <li className="dob">{user.data.userInfo.dob}</li>
                      <strong>이메일</strong>
                      <li className="email">{user.data.userInfo.email}</li>
                      {
                        user.data.userInfo.role === "actor" ? (
                          <>
                            <strong>소속사</strong>
                            <li className="company">{user.data.userInfo.company}</li>
                          </>
                        ):(
                          <>
                            <strong>회사</strong>
                            <li className="company">{recruiter.bName}</li>
                          </>
                        )
                      }
                    </ul>
                  </div>
                </div>
  
                <div className="stickyContainerPosition">
                  <StickyContainer>
                    <Tabs defaultActiveKey="1" renderTabBar={renderTabBar} centered="true">
                    <TabPane tab="INFO" key="1">
                      <div className="fixedContent2">
                        <div className="nameTitle">{user.data.userInfo.name}</div>
                        <ul>
                          <strong>생년월일</strong>
                          <li className="dob">
                            <DatePicker 
                              defaultValue={moment(dob, "YYYY-MM-DD")}
                              onChange={(date, dateString) => {setDob(dateString)}}></DatePicker>
                          </li>
                          <strong>이메일</strong>
                          <li className="email">{user.data.userInfo.email}</li>
                          {
                            user.data.userInfo.role === "actor" ? (
                              <>
                                <strong>소속사</strong>
                                <li className="company">
                                  <input
                                    type="text"
                                    className="highlightDisplay"
                                    defaultValue={user.data.userInfo.company}
                                    onChange={handleInputValue("company")}
                                  ></input>
                                </li>
                              </>
                            ) : (
                              <>
                                <strong>회사</strong>
                                <li className="company">
                                  <input
                                    type="text"
                                    className="highlightDisplay"
                                    defaultValue={recruiter.bName}
                                    onChange={handleInputValue("bName")}
                                  ></input>
                                </li>
                                <strong>직책</strong>
                                <li className="company">
                                  <input
                                    type="text"
                                    className="highlightDisplay"
                                    defaultValue={recruiter.jobTitle}
                                    onChange={handleInputValue("jobTitle")}
                                  ></input>
                                </li>
                                <strong>회사 이메일</strong>
                                <li className="company">
                                  <input
                                    type="text"
                                    className="highlightDisplay"
                                    defaultValue={recruiter.bEmail}
                                    onChange={handleInputValue("bEmail")}
                                  ></input>
                                </li>
                                <strong>전화번호</strong>
                                <li className="company">
                                  <input
                                    type="text"
                                    className="highlightDisplay"
                                    defaultValue={recruiter.phoneNum}
                                    onChange={handleInputValue("phoneNum")}
                                  ></input>
                                </li>
                                <strong>회사 주소</strong>
                                <li className="company">
                                  {recruiter.bAddress.zipCode}
                                  <br/>
                                  {recruiter.bAddress.city }
                                  <br/>
                                  <input
                                    type="text"
                                    className="highlightDisplay"
                                    defaultValue={recruiter.bAddress.street}
                                    onChange={handleInputValue("street")}
                                  ></input>
                                  <br/>
                                </li>
                              </>
                            )
                          }
                        </ul>
                        {
                          user.data.userInfo.role === "actor" ? null : (
                            <div className="passwordModifyButton">
                              <Button
                                variant="outlined"
                                className="passwordModifyBtn"
                                onClick={() => setAddressModalVisible(true)}
                              >
                                주소 변경
                              </Button>
                              <Modal
                                title="회사 주소 변경"
                                visible={addressModalVisible}
                                onCancel={() => setAddressModalVisible(false)}
                                footer={null}
                              >
                                <DaumPostcode
                                  onComplete={handleAddressComplete} 
                                />
                              </Modal>
                            </div>
                          )
                        }
                        <div className="passwordModifyButton">
                      <Button
                        variant="outlined"
                        className="passwordModifyBtn"
                        onClick={showModal}
                      >
                        비밀번호 변경
                      </Button>
                      <Modal
                        title="비밀번호 변경"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        width={330}
                        okText="변경"
                        cancelText="취소"
                      >
                        <p>변경하실 비밀번호를 입력하여주세요. </p>
                        <br />
                        <div>
                          비밀번호 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input
                            type="password"
                            className="passwordDef"
                            onChange={handleInputValue("password")}
                          ></input>
                        </div>
                        <br />
                        <div>
                          비밀번호 확인
                          <input
                            type="password"
                            defaultValue=""
                            className="passwordDef"
                          ></input>
                        </div>
                      </Modal>
                    </div>
                      </div>
                      
                    </TabPane>
                        <TabPane tab="POSTS" key="2">
                          <div>
                            <div className="postsGallery">
                              {userPost.posts
                                ? userPost.posts.map((post) => {
                                    return (
                                      <>
                                        <div className="galleryComponents">
                                          <img
                                            className="postGallery-img"
                                            key={post._id}
                                            src={post.media[0].path}
                                          ></img>
                                          <RemoveFileIcon
                                            className="fas fa-trash-alt"
                                            onClick={() =>
                                              handleClickDeleteBtn(post._id)
                                            }
                                          />
                                        </div>
                                      </>
                                    );
                                  })
                                : null}
                            </div>
                          </div>
                        </TabPane>
                        <TabPane tab="CAREER" key="3">
                          <Form
                            name="formCareer"
                            onFinish={onFinish}
                            autoComplete="off"
                          >
                            <Form.List name="users">
                              {(fields, { add, remove }) => (
                                <>
                                  {fields.map(
                                    ({ key, name, fieldKey, ...restField }) => (
                                      <Space
                                        key={key}
                                        style={{
                                          display: "flex",
                                          marginBottom: 8,
                                        }}
                                        align="baseline"
                                      >
                                        <Form.Item
                                          {...restField}
                                          name={[name, "first"]}
                                          fieldKey={[fieldKey, "first"]}
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "타이틀을 입력해야합니다",
                                            },
                                          ]}
                                        >
                                          <Input
                                            placeholder="Title"
                                            onChange={handleInputValue("title")}
                                          />
                                        </Form.Item>
                                        <Form.Item
                                          {...restField}
                                          name={[name, "last"]}
                                          fieldKey={[fieldKey, "last"]}
                                          rules={[
                                            {
                                              required: true,
                                              message: "연도를 입력해야합니다",
                                            },
                                          ]}
                                        >
                                          <DatePicker
                                            onChange={onCalChange}
                                            style={{ width: "100%" }}
                                          />
                                        </Form.Item>
                                        <Form.Item
                                          {...restField}
                                          name={[name, "tag"]}
                                          fieldKey={[fieldKey, "tag"]}
                                          rules={[{ required: false }]}
                                        >
                                          {/* <Input placeholder="tag" /> */}
                                          <Select
                                            style={{ width: 110 }}
                                            onChange={onChangeTag}
                                          >
                                            <Option value="드라마">
                                              드라마
                                            </Option>
                                            <Option value="영화">영화</Option>
                                            <Option value="뮤지컬">
                                              뮤지컬
                                            </Option>
                                            <Option value="연극">연극</Option>
                                            <Option value="광고">광고</Option>
                                            <Option value="뮤직비디오">
                                              뮤직비디오
                                            </Option>
                                          </Select>
                                        </Form.Item>
                                        {/* <Button type="primary" onClick={() => {
                                    remove(name)
                                    setWrite(true)}
                                  } danger>
                                    취소하기
                                  </Button> */}
                                        <MinusCircleOutlined
                                          onClick={() => {
                                            remove(name);
                                            setWrite(true);
                                          }}
                                        />
                                      </Space>
                                    )
                                  )}

                                  {write ? (
                                    <Form.Item>
                                      <Button
                                        type="dashed"
                                        onClick={() => {
                                          add();
                                          setWrite(false);
                                        }}
                                        block
                                        icon={<PlusOutlined />}
                                      >
                                        경력 추가하기
                                      </Button>
                                    </Form.Item>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              )}
                            </Form.List>
                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                onClick={() => {
                                  handleClickConfirmBtn();
                                  initInputBox();
                                }}
                              >
                                저장하기
                              </Button>
                            </Form.Item>
                          </Form>

                          <span className="career-box">
                            {user.data.userInfo.careers.map((career) => {
                              return (
                                <>
                                  <li className="career-li">
                                    <div className="careerDivide">
                                      <div className="career-title">
                                        제목:{career.title}
                                      </div>
                                      {/* <div>{career.title}</div> */}
                                      <div className="career-year">
                                        활동연도:{career.year.split("T")[0]}
                                      </div>
                                      {/* <div>{career.year}</div> */}
                                      <div className="blockhereplz"></div>
                                      <CloseOutlined
                                        className="career-delete-btn"
                                        onClick={() => {
                                          handleDeleteBtn(career._id);
                                        }}
                                      />
                                    </div>
                                    <div className="careerDivide">
                                      <div className="tag">
                                        <div className="tagPosition">태그:</div>
                                        <div>{career.type}</div>
                                      </div>
                                    </div>
                                  </li>
                                </>
                              );
                            })}
                          </span>
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
      )}

      {isMobile && (
        <>
          <div className="blockhere"> </div>
          <div className="mainPage">
            <ResponsiveNav />
            <ResponsiveFooter />

            <div className="newblockPosition"> </div>

            <div className="middleSpace5">
              <div className="midContents">
                <div className="buttonHeader">
                  <div className="profileTitleName"> 회원정보 수정</div>
                  <div>
                    <SaveOutlined
                      className="editButton"
                      onClick={() => handleClickSaveBtn()}
                    />
                    <DeleteOutlined
                      className="deleteButton"
                      onClick={() => handleDeleteAccount()}
                    />
                  </div>
                </div>
              </div>
              <div className="midContentDownPart2">
                <div className="displayPosition">
                  <div className="fixedSize">
                    
  
                    <div className="filebox">
                      <label className="fileboxCSS" htmlFor="ex_file">
  
                        <img
                          alt=""
                          src={user.data.userInfo.mainPic}
                          className="testPic"

                          />
                        </label>
                        <input
                          type="file"
                          id="ex_file"
                          accept="image/jpeg, image/jpg, image/JPG, image/JPEG, image/img, image/png, image/IMG, image/PNG"
                          onChange={handleprofileButton}
                        />
                      </div>
                    </div>

                    <div className="fixedContent">
                    <div className="nameTitle">{user.data.userInfo.name}</div>
                    <ul>
                      <strong>생년월일</strong>
                      <li className="dob">{user.data.userInfo.dob}</li>
                      <strong>이메일</strong>
                      <li className="email">{user.data.userInfo.email}</li>
                      {
                        user.data.userInfo.role === "actor" ? (
                          <>
                            <strong>소속사</strong>
                            <li className="company">{user.data.userInfo.company}</li>
                          </>
                        ):(
                          <>
                            <strong>회사</strong>
                            <li className="company">{recruiter.bName}</li>
                          </>
                        )
                      }
                    </ul>
                  </div>
                </div>
  
                <div className="stickyContainerPosition">
                  <StickyContainer>
                    <Tabs defaultActiveKey="1" renderTabBar={renderTabBar} centered="true">
                    <TabPane tab="INFO" key="1">
                      <div className="fixedContent2">
                        <div className="nameTitle">{user.data.userInfo.name}</div>
                        <ul>
                          <strong>생년월일</strong>
                          <li className="dob">
                            <DatePicker 
                              defaultValue={moment(dob, "YYYY-MM-DD")}
                              onChange={(date, dateString) => {setDob(dateString)}}></DatePicker>
                          </li>
                          <strong>이메일</strong>
                          <li className="email">{user.data.userInfo.email}</li>
                          {
                            user.data.userInfo.role === "actor" ? (
                              <>
                                <strong>소속사</strong>
                                <li className="company">
                                  <input
                                    type="text"
                                    className="highlightDisplay"
                                    defaultValue={user.data.userInfo.company}
                                    onChange={handleInputValue("company")}
                                  ></input>
                                </li>
                              </>
                            ) : (
                              <>
                                <strong>회사</strong>
                                <li className="company">
                                  <input
                                    type="text"
                                    className="highlightDisplay"
                                    defaultValue={recruiter.bName}
                                    onChange={handleInputValue("bName")}
                                  ></input>
                                </li>
                                <strong>직책</strong>
                                <li className="company">
                                  <input
                                    type="text"
                                    className="highlightDisplay"
                                    defaultValue={recruiter.jobTitle}
                                    onChange={handleInputValue("jobTitle")}
                                  ></input>
                                </li>
                                <strong>회사 이메일</strong>
                                <li className="company">
                                  <input
                                    type="text"
                                    className="highlightDisplay"
                                    defaultValue={recruiter.bEmail}
                                    onChange={handleInputValue("bEmail")}
                                  ></input>
                                </li>
                                <strong>전화번호</strong>
                                <li className="company">
                                  <input
                                    type="text"
                                    className="highlightDisplay"
                                    defaultValue={recruiter.phoneNum}
                                    onChange={handleInputValue("phoneNum")}
                                  ></input>
                                </li>
                                <strong>회사 주소</strong>
                                <li className="company">
                                  {recruiter.bAddress.zipCode}
                                  <br/>
                                  {recruiter.bAddress.city }
                                  <br/>
                                  <input
                                    type="text"
                                    className="highlightDisplay"
                                    defaultValue={recruiter.bAddress.street}
                                    onChange={handleInputValue("street")}
                                  ></input>
                                  <br/>
                                </li>
                              </>
                            )
                          }
                        </ul>
                        {
                          user.data.userInfo.role === "actor" ? null : (
                            <div className="passwordModifyButton">
                              <Button
                                variant="outlined"
                                className="passwordModifyBtn"
                                onClick={() => setAddressModalVisible(true)}
                              >
                                주소 변경
                              </Button>
                              <Modal
                                title="회사 주소 변경"
                                visible={addressModalVisible}
                                onCancel={() => setAddressModalVisible(false)}
                                footer={null}
                              >
                                <DaumPostcode
                                  onComplete={handleAddressComplete} 
                                />
                              </Modal>
                            </div>
                          )
                        }
                        <div className="passwordModifyButton">
                      <Button
                        variant="outlined"
                        className="passwordModifyBtn"
                        onClick={showModal}
                      >
                        비밀번호 변경
                      </Button>
                      <Modal
                        title="비밀번호 변경"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        width={330}
                        okText="변경"
                        cancelText="취소"
                      >
                        <p>변경하실 비밀번호를 입력하여주세요. </p>
                        <br />
                        <div>
                          비밀번호 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          <input
                            type="password"
                            className="passwordDef"
                            onChange={handleInputValue("password")}
                          ></input>
                        </div>
                        <br />
                        <div>
                          비밀번호 확인
                          <input
                            type="password"
                            defaultValue=""
                            className="passwordDef"
                          ></input>
                        </div>
                      </Modal>
                    </div>
                      </div>
                      
                    </TabPane>
                        <TabPane tab="POSTS" key="2">
                          <div>
                            <div className="postsGallery">
                              {userPost.posts
                                ? userPost.posts.map((post) => {
                                    return (
                                      <>
                                        <div className="galleryComponents">
                                          <FileMetaData>
                                            <span>{"abc"}</span>
                                            <aside>
                                              <RemoveFileIcon
                                                className="fas fa-trash-alt"
                                                onClick={() =>
                                                  handleClickDeleteBtn(post._id)
                                                }
                                              />
                                            </aside>
                                          </FileMetaData>
                                          <img
                                            className="postGallery-img"
                                            key={post._id}
                                            src={post.media[0].path}
                                          ></img>
                                          {/* <RemoveFileIcon
                                            className="fas fa-trash-alt"
                                            onClick={() =>
                                              handleClickDeleteBtn(post._id)
                                            }
                                          /> */}
                                        </div>
                                      </>
                                    );
                                  })
                                : null}
                            </div>
                          </div>
                        </TabPane>
                        <TabPane tab="CAREER" key="3">
                          <Form
                            name="formCareer"
                            onFinish={onFinish}
                            autoComplete="off"
                          >
                            <Form.List name="users">
                              {(fields, { add, remove }) => (
                                <>
                                  {fields.map(
                                    ({ key, name, fieldKey, ...restField }) => (
                                      <Space
                                        key={key}
                                        style={{
                                          display: "flex",
                                          marginBottom: 8,
                                        }}
                                        align="baseline"
                                      >
                                        <Form.Item
                                          {...restField}
                                          name={[name, "first"]}
                                          fieldKey={[fieldKey, "first"]}
                                          rules={[
                                            {
                                              required: true,
                                              message:
                                                "타이틀을 입력해야합니다",
                                            },
                                          ]}
                                        >
                                          <Input
                                            placeholder="Title"
                                            onChange={handleInputValue("title")}
                                          />
                                        </Form.Item>
                                        <Form.Item
                                          {...restField}
                                          name={[name, "last"]}
                                          fieldKey={[fieldKey, "last"]}
                                          rules={[
                                            {
                                              required: true,
                                              message: "연도를 입력해야합니다",
                                            },
                                          ]}
                                        >
                                          <DatePicker
                                            onChange={onCalChange}
                                            style={{ width: "100%" }}
                                          />
                                        </Form.Item>
                                        <Form.Item
                                          {...restField}
                                          name={[name, "tag"]}
                                          fieldKey={[fieldKey, "tag"]}
                                          rules={[{ required: false }]}
                                        >
                                          {/* <Input placeholder="tag" /> */}
                                          <Select
                                            style={{ width: 110 }}
                                            onChange={onChangeTag}
                                          >
                                            <Option value="드라마">
                                              드라마
                                            </Option>
                                            <Option value="영화">영화</Option>
                                            <Option value="뮤지컬">
                                              뮤지컬
                                            </Option>
                                            <Option value="연극">연극</Option>
                                            <Option value="광고">광고</Option>
                                            <Option value="뮤직비디오">
                                              뮤직비디오
                                            </Option>
                                          </Select>
                                        </Form.Item>
                                        {/* <Button type="primary" onClick={() => {
                                    remove(name)
                                    setWrite(true)}
                                  } danger>
                                    취소하기
                                  </Button> */}
                                        <MinusCircleOutlined
                                          onClick={() => {
                                            remove(name);
                                            setWrite(true);
                                          }}
                                        />
                                      </Space>
                                    )
                                  )}

                                  {write ? (
                                    <Form.Item>
                                      <Button
                                        type="dashed"
                                        onClick={() => {
                                          add();
                                          setWrite(false);
                                        }}
                                        block
                                        icon={<PlusOutlined />}
                                      >
                                        경력 추가하기
                                      </Button>
                                    </Form.Item>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              )}
                            </Form.List>
                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                onClick={() => {
                                  handleClickConfirmBtn();
                                  initInputBox();
                                }}
                              >
                                저장하기
                              </Button>
                            </Form.Item>
                          </Form>
                          <span className="career-box">
                            {user.data.userInfo.careers.map((career) => {
                              return (
                                <>
                                  <li className="career-li">
                                    <div className="careerDivide5">
                                      <div className="career-title2">
                                        제목: &nbsp; {career.title}
                                        <CloseOutlined
                                          className="career-delete-btn"
                                          onClick={() => {
                                            handleDeleteBtn(career._id);
                                          }}
                                        />
                                      </div>
                                      <div className="career-year3">
                                        활동연도: &nbsp;{" "}
                                        {career.year.split("T")[0]}
                                      </div>
                                      <div className="blockhereplz"></div>

                                      <div className="tag">
                                        <div className="tagPosition">태그:</div>
                                        <div>{career.type}</div>
                                      </div>
                                    </div>
                                  </li>
                                </>
                              );
                            })}
                          </span>
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
        </>
      )}
    </>
  );
};

export default MypageEdit;
