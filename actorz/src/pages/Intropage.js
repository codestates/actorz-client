import React from "react";
import { useMediaQuery } from "react-responsive"
import { Link } from "react-router-dom";
import '../App.css'
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import IntroNav from "../components/IntroNav";
//import IntroFooter from "../components/IntroFooter"
import ScrollTrigger from '@terwanerik/scrolltrigger';
import ResponsiveApp from "../components/responsiveApp/ResponsiveNav"
import Footer from "../components/Footer"
import ResponsiveFooter from "../components/responsiveApp/ResponsiveFooter";
const trigger = new ScrollTrigger();
trigger.add('[data-trigger]');



const Intropage = () => {

  const isPc = useMediaQuery({
    query : "(min-width:1024px)"
  });

  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)",
  });

  const isMobile = useMediaQuery({
    query : "(max-width:767px)"
  });

  return (
    <>
      {isPc && <div>
        <IntroNav />
        <div className="backgroundImage">
          {/* <IntroNav /> */}
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

        
        <Footer />

      </div>}
      
      {isTablet && 
        <>
        <IntroNav />
        <div className="backgroundImage">
          {/* <IntroNav /> */}
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

        <Footer />

        </>
      }

      {isMobile && <>
        <ResponsiveApp />
        <div className="backgroundImage">
          {/* <IntroNav /> */}
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
      </>}  
    </>
  )
}
export default Intropage;