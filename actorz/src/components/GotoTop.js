import React from 'react'
import {UpOutlined } from '@ant-design/icons';
import "../App.css"

const GotoTop = () => {
  return (
    <>
      <a href="#" className="noEffectAtag">
        <div className="gotoTopBtnPosition">
          <UpOutlined className="gotoTopBtn"/>
        </div>
      </a>
    </>
  );
}

export default GotoTop;