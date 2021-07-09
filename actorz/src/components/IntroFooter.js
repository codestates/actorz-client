import React from 'react'
import { ArrowDownOutlined, UserOutlined, IdcardOutlined, HeartOutlined, FileAddOutlined, HomeOutlined, GithubOutlined, ToolOutlined, InstagramOutlined, FormOutlined, YoutubeOutlined} from '@ant-design/icons';

const IntroFooter = () => {
  return (
    <div id="initFooter">
      <div className="footerUser1">
        <ToolOutlined className="footerIcon" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="footerName">김선들 |</span>
        <a href="https://github.com/SundeulDonaKim" rel="noreferrer" target="_blank" className="alinkEffect">
          <GithubOutlined className="footerIcon" />
        </a>
        <a href="https://velog.io/@dandelion" rel="noreferrer" target="_blank" className="alinkEffect">
        <FormOutlined className="footerIcon" />
        </a>
        {/* <InstagramOutlined className="footerIcon" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
      </div>

      <div className="footerUser2">
        <span className="footerName">이한빈 |</span>
        <a href="https://github.com/lhb7021" rel="noreferrer" target="_blank" className="alinkEffect">
          <GithubOutlined className="footerIcon" />
        </a>
        <a href="https://velog.io/@lhb7021" rel="noreferrer" target="_blank" className="alinkEffect">
        <FormOutlined className="footerIcon" />
        </a>
      </div>

      <div className="footerUser3">
        <span className="footerName">유지원 |</span>
        <a href="https://github.com/jiweon21" rel="noreferrer" target="_blank" className="alinkEffect">
          <GithubOutlined className="footerIcon" />
        </a>
        <a href="https://velog.io/@jiwon22" rel="noreferrer" target="_blank" className="alinkEffect">
        <FormOutlined className="footerIcon" />
        </a>
        {/* <YoutubeOutlined className="footerIcon" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
      </div>

      <div className="footerUser4">
        <span className="footerName">임현택 |</span>
        <a href="https://github.com/Captainjack-kor" rel="noreferrer" target="_blank" className="alinkEffect">
          <GithubOutlined className="footerIcon" />
        </a>
        <a href="https://velog.io/@iooi75" rel="noreferrer" target="_blank" className="alinkEffect">
        <FormOutlined className="footerIcon" />
        </a>
        {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
      </div>
    </div>
  );
}

export default IntroFooter;