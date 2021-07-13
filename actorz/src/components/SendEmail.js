import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";

import "../styles/SignupModal.css";

import server from "../apis/server";
import Loading from "../components/loading";


const SendEmail = ({ handleClickPost, setEmailClick, userInfo, postData }) => {
  console.log(userInfo)
  console.log(postData)

  const [emailContent, setEmailContent] = useState({});
  const [recruiterEmail, setRecruiterEmail] = useState(userInfo.email);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");


  const handleInputValue = (key) => (event) => {
    setEmailContent({ ...emailContent, [key]: event.target.value });
  };

  const handleRecruiterEmailValue = (event) => {
    setRecruiterEmail(event.target.value);
  };

  const send = () => {
    setLoading(true);
    const {
      name,
      bName,
      bAddress,
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
      setError("모든 항목을 기입해주세요.");
    }else{
      setError("");
      server.post("/email", {
        recruiter: {
          ...emailContent,
          email: recruiterEmail
        },
        actor_id: postData.userInfo.user_id
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      }).then(res => {
        setLoading(false);
        console.log(res)
        if(res.status === 200){
          alert("명함을 성공적으로 보냈습니다.");
          setEmailClick(false);
          handleClickPost(false);
        }else{
          alert("이메일을 보내던 중 오류가 발생하였습니다. 다시 시도해보시기 바랍니다.");
          setEmailClick(false);
        }
      })
    }
  };


  return (
    <>
    <center>
      <form onSubmit={(e) => e.preventDefault()}>
        <div id="modal-background" onClick={() => setEmailClick(false)}>
          <div
            id="modal-container"
            onClick={(event) => event.stopPropagation()}
          >
            <div id="modal-header"></div>
              <div id="modal-section">
                <div className="modal-title">
                  <div className="title">
                    <div>Send Email</div>
                    <CloseOutlined
                      className="closeBtn"
                      onClick={() => setEmailClick(false)}
                    />
                  </div>
                </div>
                <div className="modal-welcome-message">배우 [ <b>{postData.userInfo.name}</b> ] 에게 명함을 보냅니다</div>
                <br/>
                <div className="modal-group-email">
                  <div className="modal-send-email-label">
                    보내는 사람
                  </div>
                  <input 
                    type="text" 
                    name="name" 
                    defaultValue={userInfo.name}
                    onChange={handleInputValue("name")}
                  />
                </div>
                <div className="modal-group-email">
                  <div className="modal-send-email-label">
                    직책
                  </div>
                  <input 
                    type="text" 
                    name="jobTitle" 
                    defaultValue={userInfo.recruiter.jobTitle}
                    onChange={handleInputValue("jobTitle")}
                  />
                </div>
                <div className="modal-group-email">
                  <div className="modal-send-email-label">
                    이메일
                  </div>
                  <input 
                    type="radio" 
                    value={userInfo.email} 
                    name="email" 
                    defaultChecked
                    onClick={handleRecruiterEmailValue}
                  /> {userInfo.email}
                  {
                    userInfo.recruiter.bEmail ? (
                      <>
                        <input 
                          type="radio" 
                          value={userInfo.recruiter.bEmail} 
                          name="email" 
                          onClick={handleRecruiterEmailValue}
                        /> 
                        {userInfo.recruiter.bEmail}
                      </>
                    ) : null
                  }
                </div>
                <div className="modal-group-email">
                  <div className="modal-send-email-label">
                    전화번호
                  </div>
                  <input 
                    type="text" 
                    name="phoneNum" 
                    defaultValue={userInfo.recruiter.phoneNum}
                    onChange={handleInputValue("phoneNum")}
                  />
                </div>
                <div className="modal-group-email">
                  <div className="modal-send-email-label">
                    주소
                  </div>
                  <input 
                    type="text" 
                    name="bAddress" 
                    onChange={handleInputValue("bAddress")}
                    defaultValue={
                      userInfo.recruiter.bAddress.city 
                      + "/" 
                      + userInfo.recruiter.bAddress.street 
                      + "/"
                      + userInfo.recruiter.bAddress.zipcode
                  }
                  />
                </div>
                <div className="modal-group-email">
                  <div className="modal-send-email-label">
                    회사명
                  </div>
                  <input
                    onChange={handleInputValue("bName")}
                    type="text" 
                    name="bName" 
                    defaultValue={userInfo.recruiter.bName}
                  />
                </div>
                <div className="modal-group-email">
                  <div className="modal-send-email-label">
                    메시지
                  </div>
                  <input 
                    onChange={handleInputValue("message")}
                    type="text" 
                    name="message" 
                    placeholder="전달하고자 하는 메시지를 입력해주세요"
                  />
                </div>
            </div>
            <button onClick={send}>
              이메일 보내기
            </button>
            {err ? <div className="err-message">{err}</div> : null}
          </div>
        </div>
      </form>
      </center>
    </>
  )
};
export default SendEmail;