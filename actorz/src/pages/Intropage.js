import React from "react";
import { Link } from "react-router-dom"
import Nav from "../components/Nav";
import '../App.css'
import 'antd/dist/antd.css';
import { Button } from 'antd';

const Intropage = () => {
  return (
    <div className="backgroundImage">
      <Nav /> {/* navigation bar 상단에 고정시키려면 css에서 position:fixed 하면 됨*/}
       
        <div id="logoPosition">
          <img src="https://media.vlpt.us/images/iooi75/post/08503e87-6d66-4e92-948b-58988f10b27a/Screen%20Shot%202021-06-22%20at%209.24.46%20PM.png" alt="" 
            className="projectLogo"
          /> 
        </div>

        <div className="mainIntro1">매번 똑같은 포트폴리오 양식</div>
        <div className="mainIntro2">나만의 특별한 포트폴리오에 사진과 영상을 담아 남들과 다른 포트폴리오를 만들어 드리겠습니다.</div>


        <div className="initButtonPosition">
          <Link to="/mainpage"> 
              <Button type="primary" className="startButton1" danger>시작하기</Button>
          </Link>
        </div>

      <div id="section1">
        section1
      </div>

      <div id="footer">
        <div className="button2Position">
          <Link to="/mainpage"> 
            <Button type="primary" className="startButton2" danger>시작하기</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Intropage;