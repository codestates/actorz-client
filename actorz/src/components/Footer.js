import React from "react";
import { UserOutlined, IdcardOutlined, HeartOutlined, FileAddOutlined, HomeOutlined, GithubOutlined, ToolOutlined, InstagramOutlined, FormOutlined, FacebookOutlined, YoutubeOutlined, VerticalAlignBottomOutlined, ArrowDownOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';

const Footer = () => {
  return (
    <>
      <div id="Footer">
        <div className="footerUser1">
          <ToolOutlined className="footerIcon" />
          <span className="footerName">김선들</span>
          <a href='https://github.com/SundeulDonaKim' target='_blank' className="alinkEffect2">
            <GithubOutlined className="footerIcon" />
          </a>
          <a href='https://velog.io/@dandelion' target='_blank' className="alinkEffect2">
            <FormOutlined className="footerIcon" />
          </a>
          
          {/* <InstagramOutlined className="footerIcon" /> */}
        </div>

        <div className="footerUser2">
          <span className="footerName">이한빈</span>
          <a href='https://github.com/lhb7021' target='_blank' className="alinkEffect2">
            <GithubOutlined className="footerIcon" />
          </a>
          <a href='https://velog.io/@lhb7021' target='_blank' className="alinkEffect2">
            <FormOutlined className="footerIcon" />
          </a>
        </div>

        <div className="footerUser3">
          <span className="footerName">유지원</span>
          <a href='https://github.com/jiweon21' target='_blank' className="alinkEffect2">
            <GithubOutlined className="footerIcon" />
          </a>
          <a href='https://velog.io/@jiwon22' target='_blank' className="alinkEffect2">
            <FormOutlined className="footerIcon" />
          </a>
          {/* <YoutubeOutlined className="footerIcon" /> */}
        </div>

        <div className="footerUser4">
          <span className="footerName">임현택</span>
          <a href='https://github.com/Captainjack-kor' target='_blank' className="alinkEffect2">
            <GithubOutlined className="footerIcon" />
          </a>
          <a href='https://velog.io/@iooi75' target='_blank' className="alinkEffect2">
            <FormOutlined className="footerIcon" />
          </a>
        </div>
      </div>
    </>
  );
}
export default Footer;
