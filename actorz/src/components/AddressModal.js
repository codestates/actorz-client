import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode"; ///
import { CloseOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";

const AddressModal = ({ addr, setAddr, isMobile }) => {
  const [addPopUp, setAddPopUp] = useState(false);
  const [divHeight, setDivHeight] = useState("30rem");
  const [divWidth, setDivWidth] = useState("30rem");
  const [boxHeight, setBoxHeight] = useState("30rem");
  const [boxWidth, setBoxWidth] = useState("30rem");
  const [boxPosition, setBoxPosition] = useState("12%");
  const [boxLeftPosition, setBoxLeftPosition] = useState("5%");
  const [modalPosition, setModalPosition] = useState("20%");


  useEffect(() => {
    if(isMobile){
      setDivHeight("25rem");
      setDivWidth("100%");
      setBoxHeight("30rem");
      setBoxWidth("11rem");
      setBoxPosition("2rem");
      setBoxLeftPosition("-3%");
      setModalPosition("20%");
    }else{
      setDivHeight("30rem");
      setDivWidth("30rem");
      setBoxHeight("30rem");
      setBoxWidth("30rem");
      setBoxPosition("12%");
      setBoxLeftPosition("0%");
      setModalPosition("17%");
    }
  },[isMobile]);

  const handleOpenAdd = () => {
    
    setAddPopUp(true);
  }

  const handleAddressComplete = (data) => { ///
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setAddr({
      zipCode: data.zonecode,
      city: fullAddress
    });
    setAddPopUp(false);
  };

  return (
    <>
      <div className="modal-group-signup" id="modal-group-signup-address-pop-up">
        <div className="importEffect">*</div>
        <div>
          <button style={{
            width:"fit-content", 
            fontSize:"0.7em", 
            marginLeft: "0.9em",
            backgroundColor: "white",
            border: "1px solid lightgray",
            padding: "0.6rem"
          }} type="button" onClick={handleOpenAdd} >
              <span>우편번호 찾기</span>
          </button>
        </div>
      </div>
      <Modal
        zIndex={10000}
        footer={null}
        width={divWidth}
        style={{top:modalPosition}}
        visible={addPopUp}
        title="회사 주소 검색"
        onCancel={() => setAddPopUp(false)}
        getContainer={document.getElementById("modal-group-signup-address-pop-up")}
      >
        <div
          style={{
            width: divWidth,
            height: divHeight,
          }}
        >
        <DaumPostcode style={{
          display: "block",
          position: "absolute",
          top: boxPosition,
          left: boxLeftPosition,
          width: boxWidth,
          height: boxHeight,
          padding: "0.7em",
        }}
        onComplete={handleAddressComplete}
        />
        </div>
      </Modal>
      
      <div className="modal-group-signup">
        <div className="importEffect">*</div>
        <div style={{display: "flex"}}>
          <div style={{fontSize: "0.9rem", width: "90%", marginLeft:"0.9rem", textAlign: "left"}}>
            {addr.zipCode + " " + addr.city}
          </div>
        </div>
      </div>
      {
        addr.zipCode !== "" ? (
          <div className="modal-group-signup">
            <div className="importEffect">*</div>
            <div>
              <input
                style={{width:"15rem"}}
                placeholder="추가 주소 기입란"
                type="text" 
                name="extras" 
                onChange={(event) => {
                  setAddr({
                    ...addr,
                    street: event.target.value
                  });
              }}/>
            </div>
          </div>
        ) : null
      }
    </>
  )
};
export default AddressModal;