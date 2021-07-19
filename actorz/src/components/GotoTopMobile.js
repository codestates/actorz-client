import React from 'react'
import { UpOutlined } from '@ant-design/icons';
import "../App.css"

const GotoTopMobile = () => {
  return (
    <>
      <a href="#" className="noEffectAtag">
        <div className="gotoTopBtnPositionM">
          <UpOutlined className="gotoTopBtnM"/>
        </div>
      </a>
    </>
  );
}

export default GotoTopMobile;