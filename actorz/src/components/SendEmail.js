import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { CloseOutlined } from "@ant-design/icons";

import "../styles/SendEmailModal.css";

import server from "../apis/server";
import Loading from "../components/loading";
import DaumPostcode from "react-daum-postcode";
import { Modal, Button, Radio, Space, Input } from "antd";

const SendEmail = ({ closePost, setEmailClick, userInfo, postData }) => {
  console.log(userInfo)
  console.log(postData)
  
  const { TextArea } = Input;
  const [emailContent, setEmailContent] = useState({
      name: userInfo.name,
      bName: userInfo.recruiter.bName,
      phoneNum: userInfo.recruiter.phoneNum,
      jobTitle: userInfo.recruiter.jobTitle,
      message: ""
  });

  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [bAddress, setbAddress] = useState(userInfo.recruiter.bAddress);
  const [recruiterEmail, setRecruiterEmail] = useState(userInfo.email);
  const [recruiterNewEmail, setRecruiterNewEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [err, setError] = useState("");

  const isPcOrTablet = useMediaQuery({
    query: "(min-width:768px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  const handleInputValue = (key) => (event) => {
    setEmailContent({ ...emailContent, [key]: event.target.value });
  };

  const handleRecruiterEmailValue = (event) => {
    event.stopPropagation();
    setRecruiterEmail(event.target.value);
  };

  const handleRecruiterNewEmailValue = (e) => {
    setRecruiterNewEmail(e.target.value);
  }

  const send = () => {
    setLoading(true);
    setButtonDisable(true);
    const {
      name,
      bName,
      phoneNum,
      jobTitle,
      message,
    } = emailContent;

    console.log(emailContent)
    console.log(recruiterEmail)

    if(
      !name ||
      !bName ||
      !bAddress ||
      !phoneNum ||
      !jobTitle ||
      !message ||
      !recruiterEmail
    ){
      setLoading(false);
      setButtonDisable(false);
      setError("모든 항목을 기입해주세요.");
    }else{
      setError("");
      if(recruiterEmail === 1 ) {
        if(!recruiterNewEmail){
          setError("모든 항목을 기입해주세요.");
          setLoading(false);
          setButtonDisable(false);
          return;
        }
        setRecruiterEmail(recruiterNewEmail);
      }
      server.post("/email", {
        recruiter: {
          ...emailContent,
          email: recruiterEmail,
          bAddress: `${bAddress.zipCode} | ${bAddress.city} | ${bAddress.street}`
        },
        actor_id: postData.userInfo.user_id
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      }).then(res => {
        console.log(res)
        // let node;
        // if(isMobile) {
        //   node = "#email-modal-container-mobile";
        // } else {
        //   node = "#email-modal-container";
        // }

        if(res.status === 200){
          Modal.success({
            title: "명함 전송 성공",
            content: "이메일을 전송에 성공하였습니다.",
            // getContainer: node
          })
          setEmailClick(false);
          closePost();
        }else{
          Modal.error({
            title: "명함 전송 실패",
            content: "이메일을 보내던 중 오류가 발생하였습니다. 다시 시도해보시기 바랍니다.",
            // getContainer: node
          })
          setEmailClick(false);
        }
        setLoading(false);
        setButtonDisable(false);
      })
    }
  };

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
    setbAddress({
      ...bAddress,
      zipCode: data.zonecode,
      city: fullAddress,
    });
    setAddressModalVisible(false);
  };

  return (
    <>
    {
      isPcOrTablet && (
        <>
          <center>
            <form onSubmit={(e) => e.preventDefault()}>
              <div id="email-modal-background" onClick={() => setEmailClick(false)}>
                <div
                  id="email-modal-container"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div id="email-container">
                    <div id="email-modal-header">
                      <div id="email-modal-header-content">
                        <CloseOutlined
                          className="email-close"
                          onClick={() => setEmailClick(false)}
                        />
                      </div>
                    </div>
                    <div className="email-modal-title">
                        <div>Send Email</div>
                    </div>
                    <div className="email-welcome-message">배우 [&nbsp;<b>{postData.userInfo.name}</b>&nbsp;] 에게 명함을 보냅니다</div>
                      <div className="email-modal-row-content">
                        <div className="email-modal-row-label" style={{marginBottom: "0.5rem"}}>
                          <div>보내는 사람</div>
                          <div>&nbsp;</div>
                        </div>
                        <div className="email-modal-row-value">
                          <input 
                            type="text" 
                            name="jobTitle" 
                            className="email-modal-row-value-short"
                            placeholder="직책"
                            defaultValue={userInfo.recruiter.jobTitle}
                            onChange={handleInputValue("jobTitle")}
                          />
                          /
                          <input 
                            type="text" 
                            name="name" 
                            className="email-modal-row-value-long"
                            placeholder="이름"
                            defaultValue={userInfo.name}
                            onChange={handleInputValue("name")}
                          />
                        </div>
                      </div>
                      <div className="email-modal-row-content">
                        <div className="email-modal-row-label">
                          소속기관
                        </div>
                        <div className="email-modal-row-value">
                          <input
                            onChange={handleInputValue("bName")}
                            type="text" 
                            placeholder="소속기관"
                            className="email-modal-row-value-long"
                            name="bName" 
                            defaultValue={userInfo.recruiter.bName}
                          />
                        </div>
                      </div>
                      <div className="email-modal-row-content">
                        <div className="email-modal-row-label">
                          전화번호
                        </div>
                        <div className="email-modal-row-value">
                          <input 
                            type="text" 
                            name="phoneNum" 
                            placeholder="전화번호"
                            className="email-modal-row-value-long"
                            defaultValue={userInfo.recruiter.phoneNum}
                            onChange={handleInputValue("phoneNum")}
                          />
                        </div>
                      </div>
                      <div className="email-modal-row-content">
                        <div className="email-modal-row-label">
                          <div>이메일</div>
                          <div>&nbsp;</div>
                          <div>&nbsp;</div>
                        </div>
                        <div className="email-modal-row-value">
                          <div className="email-form-radio">
                            <Radio.Group onChange={handleRecruiterEmailValue} value={recruiterEmail}>
                              <Space direction="vertical">
                                <Radio value={userInfo.email}>{userInfo.email}</Radio>
                                {userInfo.recruiter.bEmail ? (
                                  <>
                                    <Radio value={userInfo.recruiter.bEmail}>{userInfo.recruiter.bEmail}</Radio>
                                  </>
                                ):(
                                  <Radio value={1}>
                                    Others...
                                    {recruiterEmail === 1 ?
                                      <input 
                                        type="text" 
                                        name="recruiterEmail" 
                                        className="email-form-radio-input"
                                        placeholder="이메일"
                                        defaultValue={userInfo.recruiter.phoneNum}
                                        onChange={handleRecruiterNewEmailValue}
                                        style={{width:"95%", margin:0}}
                                      />
                                    : null}
                                  </Radio>
                                )}
                              </Space>
                            </Radio.Group>
                          </div>
                        </div>
                      </div>
                      <div className="email-modal-row-content">
                        <div className="email-modal-row-label">
                          <div>주소</div>
                          <div>&nbsp;</div>
                          <div>&nbsp;</div>
                          <div>&nbsp;</div>
                          <div>&nbsp;</div>

                        </div>
                        <div className="email-modal-row-value">
                          <div className="email-form-address-preview">
                            <Button
                              variant="outlined"
                              className="email-form-change-address"
                              onClick={() => setAddressModalVisible(true)}
                            >
                              주소 변경
                            </Button>
                            <div className="email-modal-row-value-long" style={{marginBottom: "0.5rem"}}>
                              {bAddress.zipCode}
                              <br/>
                              {bAddress.city}
                              <br/>
                            </div>
                          </div>
                          <input 
                            type="text" 
                            name="street" 
                            className="email-modal-row-value-long email-form-radio-input"
                            placeholder="나머지 주소"
                            onChange={(e) => {
                              setbAddress({
                                ...bAddress,
                                street: e.target.value
                              })
                            }}
                            defaultValue={ bAddress.street }
                          />
                        </div>
                      </div>
                      <div className="email-modal-row-content">
                        <div className="email-modal-row-label">
                          <div>메시지</div>
                          <div>&nbsp;</div>
                          <div>&nbsp;</div>
                        </div>
                        <div className="email-modal-row-value">
                          <TextArea
                            className="email-form-textArea"
                            onChange={handleInputValue("message")}
                            type="text" 
                            name="message" 
                            placeholder="전달하고자 하는 메시지를 입력해주세요"
                            autoSize={{ minRows: 3, maxRows: 10 }}
                          />
                        </div>
                      </div>
                    
                      <div className="email-send-btn-position">
                        {err ? <div className="email-err-message">{err}</div> : null}
                        <button 
                          className="email-send-btn"
                          onClick={send}
                          disabled={buttonDisable}
                        >
                            이메일 보내기
                        </button>
                      </div>
                      <Modal
                        title="회사 주소 변경"
                        visible={addressModalVisible}
                        getContainer="#email-modal-container"
                        onCancel={() => setAddressModalVisible(false)}
                        footer={null}
                      >
                        <DaumPostcode
                          onComplete={handleAddressComplete}
                        />
                      </Modal>
                      {isLoading ? <Loading /> : null}
                    </div>
                </div>
              </div>
            </form>
            </center>
          </>
      )
    }
    {
      isMobile && (
        <>
          <center>
            <form onSubmit={(e) => e.preventDefault()}>
              <div id="email-modal-background" onClick={() => setEmailClick(false)}>
                <div
                  id="email-modal-container-mobile"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div id="email-container-mobile">
                    <div id="email-modal-header">
                      <div id="email-modal-header-content-mobile">
                        <CloseOutlined
                          className="email-close"
                          onClick={() => setEmailClick(false)}
                        />
                      </div>
                    </div>
                    <div className="email-modal-title">
                        <div>Send Email</div>
                    </div>
                    <div className="email-welcome-message-mobile">배우 [&nbsp;<b>{postData.userInfo.name}</b>&nbsp;] 에게 명함을 보냅니다</div>
                    <div className="email-form-label-mobile">보내는 사람</div>
                    <div className ="email-mobile-vertical-align">
                      <div>
                      <input 
                        type="text" 
                        name="jobTitle" 
                        className="email-form-value-mobile-short email-form-value-mobile"
                        placeholder="직책"
                        defaultValue={userInfo.recruiter.jobTitle}
                        onChange={handleInputValue("jobTitle")}
                      />
                      &nbsp; /
                      <input 
                        type="text" 
                        name="name" 
                        className="email-form-value-mobile-medium email-form-value-mobile"
                        placeholder="이름"
                        defaultValue={userInfo.name}
                        onChange={handleInputValue("name")}
                      />
                      </div>
                      <input
                        onChange={handleInputValue("bName")}
                        type="text" 
                        placeholder="소속기관"
                        className="email-form-value-mobile"
                        name="bName" 
                        defaultValue={userInfo.recruiter.bName}
                      />
                      <input 
                        type="text" 
                        name="phoneNum" 
                        placeholder="전화번호"
                        className="email-form-value-mobile"
                        defaultValue={userInfo.recruiter.phoneNum}
                        onChange={handleInputValue("phoneNum")}
                      />
                      <div cclassName="email-form-label-mobile">
                        <Radio.Group onChange={handleRecruiterEmailValue} value={recruiterEmail}>
                          <Space direction="vertical" style={{margin: "0.5rem 0 0.5rem 0"}} >
                            <Radio value={userInfo.email}>{userInfo.email}</Radio>
                            {userInfo.recruiter.bEmail ? (
                              <>
                                <Radio value={userInfo.recruiter.bEmail}>{userInfo.recruiter.bEmail}</Radio>
                              </>
                            ):(
                              <Radio value={1}>
                                Others...
                                {recruiterEmail === 1 ?
                                  <input 
                                    type="text" 
                                    name="recruiterEmail" 
                                    className="email-form-radio-input"
                                    placeholder="이메일"
                                    defaultValue={userInfo.recruiter.phoneNum}
                                    onChange={handleRecruiterNewEmailValue}
                                    style={{width:"95%", margin:0}}
                                  />
                                : null}
                              </Radio>
                            )}
                          </Space>
                        </Radio.Group>
                      </div>
                      <div className="email-form-value-mobile">
                        {bAddress.zipCode}
                        <br/>
                        {bAddress.city}
                        <br/>
                      </div>
                      <input 
                        type="text" 
                        name="street" 
                        className="email-form-value-mobile email-form-radio-input"
                        placeholder="나머지 주소"
                        onChange={(e) => {
                          setbAddress({
                            ...bAddress,
                            street: e.target.value
                          })
                        }}
                        defaultValue={ bAddress.street }
                      />
                      <Button
                        variant="outlined"
                        className="email-form-label-mobile"
                        onClick={() => setAddressModalVisible(true)}
                      >
                        주소 변경 
                      </Button>
                        <TextArea
                          className="email-form-textArea-mobile"
                          onChange={handleInputValue("message")}
                          type="text" 
                          name="message" 
                          placeholder="전달하고자 하는 메시지를 입력해주세요"
                          autoSize={{ minRows: 3, maxRows: 10 }}
                        />
                      {err ? <div className="email-err-message">{err}</div> : null}
                      <div className="email-send-btn-position email-send-btn-mobile">
                        <button 
                          className="email-send-btn"
                          onClick={send}
                          disabled={buttonDisable}
                        >
                            이메일 보내기
                        </button>
                      </div>
                    </div>
                    <Modal
                      title="회사 주소 변경"
                      visible={addressModalVisible}
                      getContainer="#email-modal-container-mobile"
                      onCancel={() => setAddressModalVisible(false)}
                      footer={null}
                    >
                      <DaumPostcode
                        onComplete={handleAddressComplete}
                      />
                    </Modal>
                    {isLoading ? <Loading /> : null}
                  </div>
                </div>
              </div>
            </form>
            </center>
          </>
      )
    }
    </>
  )
};
export default SendEmail;