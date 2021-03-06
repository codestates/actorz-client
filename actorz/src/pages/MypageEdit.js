import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import server from "../apis/server";
import axios from "axios";
import Iconlist from "../components/Iconlist";
import Nav from "../components/Nav";
import { useMediaQuery } from "react-responsive";
import FooterFixed from "../components/FooterFixed";
import Footer from "../components/Footer";
import DaumPostcode from "react-daum-postcode";
import {
  CloseOutlined,
  SaveOutlined,
  DeleteOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Card, Icon, Image } from "semantic-ui-react";
import { StickyContainer, Sticky } from "react-sticky";
import ResponsiveNav from "../components/responsiveApp/ResponsiveNav";
import ResponsiveFooter from "../components/responsiveApp/ResponsiveFooter";
import "antd/dist/antd.css";
import "../styles/MypageEdit.css";
import ResponsiveIconlistTablet from "../components/responsiveApp/ResponsiveIconlistTablet";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { removePost } from "../actions/postAction";
import {
  Button,
  Modal,
  Form,
  Input,
  Space,
  Select,
  DatePicker,
  Tabs,
} from "antd";
import {
  editUserInfo,
  addUserCareer,
  removeUserCareer,
  getUserInfo,
} from "../actions/userAction";
import {
  RemoveFileIcon,
  RemoveFileIcon2,
  FileMetaData2,
  PreviewContainer,
  PreviewContainer2,
} from "../components/file-upload/file-upload.styles";

import { persistor } from "../store/store";

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

const onFinish = (values) => {};

