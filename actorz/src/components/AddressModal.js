import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import Modal from "antd/lib/modal/Modal";
import "../styles/SignupModal.css";

const AddressModal = ({ addr, setAddr, isMobile }) => {
  const [addPopUp, setAddPopUp] = useState(false);

  const handleOpenAdd = () => {
    setAddPopUp(true);
  };

  const handleAddressComplete = (data) => {
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
      city: fullAddress,
    });
    setAddPopUp(false);
  };

  return (
    <>
      <div className="modal-group-signup">
        <div className="importEffect">*</div>
        <div>
          <button
            style={{
              width: "fit-content",
              fontSize: "0.7em",
              marginLeft: "0.9em",
              backgroundColor: "white",
              border: "1px solid lightgray",
              padding: "0.6rem",
            }}
            type="button"
            onClick={handleOpenAdd}
          >
            <span>우편번호 찾기</span>
          </button>
        </div>
      </div>
      <Modal
        maskStyle={{ height: "200%", width: "200%", backgroundColor: "white" }}
        footer={null}
        width="23rem"
        style={{ maxWidth: "23rem", maxHeight: "100%", top: "4rem" }}
        visible={addPopUp}
        maskClosable={true}
        title="회사 주소 검색"
        onCancel={() => setAddPopUp(false)}
        getContainer={".modal-get-container"}
      >
        <div className="modal_div">
          <DaumPostcode
            className="daumpostcode"
            onComplete={handleAddressComplete}
          />
        </div>
      </Modal>

      <div className="modal-group-signup">
        <div className="importEffect">*</div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              fontSize: "0.9rem",
              width: "90%",
              marginLeft: "0.9rem",
              textAlign: "left",
            }}
          >
            {addr.zipCode + " " + addr.city}
          </div>
        </div>
      </div>
      {addr.zipCode !== "" ? (
        <div className="modal-group-signup">
          <div className="importEffect">*</div>
          <div>
            <input
              style={{ width: "15rem" }}
              placeholder="추가 주소 기입란"
              type="text"
              name="extras"
              onChange={(event) => {
                setAddr({
                  ...addr,
                  street: event.target.value,
                });
              }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};
export default AddressModal;
