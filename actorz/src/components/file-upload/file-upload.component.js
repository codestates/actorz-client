import React, { useRef, useState, useEffect } from "react";

import {
  FileUploadContainer,
  FormField,
  DragDropText,
  UploadFileBtn,
  FilePreviewContainer,
  ImagePreview,
  VideoPreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon,
  InputLabel,
} from "./file-upload.styles";
import "../../styles/Fileupload.css";
import Loading from "../loading";
import { Modal } from "antd";
import { useMediaQuery } from "react-responsive";

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 50000000;

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
  label,
  updateFilesCb,
  updateContentCb,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}) => {
  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});
  const [genre, setGenre] = useState("기타");
  const [desc, setDesc] = useState("");
  const [modalClassName, setModalClassName] = useState("upload-modal-container");

  const isPcOrTablet = useMediaQuery({
    query: "(min-width:768px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      if (file.size <= maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { file };
        }
        files[file.name] = file;
      } else {
        Modal.error({
          getContainer: "upload-modal-container",
          title: "업로드 실패",
          content: `파일 하나당 ${
            maxFileSizeInBytes / 1000 / 1000
          }MB을 초과 할 수 없습니다`,
        });
      }
    }
    return { ...files };
  };
  const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray, genre, desc);
  };

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const removeFile = (fileName) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  const handleInputValue = (key) => (event) => {
    if (key === "desc") {
      setDesc(event.target.value);
    } else if (key === "genre") {
      setGenre(event.target.value);
    }
  };

  const handleOverFiles = () => {
    Modal.error({
      getContainer: "#upload-modal-container",
      title: "업로드 실패",
      content: "파일이 4개를 초과 할 수 없습니다.",
    });
    setFiles({});
  };

  useEffect(() => {
    updateContentCb(desc, "content");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [desc]);

  useEffect(() => {
    updateContentCb(genre, "genre");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre]);

  return (
    <>
    {
      isPcOrTablet && (
        <div
          id="upload-modal-background"
          onClick={() => otherProps.handleClickUpload(false)}
        >
          <div
            id="upload-modal-container"
            onClick={(event) => event.stopPropagation()}
          >
            <FileUploadContainer>
              <InputLabel>
                사진 또는 동영상을 선택해주세요
              </InputLabel>
              <DragDropText>최대 4개까지 업로드 가능합니다 <br/> <br/> Drag and Drop </DragDropText>
              <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
                <i className="fas fa-file-upload" />
                <span> 업로드하기! 클릭!</span>
              </UploadFileBtn>
              <FormField
                type="file"
                ref={fileInputField}
                onChange={handleNewFileUpload}
                title=""
                value=""
                {...otherProps}
              />
              <FilePreviewContainer>
                {/* <span>To Upload</span> */}
                <PreviewList>
                  {Object.keys(files).length > 4
                    ? handleOverFiles()
                    : Object.keys(files).map((fileName, index) => {
                        let file = files[fileName];
                        let isMediaFile =
                          file.type.split("/")[0] === "image" || "video";
                        let isImageFile = file.type.split("/")[0] === "image";
                        return (
                          <PreviewContainer key={fileName}>
                            <div>
                              {isMediaFile &&
                                (isImageFile ? (
                                  <ImagePreview
                                    src={URL.createObjectURL(file)}
                                    alt={`file preview ${index}`}
                                  />
                                ) : (
                                  <VideoPreview
                                    src={URL.createObjectURL(file)}
                                    alt={`file preview ${index}`}
                                  />
                                ))}
                              <FileMetaData isMediaFile={isMediaFile}>
                                <span>{file.name}</span>
                                <aside>
                                  <span style={{paddingTop: "0.8rem"}}>{convertBytesToKB(file.size)} kb</span>
                                  <RemoveFileIcon
                                    className="fas fa-trash-alt"
                                    onClick={() => removeFile(fileName)}
                                  />
                                </aside>
                              </FileMetaData>
                            </div>
                          </PreviewContainer>
                        );
                      })}
                </PreviewList>
              </FilePreviewContainer>
            </FileUploadContainer>
            <div className="desc-box">
              <input
                type="text"
                placeholder="간단한 설명글을 적어주세요"
                className="post-add-desc"
                onChange={handleInputValue("desc")}
              />

              <div className="genre" style={{maxWidth:"100%", paddingRight:"1rem"}}>
                <label>
                  <input
                    type="radio"
                    name="genre"
                    value="액션"
                    onChange={handleInputValue("genre")}
                  />
                  액션
                </label>
                <label>
                  <input
                    type="radio"
                    name="genre"
                    value="공포"
                    onChange={handleInputValue("genre")}
                  />
                  공포
                </label>
                <label>
                  <input
                    type="radio"
                    name="genre"
                    value="코미디"
                    onChange={handleInputValue("genre")}
                  />
                  코미디
                </label>
                <label>
                  <input
                    type="radio"
                    name="genre"
                    value="드라마"
                    onChange={handleInputValue("genre")}
                  />
                  드라마
                </label>
                <br/>
                <br/>
                <label>
                  <input
                    type="radio"
                    name="genre"
                    value="판타지"
                    onChange={handleInputValue("genre")}
                  />
                  판타지
                </label>
                <label>
                  <input
                    defaultChecked
                    type="radio"
                    name="genre"
                    value="기타"
                    onChange={handleInputValue("genre")}
                  />
                  기타
                </label>
              </div>
            </div>

            <div className="upload-btn-position">
              <button
                className="cancel-btn"
                onClick={() => otherProps.handleClickUpload(false)}
              >
                cancel
              </button>
              <button type="submit" className="upload-btn">
                upload
              </button>
            </div>
            {otherProps.isLoading ? <Loading /> : null}
          </div>
        </div>
      )
    } 
    {
      isMobile && (
        <div
          id="upload-modal-background"
          onClick={() => otherProps.handleClickUpload(false)}
        >
          <div
            id="upload-modal-container" 
            style={{
              height: "100%",
              minWidth: "100%",
              maxWidth: "100%",
              padding: "4rem 0 4rem 0"
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <FileUploadContainer style={{
              margin: "2rem 0 1rem 0", 
              height: "fit-content", 
              padding: "2rem",
              // overflowY: "auto"
            }}>
              <InputLabel style={{fontSize: "1.3rem", top: "-2rem"}}>
                사진 또는 동영상을 선택해주세요
              </InputLabel>
              <DragDropText style={{fontSize:"0.9rem"}}>사진/동영상은 최대 네 개 까지 <br/> 업로드 가능합니다</DragDropText>
              <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
                <i className="fas fa-file-upload" />
                {/* <span> Upload {otherProps.multiple ? "files" : "a file"}</span> */}
                <span> 업로드 하기! 클릭! </span>
              </UploadFileBtn>
              <FormField
                type="file"
                ref={fileInputField}
                onChange={handleNewFileUpload}
                title=""
                value=""
                {...otherProps}
              />
              <FilePreviewContainer>
                {/* <span>To Upload</span> */}
                <div style={{width: "100%", alignContent: "center"}}>
                {/* <PreviewList style={{display: "flex", flexDirection: "row", maxWidth: "20rem"}}> */}
                <PreviewList style={{display: "flex", flexFlow: "row wrap"}}>
                  {Object.keys(files).length > 4
                    ? handleOverFiles()
                    : Object.keys(files).map((fileName, index) => {
                        let file = files[fileName];
                        let isMediaFile =
                          file.type.split("/")[0] === "image" || "video";
                        let isImageFile = file.type.split("/")[0] === "image";
                        return (
                          <PreviewContainer 
                            key={fileName} 
                            style={{
                              order: index+1,
                              minWidth: "7.1rem",
                              minHeight: "7.1rem",
                              width: "50%",
                              padding: "0.1rem 0.3rem 0.1rem 0.3rem"
                              }}>
                            <div style={{alignContent: "center"}}>
                              {isMediaFile &&
                                (isImageFile ? (
                                  <ImagePreview
                                    src={URL.createObjectURL(file)}
                                    alt={`file preview ${index}`}
                                  />
                                ) : (
                                  <VideoPreview
                                    src={URL.createObjectURL(file)}
                                    alt={`file preview ${index}`}
                                  />
                                ))}
                              <FileMetaData isMediaFile={isMediaFile}>
                                <span>{file.name}</span>
                                <aside>
                                  <span>{convertBytesToKB(file.size)} kb</span>
                                  <RemoveFileIcon
                                    className="fas fa-trash-alt"
                                    onClick={() => removeFile(fileName)}
                                  />
                                </aside>
                              </FileMetaData>
                            </div>
                          </PreviewContainer>
                        );
                      })}
                </PreviewList>
                </div>
              </FilePreviewContainer>
            </FileUploadContainer>
            <div className="desc-box">
              <input
                type="text"
                placeholder="간단한 설명글을 적어주세요"
                className="post-add-desc"
                onChange={handleInputValue("desc")}
              />

              <div className="genre" style={{maxWidth:"100%", paddingRight:"1rem"}}>
                <label>
                  <input
                    type="radio"
                    name="genre"
                    value="액션"
                    onChange={handleInputValue("genre")}
                  />
                  액션
                </label>
                <label>
                  <input
                    type="radio"
                    name="genre"
                    value="공포"
                    onChange={handleInputValue("genre")}
                  />
                  공포
                </label>
                <label>
                  <input
                    type="radio"
                    name="genre"
                    value="코미디"
                    onChange={handleInputValue("genre")}
                  />
                  코미디
                </label>
                <label>
                  <input
                    type="radio"
                    name="genre"
                    value="드라마"
                    onChange={handleInputValue("genre")}
                  />
                  드라마
                </label>
                <br/>
                <br/>
                <label>
                  <input
                    type="radio"
                    name="genre"
                    value="판타지"
                    onChange={handleInputValue("genre")}
                  />
                  판타지
                </label>
                <label>
                  <input
                    defaultChecked
                    type="radio"
                    name="genre"
                    value="기타"
                    onChange={handleInputValue("genre")}
                  />
                  기타
                </label>
              </div>
            </div>
            <div 
              className="upload-btn-position">
              <button
                className="cancel-btn"
                onClick={() => otherProps.handleClickUpload(false)}
              >
                cancel
              </button>
              <button type="submit" className="upload-btn">
                upload
              </button>
            </div>
            {otherProps.isLoading ? <Loading /> : null}
          </div>
        </div>
      )
    } 
    </>
  );
};

export default FileUpload;
