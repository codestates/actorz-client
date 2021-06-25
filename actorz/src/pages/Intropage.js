import React from "react";
import { Link } from "react-router-dom"
import Nav from "../components/Nav";
import '../App.css'
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { GithubOutlined, ToolOutlined, InstagramOutlined, FormOutlined, FacebookOutlined, YoutubeOutlined } from '@ant-design/icons';

const Intropage = () => {
  return (
    <>
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

      </div>

      <div className="button2Position">
        <Link to="/mainpage">
          <Button type="primary" className="startButton2" danger>시작하기</Button>
        </Link>
      </div>
      <br></br><br></br><br></br><br></br>


      <div id="initFooter">
        <ToolOutlined className="footerIcon" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="footerName">김선들 |</span>
        <GithubOutlined className="footerIcon" />
        <FormOutlined className="footerIcon" />
        <InstagramOutlined className="footerIcon" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <span className="footerName">이한빈 |</span>
        <GithubOutlined className="footerIcon" />
        <FormOutlined className="footerIcon" />
        <InstagramOutlined className="footerIcon" />
        <FacebookOutlined className="footerIcon" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <span className="footerName">유지원 |</span>
        <GithubOutlined className="footerIcon" />
        <FormOutlined className="footerIcon" />
        <YoutubeOutlined className="footerIcon" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <span className="footerName">임현택 |</span>
        <a href='https://www.naver.com' target='_blank'>
          <GithubOutlined className="footerIcon" />
        </a>

        <FormOutlined className="footerIcon" />
        <InstagramOutlined className="footerIcon" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
    </>
  )
}
export default Intropage;