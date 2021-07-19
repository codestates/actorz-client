import React from 'react'
import { UpOutlined } from '@ant-design/icons';
import "../App.css"

const GotoTopTablet = () => {
  return (
    <>
      <a href="#" className="noEffectAtag">
        <div className="gotoTopBtnPositionT">
          <UpOutlined className="gotoTopBtn"/>
        </div>
      </a>
    </>
  );
}

export default GotoTopTablet;