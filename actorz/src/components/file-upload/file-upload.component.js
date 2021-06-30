import React, { useRef, useState } from "react";
import {
  FileUploadContainer,
  FormField,
  DragDropText,
  UploadFileBtn,
  FilePreviewContainer,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon,
  InputLabel,
} from "./file-upload.styles";
import "../../styles/Postupload.css";

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
  label,
  updateFilesCb,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}) => {
  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});

  const [genre, setGenre] = useState([]);
  const [desc, setDesc] = useState("");

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
      }
    }
    return { ...files };
  };
  const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
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
      console.log(desc);
      console.log(genre);
    } else if (key === "genre") {
      if (event.target.checked) {
        setGenre([...genre, event.target.value]);
      } else {
        const filteredGenre = genre.filter((el) => {
          return el !== event.target.value;
        });
        setGenre(filteredGenre);
      }
    }
  };

  return (
    <>
      <div id="upload-modal-background">
        <div id="upload-modal-container">
          <FileUploadContainer>
            <InputLabel>
              포트폴리오에 올릴 사진 또는 동영상을 선택해주세요
            </InputLabel>
            <DragDropText>Drag and drop your files anywhere or</DragDropText>
            <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
              <i className="fas fa-file-upload" />
              <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
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
                {Object.keys(files).map((fileName, index) => {
                  let file = files[fileName];
                  let isImageFile = file.type.split("/")[0] === "image";
                  return (
                    <PreviewContainer key={fileName}>
                      <div>
                        {isImageFile && (
                          <ImagePreview
                            src={URL.createObjectURL(file)}
                            alt={`file preview ${index}`}
                          />
                        )}
                        <FileMetaData isImageFile={isImageFile}>
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
            </FilePreviewContainer>
          </FileUploadContainer>
          <div className="desc-box">
            <input
              type="text"
              placeholder="간단한 설명글을 적어주세요"
              className="desc"
              onChange={handleInputValue("desc")}
            />

            <div className="genre">
              <input
                type="checkbox"
                name="genre"
                value="액션"
                onChange={handleInputValue("genre")}
              />
              액션
              <input
                type="checkbox"
                name="genre"
                value="공포"
                onChange={handleInputValue("genre")}
              />
              공포
              <input
                type="checkbox"
                name="genre"
                value="코미디"
                onChange={handleInputValue("genre")}
              />
              코미디
              <input
                type="checkbox"
                name="genre"
                value="로맨스"
                onChange={handleInputValue("genre")}
              />
              로맨스
              <input
                type="checkbox"
                name="genre"
                value="판타지"
                onChange={handleInputValue("genre")}
              />
              판타지
              <input
                type="checkbox"
                name="genre"
                value="기타"
                onChange={handleInputValue("genre")}
              />
              기타
            </div>
          </div>

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
      </div>
    </>
  );
};

export default FileUpload;
