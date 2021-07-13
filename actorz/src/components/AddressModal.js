import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode"; ///

const AddressModal = ({ addr, setAddr }) => {
  const [addPopUp, setAddPopUp] = useState(false);
  const [extras, setExtras] = useState("");

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
      zipcode: data.zonecode,
      city: fullAddress
    });
    setAddPopUp(false);
  };

  return (
    <>
    <div className="modal-group-signup">
      <div className="importEffect">*</div>
      <div>
        <button style={{width:"7em", fontSize:"0.7em", marginLeft: "0.9em"}} type="button" onClick={handleOpenAdd} >
            <span>우편번호 찾기</span>
        </button>
      </div>
    </div>
      {
        addPopUp ? (
          <DaumPostcode style={{
            display: "block",
            position: "absolute",
            top: "50%",
            width: "90%",
            height: "80%",
            padding: "0.7em",
          }} 
          onComplete={handleAddressComplete} 
          />
          ) : null
        }
      <div className="modal-group-signup">
        <div className="importEffect">*</div>
        <div>
          <div style={{fontSize: "0.7em", width: "90%", marginLeft:"0.9em"}}>
            {addr.zipcode + " " + addr.city}
          </div>
        </div>
      </div>
      {
        addr.zipcode !== "" ? (
          <div className="modal-group-signup">
            <div className="importEffect">*</div>
            <div>
              <input
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