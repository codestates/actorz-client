import React from "react";
import { Link } from "react-router-dom"
import Nav from "../components/Nav";
import '../App.css'
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { GithubOutlined, ToolOutlined, InstagramOutlined, FormOutlined, FacebookOutlined, YoutubeOutlined, VerticalAlignBottomOutlined, ArrowDownOutlined} from '@ant-design/icons';
import IntroNav from "../components/IntroNav";

const Intropage = () => {
  return (
    <>
      <div className="backgroundImage">
        <IntroNav />{/* navigation bar 상단에 고정시키려면 css에서 position:fixed 하면 됨*/}
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
        <div className="blockPosition4">- </div>
        <div className="middleContents2"> 
          <div className="1995Position">
            <img src="https://media.vlpt.us/images/iooi75/post/2b4cc4a3-a7b7-42e6-b1df-516c4cf09264/image.png" alt=""
              className="1995"
            />
          </div>
        </div>
      </div>



      <div className="button2Position">
        <Link to="/mainpage">
          <Button type="primary" className="startButton2" danger>시작하기</Button>
        </Link>
      </div>
      <br></br><br></br><br></br><br></br>



      <div id="initFooter">
        <div className="footerUser1">
          <ToolOutlined className="footerIcon" />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="footerName">김선들 |</span>
          <a href='https://github.com/SundeulDonaKim' target='_blank'>
            <GithubOutlined className="footerIcon" />
          </a>
          <a href='https://velog.io/@dandelion' target='_blank'>
          <FormOutlined className="footerIcon" />
          </a>
          <InstagramOutlined className="footerIcon" />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>

        <div className="footerUser2">
          <span className="footerName">이한빈 |</span>
          <a href='https://github.com/lhb7021' target='_blank'>
            <GithubOutlined className="footerIcon" />
          </a>
          <a href='https://velog.io/@lhb7021' target='_blank'>
          <FormOutlined className="footerIcon" />
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>

        <div className="footerUser3">
          <span className="footerName">유지원 |</span>
          <a href='https://github.com/jiweon21' target='_blank'>
            <GithubOutlined className="footerIcon" />
          </a>
          <a href='https://velog.io/@jiwon22' target='_blank'>
          <FormOutlined className="footerIcon" />
          </a>
          <YoutubeOutlined className="footerIcon" />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>

        <div className="footerUser4">
          <span className="footerName">임현택 |</span>
          <a href='https://github.com/Captainjack-kor' target='_blank'>
            <GithubOutlined className="footerIcon" />
          </a>
          <a href='https://velog.io/@iooi75' target='_blank'>
          <FormOutlined className="footerIcon" />
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div>
    </>
  )
}
export default Intropage;