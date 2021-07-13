import React, { useRef, useState, useEffect } from "react";
import {
  FileUploadContainer,
  FormField,
  DragDropText,
  FilePreviewContainer,
  ImagePreview,
  VideoPreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon,
  InputLabel,
} from "./portfolio.styles";
import "../../styles/Postupload.css";
import Loading from "../loading";



const PortfolioEdit = ({
  handleClickPfEdit,
  isLoading
}) => {
  const [postsData, setpostsData] = useState([]);

  useEffect(() => {

  }, [])

  return (
    <>
      <div id="upload-modal-background"
        onClick={() => handleClickPfEdit(false)} >
        <div id="upload-modal-container"
        onClick={(event) => event.stopPropagation()}>
          <FileUploadContainer>
            <InputLabel>
              포트폴리오에 올릴 사진 또는 동영상을 선택해주세요
            </InputLabel>
          </FileUploadContainer>
          <div className="desc-box">
          </div>

          <button
            className="cancel-btn"
            onClick={() => handleClickPfEdit(false)}
          >
            cancel
          </button>
          <button type="submit" className="upload-btn">
            upload
          </button>
          {isLoading ? (<Loading />) : null}
        </div>
      </div>
    </>
  );
};

export default PortfolioEdit;
