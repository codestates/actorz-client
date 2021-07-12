import React, { useState } from "react";
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
import Footer from "../components/Footer";
import "antd/dist/antd.css";
import { Button, Radio, Modal } from "antd";

const MypageEdit = ({ handeClickEditBtn }) => {
  const user = useSelector((user) => user.userInfoReducer);
  // userinforeducer에서 판단한다.

  //console.log(user);
  const dispatch = useDispatch();
  //const [clickCareer, setClickCareer] = useState([]);
  const [tag, setTag] = useState("");
  const [dob, setDob] = useState(user.data.userInfo.dob);
  const [email, setEmail] = useState(user.data.userInfo.email);
  const [company, setCompany] = useState(user.data.userInfo.company);
  const [password, setPassword] = useState("");
  //const [password, setPassword] = useState(user.data.userInfo.password);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  let s3Url = null;
  let result = null;

  const tagOptions = [
    { label: "드라마", value: "드라마" },
    { label: "영화", value: "영화" },
    { label: "뮤지컬", value: "뮤지컬" },
    { label: "연극", value: "연극" },
    { label: "광고", value: "광고" },
    { label: "뮤직비디오", value: "뮤직비디오" },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    let pwd1 = document.getElementsByClassName("passwordDef")[0].value;
    let pwd2 = document.getElementsByClassName("passwordDef")[1].value;
    let pwdLength =
      document.getElementsByClassName("passwordDef")[0].value.length;
    let checkCount = 0;

    //console.log('비밀번호 글자수: ' + pwdLength);

    if (pwdLength < 9 || pwdLength > 20) {
      alert("비밀번호는 9자 이상 20자 이하여야합니다!");
      pwd1 = "";
      pwd2 = "";
    } else {
      checkCount++;
    }
    if (pwd1 !== pwd2) {
      alert("비밀번호가 일치하지 않습니다!");
      pwd1 = "";
      pwd2 = "";
    } else {
      checkCount++;
    }

    if (checkCount >= 2) {
      checkCount = 0;
      setIsModalVisible(false);
      //setPassword(password.password);
      console.log("진짜 범인 검거: " + password);
      console.log(JSON.stringify(password));

      pwd1 = "";
      pwd2 = "";
    }
  };

  const handleCancel = () => {
    //setPassword(password.password);
    setIsModalVisible(false);
  };

  const onChangeTag = (e) => {
    if (e.target.value === "드라마") {
      setTag(e.target.value);
    } else if (e.target.value === "영화") {
      setTag(e.target.value);
    } else if (e.target.value === "뮤지컬") {
      setTag(e.target.value);
    } else if (e.target.value === "연극") {
      setTag(e.target.value);
    } else if (e.target.value === "광고") {
      setTag(e.target.value);
    } else if (e.target.value === "뮤직비디오") {
      setTag(e.target.value);
    }
  };

  const handleInputValue = (key) => (event) => {
    if (key === "dob") {
      setDob(event.target.value);
    } else if (key === "email") {
      setEmail(event.target.value);
    } else if (key === "company") {
      setCompany(event.target.value);
    } else if (key === "title") {
      setTitle({ [key]: event.target.value });
    } else if (key === "year") {
      setYear({ [key]: event.target.value });
    } else if (key === "password") {
      setPassword({ [key]: event.target.value });
    }
  };

  /* const handleClickAddBtn = () => {
    setClickCareer([...clickCareer, "career"]);
  }; */

  // const handleTagBtn = (event) => {
  //   if (event.key === "Enter") {
  //     setTag([...tag, event.target.value]);
  //   }
  // };

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
          console.log("회원탈퇴");
          window.location = "/mainpage";
        }
      })
      .catch((err) => {
        throw err;
      });
  };

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
      dob: dob,
      careers: user.data.userInfo.careers,
      password: password.password,
    };
    dispatch(editUserInfo(newUserInfo));
    await server
      .post(`/user/:user_id/update`, newUserInfo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log("비밀번호까지 변경이요.");
        alert("회원 정보가 변경되었습니다");
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleprofileButton = async (files) => {
    // 서버한테 s3버킷 url 받아오는 거에요
    await server
      .get(`upload`, {
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
    let fileData = files[0];
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

    // var fileExt = files[0].name.substring(files[0].name.lastIndexOf(".") + 1);
    // console.log("fileExt: "+fileExt);
    // if (
    //   fileExt === "img" ||
    //   fileExt === "jpg" ||
    //   fileExt === "png" ||
    //   fileExt === "jpeg"
    // ) {
    //   setNewFile([...newfile, { path: result, type: "img" }]);
    // } else if (fileExt === "mp4") {
    //   setNewFile([...newfile, { path: result, type: "video" }]);
    // }
  };

  const handleClickConfirmBtn = () => {
    document.getElementsByClassName("highlightDisplay")[1].value = "";
    document.getElementsByClassName("highlightDisplay")[2].value = "";
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

  return (
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
                  <img src={user.data.userInfo.mainPic} className="testPic" />

                  <div className="profileButton">
                    {/* <input
                    type="file"
                    name="file"
                    accept="image/jpeg, image/jpg"
                    onChange={handleprofileButton} 
                    required
                  /> */}
                    <Button
                      variant="outlined"
                      className="profileBtn"
                      onClick={handleprofileButton}
                    >
                      프로필 사진 변경
                    </Button>
                  </div>

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

                <div className="fixedContent">
                  <div className="nameTitle">{user.data.userInfo.name}</div>
                  <ul>
                    <strong>생년월일</strong>
                    <li className="dob">{user.data.userInfo.dob}</li>
                    <strong>이메일</strong>
                    <li className="email">{user.data.userInfo.email}</li>
                    <strong>소속사</strong>
                    <li className="company">
                      <input
                        type="text"
                        className="highlightDisplay"
                        defaultValue={user.data.userInfo.company}
                        onChange={handleInputValue("company")}
                      ></input>
                    </li>
                    {/* <strong>비밀번호</strong>
                    <li className="password">
                      <input
                        type="password"
                        className="highlightDisplay"
                        onChange={handleInputValue("password")}
                      ></input>
                    </li>
                    <strong>비밀번호 확인</strong>
                    <li className="passwordCheck">
                      <input
                        type="password"
                        className="highlightDisplay"
                      ></input> 
                    </li> */}
                  </ul>
                </div>
              </div>
              <div className="careerTitleDivide">
                <div className="careerTitle2">경력 수정하기 </div>
                <div className="iconTitle">🏆</div>
                <div className="careerButtonPosition">
                  <Button
                    variant="outlined"
                    className="careerButton"
                    onClick={handleClickConfirmBtn}
                  >
                    추가하기
                  </Button>
                </div>
              </div>

              <div className="careerContent">
                <div className="career-box">
                  <li className="career-li">
                    <div className="careerDivide">
                      <div className="career-title">
                        제목:
                        <input
                          type="text"
                          className="highlightDisplay"
                          onChange={handleInputValue("title")}
                        />
                      </div>
                      <div className="career-year">
                        활동연도:
                        <input
                          type="text"
                          className="highlightDisplay"
                          placeholder="1990-01-01"
                          onChange={handleInputValue("year")}
                        />
                      </div>
                      <div></div>
                    </div>
                    <br></br>
                    <div className="careerDivide2">
                      <div className="career-tag2">태그:</div>
                      <div>
                        <Radio.Group
                          className="radioButton"
                          options={tagOptions}
                          optionType="button"
                          buttonStyle="solid"
                          onChange={onChangeTag}
                        />
                      </div>
                    </div>
                  </li>
                </div>
              </div>
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
                            활동연도:{career.year}
                          </div>
                          {/* <div>{career.year}</div> */}
                          <div className="blockhereplz"></div>
                          <CloseOutlined
                            className="career-delete-btn"
                            onClick={() => {
                              handleDeleteBtn(career.id);
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
  );
};

export default MypageEdit;