const MypageEdit = ({ handeClickEditBtn }) => {
  const post = useSelector((post) => post.postInfoReducer);
  const user = useSelector((user) => user.userInfoReducer);
  const dispatch = useDispatch();

  const [tag, setTag] = useState("");
  const [dob, setDob] = useState(user.data.userInfo.dob);
  const [email, setEmail] = useState(user.data.userInfo.email);
  const [company, setCompany] = useState(user.data.userInfo.company);
  const [password, setPassword] = useState("");
  const [recruiter, setRecruiter] = useState(user.data.userInfo.recruiter);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [write, setWrite] = useState(true);
  const [userPost, setUserPost] = useState({});
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [clickLike, setClickLike] = useState(false);
  const [likePost, setLikePost] = useState([]);

  let s3Url = null;
  let result = null;

  useEffect(() => {
    const p = async () => {
      await server
        .get(`/post/user/${user.data.userInfo.id}`)
        .then((res) => {
          setUserPost(res.data.data);
        })
        .catch((err) => {
          throw err;
        });

      await server
        .get(`like/${user.data.userInfo.id}`)
        .then((res) => {
          setLikePost(res.data.data.posts);
        })
        .catch((err) => {
          throw err;
        });
    };
    p();
  }, [post, clickLike]);

  // const handleAddUserCareer = () => {
  //   if (title.title && year.year && tag) {
  //     setUserCareer([...userCareer, {
  //       year: year.year,
  //       title: title.title,
  //       type: tag
  //     }]);

  //   }else{
  //     Modal.warning({
  //       content: "?????? ????????? ?????? ??? ??????????????? ????????????. ????????? ?????? ???????????? ????????? ?????? ???????????????."
  //     })
  //   }
  // }

  // const handleDeleteUserCareer = (id) => {
  //   setUserCareer(userCareer.splice(id,1));
  //   console.log(userCareer);
  // }

  const handleAddressComplete = (data) => {
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
      ...recruiter,
      bAddress: {
        ...recruiter.bAddress,
        zipCode: data.zonecode,
        city: fullAddress,
      },
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

    if (pwdLength < 9 || pwdLength > 20) {
      Modal.error({
        title: "???????????? ?????? ??????",
        content: "??????????????? 9??? ?????? 20??? ?????????????????????!",
      });
      pwd1 = "";
      pwd2 = "";
    } else {
      checkCount++;
    }

    if (pwd1 !== pwd2) {
      Modal.error({
        title: "???????????? ?????? ??????",
        content: "??????????????? ???????????? ????????????!",
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
    setIsModalVisible(false);
  };

  const onChangeTag = (e) => {
    if (e === "?????????") {
      setTag(e);
    } else if (e === "??????") {
      setTag(e);
    } else if (e === "?????????") {
      setTag(e);
    } else if (e === "??????") {
      setTag(e);
    } else if (e === "??????") {
      setTag(e);
    } else if (e === "???????????????") {
      setTag(e);
    }
  };

  const onCalChange = (date, dateString) => {
    console.log(dateString);
    console.log(typeof dateString);

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
    } else if (key === "password") {
      setPassword({ [key]: event.target.value });
    } else if (key === "bName") {
      setRecruiter({ 
        ...recruiter,
        [key]: event.target.value 
      });
    } else if (key === "jobTitle") {
      setRecruiter({
        ...recruiter,
        [key]: event.target.value,
      });
    } else if (key === "phoneNum") {
      setRecruiter({
        ...recruiter,
        [key]: event.target.value,
      });
    } else if (key === "bEmail") {
      setRecruiter({
        ...recruiter,
        [key]: event.target.value,
      });
    } else if (key === "street") {
      setRecruiter({
        ...recruiter,
        bAddress: {
          ...recruiter.bAddress,
          street: event.target.value,
        },
      });
    }
  };
  const handleDeleteBtn = (id) => {
    dispatch(removeUserCareer(id));
  };
  const handleDeleteAccount = async () => {
    await server
      .get(`/user/${localStorage.getItem("id")}/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 205) {
          console.log("????????????");
          persistor.purge();
          localStorage.removeItem("accessToken");
          localStorage.removeItem("id");
          window.location = "/mainpage";
        }
      })
      .catch((err) => {
        throw err;
      });
    setDeleteUserModal(false);
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
      role: user.data.userInfo.role,
    };

    if (user.data.userInfo.role === "recruiter") {
      newUserInfo.recruiter = recruiter;
    }
    // dispatch(
    //   editUserInfo({
    //     ...newUserInfo,
    //     dob,
    //   })
    // );
    await server
      .post(`/user/${newUserInfo.id}/update`, newUserInfo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        if(res.status === 200){
          console.log(user.data.userInfo.careers)
          dispatch(
            editUserInfo({
              ...res.data.data.userInfo,
              dob: dob.toString().split("T")[0]
            })
          );
  
          Modal.success({
            content: "??????????????? ??????????????? ?????????????????????",
          });
        }else{
          Modal.error({
            content: "???????????? ???????????? ??????????????? ???????????? ???????????????. ?????? ??????????????? ????????????.",
          });
        }
      })
      .catch((err) => {
        throw err;
      });

    
  };

  const handleprofileButton = async (event) => {
    await server
      .get(`/upload`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          s3Url = res.data.data;
        }
      })
      .catch((err) => {
        throw err;
      });

    let fileData = event.target.files[0];
    await axios
      .put(s3Url, fileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        result = res.config.url.split("?")[0];
      })
      .catch((err) => {
        throw err;
      });

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
      role: user.data.userInfo.role,
    };

    if (user.data.userInfo.role === "actor") {
      newUserInfo.recruiter = recruiter;
    }
    dispatch(
      editUserInfo({
        ...newUserInfo,
        dob,
      })
    );
    await server
      .post(`/user/${newUserInfo.id}/update`, newUserInfo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {})
      .catch((err) => {
        throw err;
      });
  };
  const handleClickConfirmBtn = () => {
    if (title.title !== undefined && year.year !== undefined) {
      dispatch(
        addUserCareer({
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
        if(res.statusCode === 200){
          console.log(res.data.userInfo)
          dispatch(
            editUserInfo({
              ...res.data.userInfo
            })
          );
          Modal.success({
            content: "???????????? ??????????????? ?????????????????????",
          });
        }else{
          Modal.error({
            content: "????????? ????????? ??????????????????. ?????? ??????????????????.",
          });
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleClickLikeBtn = async (post_id) => {
    let path = null;

    path = `/post/${post_id}/unlike`;

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
                  <div className="profileTitleName"> ???????????? ??????</div>
                  <div>
                    <SaveOutlined
                      className="editButton"
                      onClick={() => handleClickSaveBtn()}
                    />
                    <DeleteOutlined
                      className="deleteButton"
                      onClick={() => setDeleteUserModal(true)}
                    />
                    <Modal
                      title="?????? ??????"
                      visible={deleteUserModal}
                      onOk={() => handleDeleteAccount()}
                      onCancel={() => setDeleteUserModal(false)}
                      okText="?????? ??????"
                      cancelText="?????? ??????"
                    >
                      ????????? ???????????? ????????? ????????? ?????? ??? ????????? ?????? ??????
                      ???????????????.
                      <br />
                      <strong>????????? ?????? ???????????? ???????????? ????????????.</strong>
                      <br />
                      ????????? ????????? ?????????????????????????
                    </Modal>
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
                            <div className="profileImgEditText">
                              <div className="profileImgEditTextText">
                                ????????? ?????? ??????
                              </div>
                            </div>
                          </div>
                        </label>
                        <input
                          type="file"
                          id="ex_file"
                          accept="*"
                          onChange={handleprofileButton}
                        />
                      </div>
                    </div>

                    <div className="fixedContent">
                      <div className="nameTitle">{user.data.userInfo.name}</div>
                      <ul>
                        <strong>????????????</strong>
                        <li className="dob">{user.data.userInfo.dob}</li>
                        <strong>?????????</strong>
                        <li className="email">{user.data.userInfo.email}</li>
                        {user.data.userInfo.role === "actor" ? (
                          <>
                            <strong>?????????</strong>
                            <li className="company">
                              {user.data.userInfo.company}
                            </li>
                          </>
                        ) : (
                          <>
                            <strong>??????</strong>
                            <li className="company">{recruiter.bName}</li>
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
                            <div className="nameTitle">
                              {user.data.userInfo.name}
                            </div>
                            <ul>
                              <strong>????????????</strong>
                              <li className="dob">
                                <DatePicker
                                  defaultValue={moment(dob, "YYYY-MM-DD")}
                                  onChange={(date, dateString) => {
                                    setDob(dateString);
                                  }}
                                  style={{}}
                                ></DatePicker>
                              </li>

                              <strong>?????????</strong>
                              <li className="email">
                                {user.data.userInfo.email}
                              </li>
                              {user.data.userInfo.role === "actor" ? (
                                <>
                                  <strong>?????????</strong>
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
                                  <strong>??????</strong>
                                  <li className="company">
                                    <input
                                      type="text"
                                      className="highlightDisplay"
                                      defaultValue={recruiter.bName}
                                      onChange={handleInputValue("bName")}
                                    ></input>
                                  </li>
                                  <strong>??????</strong>
                                  <li className="company">
                                    <input
                                      type="text"
                                      className="highlightDisplay"
                                      defaultValue={recruiter.jobTitle}
                                      onChange={handleInputValue("jobTitle")}
                                    ></input>
                                  </li>
                                  <strong>?????? ?????????</strong>
                                  <li className="company">
                                    <input
                                      type="text"
                                      className="highlightDisplay"
                                      defaultValue={recruiter.bEmail}
                                      onChange={handleInputValue("bEmail")}
                                    ></input>
                                  </li>
                                  <strong>????????????</strong>
                                  <li className="company">
                                    <input
                                      type="text"
                                      className="highlightDisplay"
                                      defaultValue={recruiter.phoneNum}
                                      onChange={handleInputValue("phoneNum")}
                                    ></input>
                                  </li>
                                  <strong>?????? ??????</strong>
                                  <li className="company">
                                    {recruiter.bAddress.zipCode}
                                    <br />
                                    {recruiter.bAddress.city}
                                    <br />
                                    <input
                                      type="text"
                                      className="highlightDisplay"
                                      defaultValue={recruiter.bAddress.street}
                                      onChange={handleInputValue("street")}
                                    ></input>
                                    <br />
                                  </li>
                                </>
                              )}
                            </ul>
                            {user.data.userInfo.role === "actor" ? null : (
                              <div className="passwordModifyButton">
                                <Button
                                  variant="outlined"
                                  className="passwordModifyBtn"
                                  onClick={() => setAddressModalVisible(true)}
                                >
                                  ?????? ??????
                                </Button>
                                <Modal
                                  title="?????? ?????? ??????"
                                  visible={addressModalVisible}
                                  onCancel={() => setAddressModalVisible(false)}
                                  footer={null}
                                >
                                  <DaumPostcode
                                    onComplete={handleAddressComplete}
                                  />
                                </Modal>
                              </div>
                            )}
                            <div className="passwordModifyButton">
                              {
                                user.data.userInfo.provider === "local" ? (
                                <Button
                                  variant="outlined"
                                  className="passwordModifyBtn"
                                  onClick={showModal}
                                >
                                  ???????????? ??????
                                </Button>
                                ) : null
                              }
                              
                              <Modal
                                title="???????????? ??????"
                                visible={isModalVisible}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                width={330}
                                okText="??????"
                                cancelText="??????"
                              >
                                <p>???????????? ??????????????? ?????????????????????. </p>
                                <br />
                                <div>
                                  ???????????? &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                  <input
                                    type="password"
                                    className="passwordDef"
                                    onChange={handleInputValue("password")}
                                  ></input>
                                </div>
                                <br />
                                <div>
                                  ???????????? ??????
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
                                              {post.media[0].type === "img" ? (
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
                                              <FileMetaData2>
                                                <aside>
                                                  <RemoveFileIcon2
                                                    className="fas fa-trash-alt"
                                                    onClick={() =>
                                                      handleClickDeleteBtn(
                                                        post._id
                                                      )
                                                    }
                                                  />
                                                </aside>
                                              </FileMetaData2>
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
                                                "???????????? ?????????????????????",
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
                                              message: "????????? ?????????????????????",
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
                                          rules={[
                                            {
                                              required: true,
                                              message: "????????? ?????????????????????",
                                            },
                                          ]}
                                        >
                                          <Select
                                            style={{ width: 110 }}
                                            onChange={onChangeTag}
                                          >
                                            <Option value="?????????">
                                              ?????????
                                            </Option>
                                            <Option value="??????">??????</Option>
                                            <Option value="?????????">
                                              ?????????
                                            </Option>
                                            <Option value="??????">??????</Option>
                                            <Option value="??????">??????</Option>
                                            <Option value="???????????????">
                                              ???????????????
                                            </Option>
                                          </Select>
                                        </Form.Item>

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
                                        ?????? ????????????
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
                                ????????????
                              </Button>
                            </Form.Item>
                          </Form>

                          <span className="career-box">
                            {user.data.userInfo.careers.map((career, idx) => {
                              return (
                                <>
                                  <li className="career-li" key={idx}>
                                    <div className="careerDivide">
                                      <div className="career-title">
                                        ??????:{career.title}
                                      </div>
                                      <div className="career-year">
                                        ????????????:{career.year.split("T")[0]}
                                      </div>
                                      <div className="blockhereplz"></div>
                                      <CloseOutlined
                                        className="career-delete-btn"
                                        onClick={() => {
                                          handleDeleteBtn(idx);
                                        }}
                                      />
                                    </div>
                                    <div className="careerDivide">
                                      <div className="tag">
                                        <div className="tagPosition">??????:</div>
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
                          <div>
                            <div className="postsGallery">
                              {likePost
                                ? likePost.map((post) => {
                                    return (
                                      <>
                                        <div className="galleryComponents">
                                          <PreviewContainer>
                                            <div className="img-container">
                                              {post.media[0].type === "img" ? (
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
                                              <FileMetaData2>
                                                <aside>
                                                  <Icon
                                                    className="heart"
                                                    onClick={() =>
                                                      handleClickLikeBtn(
                                                        post._id
                                                      )
                                                    }
                                                  />
                                                </aside>
                                              </FileMetaData2>
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
                        <TabPane tab="TAGGED" key="5">
                          ????????? ?????? ????????????.
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

      {isTablet && (
        <>
          <div className="blockhere"> </div>
          <div className="mainPage">
            <Nav />
            <ResponsiveIconlistTablet />

            <div className="newblockPosition"> </div>

            <div className="middleSpace2">
              <div className="midContents">
                <div className="buttonHeader">
                  <div className="profileTitleName"> ???????????? ??????</div>
                  <div>
                    <SaveOutlined
                      className="editButton"
                      onClick={() => handleClickSaveBtn()}
                    />
                    <DeleteOutlined
                      className="deleteButton"
                      onClick={() => setDeleteUserModal(true)}
                    />
                    <Modal
                      title="?????? ??????"
                      visible={deleteUserModal}
                      onOk={() => handleDeleteAccount()}
                      onCancel={() => setDeleteUserModal(false)}
                      okText="?????? ??????"
                      cancelText="?????? ??????"
                    >
                      ????????? ???????????? ????????? ????????? ?????? ??? ????????? ?????? ??????
                      ???????????????.
                      <br />
                      <strong>????????? ?????? ???????????? ???????????? ????????????.</strong>
                      <br />
                      ????????? ????????? ?????????????????????????
                    </Modal>
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
                          accept="*"
                          onChange={handleprofileButton}
                        />
                      </div>
                    </div>

                    <div className="fixedContent">
                      <div className="nameTitle">{user.data.userInfo.name}</div>
                      <ul>
                        <strong>????????????</strong>
                        <li className="dob">{user.data.userInfo.dob}</li>
                        <strong>?????????</strong>
                        <li className="email">{user.data.userInfo.email}</li>
                        {user.data.userInfo.role === "actor" ? (
                          <>
                            <strong>?????????</strong>
                            <li className="company">
                              {user.data.userInfo.company}
                            </li>
                          </>
                        ) : (
                          <>
                            <strong>??????</strong>
                            <li className="company">{recruiter.bName}</li>
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
                            <div className="nameTitle">
                              {user.data.userInfo.name}
                            </div>
                            <ul>
                              <strong>????????????</strong>
                              <li className="dob">
                                <DatePicker
                                  defaultValue={moment(dob, "YYYY-MM-DD")}
                                  onChange={(date, dateString) => {
                                    setDob(dateString);
                                  }}
                                  style={{}}
                                ></DatePicker>
                              </li>
                              <strong>?????????</strong>
                              <li className="email">
                                {user.data.userInfo.email}
                              </li>
                              {user.data.userInfo.role === "actor" ? (
                                <>
                                  <strong>?????????</strong>
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
                                  <strong>??????</strong>
                                  <li className="company">
                                    <input
                                      type="text"
                                      className="highlightDisplay"
                                      defaultValue={recruiter.bName}
                                      onChange={handleInputValue("bName")}
                                    ></input>
                                  </li>
                                  <strong>??????</strong>
                                  <li className="company">
                                    <input
                                      type="text"
                                      className="highlightDisplay"
                                      defaultValue={recruiter.jobTitle}
                                      onChange={handleInputValue("jobTitle")}
                                    ></input>
                                  </li>
                                  <strong>?????? ?????????</strong>
                                  <li className="company">
                                    <input
                                      type="text"
                                      className="highlightDisplay"
                                      defaultValue={recruiter.bEmail}
                                      onChange={handleInputValue("bEmail")}
                                    ></input>
                                  </li>
                                  <strong>????????????</strong>
                                  <li className="company">
                                    <input
                                      type="text"
                                      className="highlightDisplay"
                                      defaultValue={recruiter.phoneNum}
                                      onChange={handleInputValue("phoneNum")}
                                    ></input>
                                  </li>
                                  <strong>?????? ??????</strong>
                                  <li className="company">
                                    {recruiter.bAddress.zipCode}
                                    <br />
                                    {recruiter.bAddress.city}
                                    <br />
                                    <input
                                      type="text"
                                      className="highlightDisplay"
                                      defaultValue={recruiter.bAddress.street}
                                      onChange={handleInputValue("street")}
                                    ></input>
                                    <br />
                                  </li>
                                </>
                              )}
                            </ul>
                            {user.data.userInfo.role === "actor" ? null : (
                              <div className="passwordModifyButton">
                                <Button
                                  variant="outlined"
                                  className="passwordModifyBtn"
                                  onClick={() => setAddressModalVisible(true)}
                                >
                                  ?????? ??????
                                </Button>
                                <Modal
                                  title="?????? ?????? ??????"
                                  visible={addressModalVisible}
                                  onCancel={() => setAddressModalVisible(false)}
                                  footer={null}
                                >
                                  <DaumPostcode
                                    onComplete={handleAddressComplete}
                                  />
                                </Modal>
                              </div>
                            )}
                            <div className="passwordModifyButton">
                              {
                                user.data.userInfo.provider === "local" ? (
                                <Button
                                  variant="outlined"
                                  className="passwordModifyBtn"
                                  onClick={showModal}
                                >
                                  ???????????? ??????
                                </Button>
                                ) : null
                              }
                              <Modal
                                title="???????????? ??????"
                                visible={isModalVisible}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                width={330}
                                okText="??????"
                                cancelText="??????"
                              >
                                <p>???????????? ??????????????? ?????????????????????. </p>
                                <br />
                                <div>
                                  ???????????? &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                  <input
                                    type="password"
                                    className="passwordDef"
                                    onChange={handleInputValue("password")}
                                  ></input>
                                </div>
                                <br />
                                <div>
                                  ???????????? ??????
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
                                                alt=""
                                                className="postGallery-img"
                                                key={post._id}
                                                src={post.media[0].path}
                                              ></img>
                                              <FileMetaData2>
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
                                              </FileMetaData2>
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
                                                "???????????? ?????????????????????",
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
                                              message: "????????? ?????????????????????",
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
                                          rules={[
                                            {
                                              required: true,
                                              message: "????????? ?????????????????????",
                                            },
                                          ]}
                                        >
                                          <Select
                                            style={{ width: 110 }}
                                            onChange={onChangeTag}
                                          >
                                            <Option value="?????????">
                                              ?????????
                                            </Option>
                                            <Option value="??????">??????</Option>
                                            <Option value="?????????">
                                              ?????????
                                            </Option>
                                            <Option value="??????">??????</Option>
                                            <Option value="??????">??????</Option>
                                            <Option value="???????????????">
                                              ???????????????
                                            </Option>
                                          </Select>
                                        </Form.Item>
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
                                        ?????? ????????????
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
                                ????????????
                              </Button>
                            </Form.Item>
                          </Form>

                          <span className="career-box">
                            {user.data.userInfo.careers.map((career, idx) => {
                              return (
                                <>
                                  <li className="career-li" key={idx}>
                                    <div className="careerDivide">
                                      <div className="career-title">
                                        ??????:{career.title}
                                      </div>
                                      <div className="career-year">
                                        ????????????:{career.year.split("T")[0]}
                                      </div>
                                      <div className="blockhereplz"></div>
                                      <CloseOutlined
                                        className="career-delete-btn"
                                        onClick={() => {
                                          handleDeleteBtn(idx);
                                        }}
                                      />
                                    </div>
                                    <div className="careerDivide">
                                      <div className="tag">
                                        <div className="tagPosition">??????:</div>
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
                          <div>
                            <div className="postsGallery">
                              {likePost
                                ? likePost.map((post) => {
                                    return (
                                      <>
                                        <div className="galleryComponents">
                                          <PreviewContainer>
                                            <div className="img-container">
                                              {post.media[0].type === "img" ? (
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
                                              <FileMetaData2>
                                                <aside>
                                                  <Icon
                                                    className="heart"
                                                    onClick={() =>
                                                      handleClickLikeBtn(
                                                        post._id
                                                      )
                                                    }
                                                  />
                                                </aside>
                                              </FileMetaData2>
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
                        <TabPane tab="TAGGED" key="5">
                          ????????? ?????? ????????????.
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
                  <div className="profileTitleName"> ???????????? ??????</div>
                  <div>
                    <SaveOutlined
                      className="editButton"
                      onClick={() => handleClickSaveBtn()}
                    />
                    <DeleteOutlined
                      className="deleteButton"
                      onClick={() => setDeleteUserModal(true)}
                    />
                    <Modal
                      title="?????? ??????"
                      visible={deleteUserModal}
                      onOk={() => handleDeleteAccount()}
                      onCancel={() => setDeleteUserModal(false)}
                      okText="?????? ??????"
                      cancelText="?????? ??????"
                    >
                      ????????? ???????????? ????????? ????????? ?????? ??? ????????? ?????? ??????
                      ???????????????.
                      <br />
                      <strong>????????? ?????? ???????????? ???????????? ????????????.</strong>
                      <br />
                      ????????? ????????? ?????????????????????????
                    </Modal>
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
                          accept="*"
                          onChange={handleprofileButton}
                        />
                      </div>
                    </div>

                    <div className="fixedContent">
                      <div className="nameTitle">{user.data.userInfo.name}</div>
                      <ul>
                        <strong>????????????</strong>
                        <li className="dob">{user.data.userInfo.dob}</li>
                        <strong>?????????</strong>
                        <li className="email">{user.data.userInfo.email}</li>
                        {user.data.userInfo.role === "actor" ? (
                          <>
                            <strong>?????????</strong>
                            <li className="company">
                              {user.data.userInfo.company}
                            </li>
                          </>
                        ) : (
                          <>
                            <strong>??????</strong>
                            <li className="company">{recruiter.bName}</li>
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
                            <div className="nameTitle">
                              {user.data.userInfo.name}
                            </div>
                            <ul>
                              <strong>????????????</strong>
                              <li className="dob">
                                <DatePicker
                                  defaultValue={moment(dob, "YYYY-MM-DD")}
                                  onChange={(date, dateString) => {
                                    setDob(dateString);
                                  }}
                                  style={{}}
                                ></DatePicker>
                              </li>
                              <strong>?????????</strong>
                              <li className="email">
                                {user.data.userInfo.email}
                              </li>
                              {user.data.userInfo.role === "actor" ? (
                                <>
                                  <strong>?????????</strong>
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
                                  <strong>??????</strong>
                                  <li className="company">
                                    <input
                                      type="text"
                                      className="highlightDisplay"
                                      defaultValue={recruiter.bName}
                                      onChange={handleInputValue("bName")}
                                    ></input>
                                  </li>
                                  <strong>??????</strong>
                                  <li className="company">
                                    <input
                                      type="text"
                                      className="highlightDisplay"
                                      defaultValue={recruiter.jobTitle}
                                      onChange={handleInputValue("jobTitle")}
                                    ></input>
                                  </li>
                                  <strong>?????? ?????????</strong>
                                  <li className="company">
                                    <input
                                      type="text"
                                      className="highlightDisplay"
                                      defaultValue={recruiter.bEmail}
                                      onChange={handleInputValue("bEmail")}
                                    ></input>
                                  </li>
                                  <strong>????????????</strong>
                                  <li className="company">
                                    <input
                                      type="text"
                                      className="highlightDisplay"
                                      defaultValue={recruiter.phoneNum}
                                      onChange={handleInputValue("phoneNum")}
                                    ></input>
                                  </li>
                                  <strong>?????? ??????</strong>
                                  <li className="company">
                                    {recruiter.bAddress.zipCode}
                                    <br />
                                    {recruiter.bAddress.city}
                                    <br />
                                    <input
                                      type="text"
                                      className="highlightDisplay"
                                      defaultValue={recruiter.bAddress.street}
                                      onChange={handleInputValue("street")}
                                    ></input>
                                    <br />
                                  </li>
                                </>
                              )}
                            </ul>
                            {user.data.userInfo.role === "actor" ? null : (
                              <div className="passwordModifyButton">
                                <Button
                                  variant="outlined"
                                  className="passwordModifyBtn"
                                  onClick={() => setAddressModalVisible(true)}
                                >
                                  ?????? ??????
                                </Button>
                                <Modal
                                  title="?????? ?????? ??????"
                                  visible={addressModalVisible}
                                  onCancel={() => setAddressModalVisible(false)}
                                  footer={null}
                                >
                                  <DaumPostcode
                                    onComplete={handleAddressComplete}
                                  />
                                </Modal>
                              </div>
                            )}
                            <div className="passwordModifyButton">
                              {
                                user.data.userInfo.provider === "local" ? (
                                <Button
                                  variant="outlined"
                                  className="passwordModifyBtn"
                                  onClick={showModal}
                                >
                                  ???????????? ??????
                                </Button>
                                ) : null
                              }
                              <Modal
                                title="???????????? ??????"
                                visible={isModalVisible}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                width={330}
                                okText="??????"
                                cancelText="??????"
                              >
                                <p>???????????? ??????????????? ?????????????????????. </p>
                                <br />
                                <div>
                                  ???????????? &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                  <input
                                    type="password"
                                    className="passwordDef"
                                    onChange={handleInputValue("password")}
                                  ></input>
                                </div>
                                <br />
                                <div>
                                  ???????????? ??????
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
                                                alt=""
                                                className="postGallery-img"
                                                key={post._id}
                                                src={post.media[0].path}
                                              ></img>
                                              <FileMetaData2>
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
                                              </FileMetaData2>
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
                                                "???????????? ?????????????????????",
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
                                              message: "????????? ?????????????????????",
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
                                          rules={[
                                            {
                                              required: true,
                                              message: "????????? ?????????????????????",
                                            },
                                          ]}
                                        >
                                          <Select
                                            style={{ width: 110 }}
                                            onChange={onChangeTag}
                                          >
                                            <Option value="?????????">
                                              ?????????
                                            </Option>
                                            <Option value="??????">??????</Option>
                                            <Option value="?????????">
                                              ?????????
                                            </Option>
                                            <Option value="??????">??????</Option>
                                            <Option value="??????">??????</Option>
                                            <Option value="???????????????">
                                              ???????????????
                                            </Option>
                                          </Select>
                                        </Form.Item>

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
                                        ?????? ????????????
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
                                ????????????
                              </Button>
                            </Form.Item>
                          </Form>
                          <span className="career-box">
                            {user.data.userInfo.careers.map((career, idx) => {
                              return (
                                <>
                                  <li className="career-li" key={idx}>
                                    <div className="careerDivide5">
                                      <div className="career-title2">
                                        ??????: &nbsp; {career.title}
                                        <CloseOutlined
                                          className="career-delete-btn"
                                          onClick={() => {
                                            handleDeleteBtn(career._id);
                                          }}
                                        />
                                      </div>
                                      <div className="career-year3">
                                        ????????????: &nbsp;{" "}
                                        {career.year.split("T")[0]}
                                      </div>
                                      <div className="blockhereplz"></div>

                                      <div className="tag">
                                        <div className="tagPosition">??????:</div>
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
                          <div>
                            <div className="postsGallery">
                              {likePost
                                ? likePost.map((post) => {
                                    return (
                                      <>
                                        <div className="galleryComponents">
                                          <PreviewContainer>
                                            <div className="img-container">
                                              {post.media[0].type === "img" ? (
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
                                              <FileMetaData2>
                                                <aside>
                                                  <Icon
                                                    className="heart"
                                                    onClick={() =>
                                                      handleClickLikeBtn(
                                                        post._id
                                                      )
                                                    }
                                                  />
                                                </aside>
                                              </FileMetaData2>
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
                        <TabPane tab="TAGGED" key="5">
                          ????????? ?????? ????????????.
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
