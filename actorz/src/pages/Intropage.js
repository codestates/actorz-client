import React from "react";
import { Link } from "react-router-dom"
import Nav from "../components/Nav";
import '../App.css'
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { GithubOutlined, ToolOutlined, InstagramOutlined, FormOutlined, FacebookOutlined, YoutubeOutlined, VerticalAlignBottomOutlined, ArrowDownOutlined} from '@ant-design/icons';
import IntroNav from "../components/IntroNav";
import ScrollTrigger from '@terwanerik/scrolltrigger';
const trigger = new ScrollTrigger();

trigger.add('[data-trigger]', { once: false });


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
        <div className="blockPosition4"> </div>
        <div className="middleContents2"> 
            <div className="blackSpace01"> </div> 

            <div className="actorCardposition">
              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/2b4cc4a3-a7b7-42e6-b1df-516c4cf09264/image.png" alt=""
                  className="actor1995"
                />
              </div>

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/927f6e62-56ac-4ad8-96c2-98b301819b78/image.png" alt=""
                  className="actor1996"
                />
              </div>

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/5b7ac3a8-eb82-4fc6-9b68-f55f7d98870b/image.png" alt=""
                  className="actor1997"
                />
              </div>

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/4ab81f7e-2cc1-4215-bff5-615a926d5fda/image.png" alt=""
                  className="actor1998"
                />
              </div>

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/f095e95d-1d92-4b2b-876e-8756123c972c/image.png" alt=""
                  className="actor1999"
                />
              </div>

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/cd69845d-17e5-44dd-82f1-b6d3d2305c2a/image.png" alt=""
                  className="actor2000"
                />
              </div>

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/29ea4238-2775-433a-9e03-1d615fe50434/image.png"
                  className="actor2001"
                />
              </div>

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/a72a3f00-cd2d-484c-b80a-3d578d2d1313/image.png" alt=""
                  className="actor2002"
                />
              </div>

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/516f6d70-b23e-498c-b9de-1641b4e1090f/image.png" alt=""
                  className="actor2003"
                />
              </div>

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/64c633f5-1b5a-4158-9cd8-cf0528a76503/image.png" alt=""
                  className="actor2004"
                />
              </div>

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/200568dc-995a-4a16-a74a-be7978496a4f/image.png" alt=""
                  className="actor2005"
                />
              </div>

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/561c3620-0658-4772-8703-9664a25f50ad/image.png" alt=""
                  className="actor2006"
                />
              </div>

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/201c7920-da83-49c0-89fa-b039b94a6eb2/image.png" alt=""
                  className="actor2007"
                />
              </div>

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/150a3db2-0ebc-4a60-9220-b319300f9a41/image.png" alt=""
                  className="actor2008"
                />
              </div>

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/a4daa1b4-2ee1-461f-8f35-6ed1b73bf7bd/image.png" alt=""
                  className="actor2009"
                />
              </div>

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/421e4542-680c-4f90-aa33-9a916125899e/image.png" alt=""
                  className="actor2010"
                />
              </div>

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/5e398436-b950-472f-aed6-2fc52939df11/image.png" alt=""
                  className="actor2011"
                />
              </div> 

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/d4f5160b-e244-4897-a8fd-71f65ade6e32/image.png" alt=""
                  className="actor2012"
                />
              </div>

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/0909c380-910d-478b-83e4-a0af471feff4/image.png" alt=""
                  className="actor2013"
                />
              </div> 

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/2d18320d-c478-4dc4-8d13-9c76499f1a43/image.png" alt=""
                  className="actor2014"
                />
              </div> 

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/cb112766-1934-4282-87ed-9c6384afa7e8/image.png" alt=""
                  className="actor2015"
                />
              </div> 
              

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/14bfeab1-d5c0-47ba-a07e-3df549855794/image.png" alt=""
                  className="actor2016"
                />
              </div> 

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/4e2a145e-44a7-4fa3-b148-37c24cb524c8/image.png" alt=""
                  className="actor2017"
                />
              </div> 

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/fdd1ff15-cecb-48ba-b3cc-d204672ae028/image.png" alt=""
                  className="actor2018"
                />
              </div> 

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/d046275e-8720-4544-9116-0fc9d6b69395/image.png" alt=""
                  className="actor2019"
                />
              </div> 

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/0125cdd7-a68b-45b6-a55a-1ac4d28ef975/image.png" alt=""
                  className="actor2020"
                />
              </div> 

              <div data-trigger>
                <img src="https://media.vlpt.us/images/iooi75/post/2690032c-17d3-44bb-bcc0-ba32b00babf4/image.png" alt=""
                  className="actorLastimage"
                />
              </div>
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