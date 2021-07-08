import React, { useEffect, useState } from "react";
import { getUserInfo } from "../actions/userAction";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from 'antd';
import { ArrowDownOutlined} from '@ant-design/icons';

import '../App.css'
import 'antd/dist/antd.css';

import server from "../apis/server";
import IntroNav from "../components/IntroNav";
import SocialSignup from "../components/SocialSignup";
import IntroFooter from "../components/IntroFooter"
import ScrollTrigger from '@terwanerik/scrolltrigger';

const trigger = new ScrollTrigger();

trigger.add('[data-trigger]', { once: false });


const LoginCallback = () => {
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState(false);
  const [email, setEmail] = useState("");

  const login = async () => {
    try{
      const location = window.location.href.split("=")[1];
      const code = location.split("&")[0];
      await server.post("/login/naver", { code }).then( async res => {
        if (res.status === 200) { //로그인 성공
          localStorage.setItem("accessToken", res.data.data.accessToken);
          await server //로그인한 유저의 정보를 state에 저장
          .get(`/user/:user_id`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              dispatch(getUserInfo(res.data.data.userInfo));
            }
          })
          .catch((err) => {
            throw err;
          });

          window.location.href = process.env.REACT_APP_GOOGLE_REDIRECT_URI
        } else if(res.status === 201) { //새로운 유저
          setNewUser(true);
          setEmail(res.data.data.email);
        } else {
          alert("네이버 로그인 중 오류가 발생했습니다.");
          return;
        }
      });
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {login()}, [])
  
  return (
    <>
      <div className="backgroundImage">
        <IntroNav />{/* navigation bar 상단에 고정시키려면 css에서 position:fixed 하면 됨*/}
        {
          newUser ? (
            <SocialSignup email={email} provider="naver"></SocialSignup>
          ) : (
            <></>
          )
        }
        <div className="blockPosition"></div>
        <div className="introContainer">
          <div id="logoPosition">
            <img src="https://media.vlpt.us/images/iooi75/post/08503e87-6d66-4e92-948b-58988f10b27a/Screen%20Shot%202021-06-22%20at%209.24.46%20PM.png" alt=""
              className="projectLogo"
            />
          </div>
          <div className="mainIntro1">매번 똑같은 포트폴리오 양식</div>
            <br></br>
          <div className="mainIntro2">나만의 특별한 포트폴리오에 사진과 영상을 담아 남들과 다른 포트폴리오를 만들어 드리겠습니다.</div>
            <br></br><br></br><br></br>
          <div className="button1Position">
            <Link to="/mainpage">
              <Button type="primary" className="startButton1" danger>시작하기</Button>
            </Link>
          </div>
          <div className="scrollEffect">
            스크롤을 내려주세요!
          </div>
          <ArrowDownOutlined className="scrollIcon"/>
        </div>
      </div>

      <div className="blockPosition2">
        <div className="blockPosition3"> </div>
        <div className="middleContents"> </div>
        <div className="blockPosition4"> </div>
        <div className="middleContents2"> 
            <div className="blackSpace01"> </div> 

            <div className="actorCardposition">
             
            </div>
            <div className="blackSpace02">  </div>
        </div>
      </div>

      <div className="lastContents"> 
        <div className="lastContext">
          다음 2022년 시상식의 주인공은 바로 여러분입니다!
        </div>
        <div className="lastContext">
          Acotrz는 여러분의 꿈을 도와 드리겠습니다.
        </div>
      </div>


      <div className="button2Position">
        <Link to="/mainpage">
          <Button type="primary" className="startButton2" danger>시작하기</Button>
        </Link>
      </div>
      <br></br><br></br><br></br><br></br>

      <IntroFooter />

      
    </>
  )
}
export default LoginCallback;