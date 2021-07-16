import React, { useState, useEffect } from "react";
import server from "../apis/server";
import { useDispatch } from "react-redux";
import { getAllPostInfo } from "../actions/postAction";
import { Input, Col, Row, Select } from "antd";

import "../styles/Search.css";

const { Option } = Select;

const Search = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [age, setAge] = useState("");

  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      if (Number(age) === 50) {
        await server
          .get(`post/search?name=${name}&content=${content}`)
          .then((res) => {
            dispatch(getAllPostInfo(res.data.data));
          });
      } else {
        await server
          .get(`post/search?name=${name}&content=${content}&age=${age}`)
          .then((res) => {
            dispatch(getAllPostInfo(res.data.data));
          });
      }
    } catch (err) {
      throw err;
    }
  }, [name, content, age]);

  const handleInputValue = (key) => (event) => {
    console.log(event);
    if (key === "name") {
      setName(event.target.value);
    } else if (key === "conent") {
      setContent(event.target.value);
    } else if (key === "age") {
      setAge(event);
    }
  };

  return (
    <div id="search-modal-container">
      <div className="search-box">
        <span className="search-desc">원하는 검색어를 입력해보세요</span>
        <hr></hr>
        <Input.Group>
          <Row gutter={8}>
            <Col span={8}>
              <Input onChange={handleInputValue("name")} placeholder="이름" />
            </Col>
            <Col span={8}>
              <Input onChange={handleInputValue("conent")} placeholder="내용" />
            </Col>
          </Row>
        </Input.Group>
        <Input.Group compact>
          <Select defaultValue="50" onChange={handleInputValue("age")}>
            <Option value="10" name="age">
              ~10대
            </Option>
            <Option value="20" name="age">
              20대
            </Option>
            <Option value="30" name="age">
              30대
            </Option>
            <Option value="40" name="age">
              40대~
            </Option>
            <Option value="50" name="age">
              전체
            </Option>
          </Select>
        </Input.Group>
      </div>
      {/* <div className="search-box"></div>
      <div className="search-box" onChange={handleInputValue("age")}>
        <label>
          <input type="radio" name="age" value="10" /> ~10대
        </label>
        <label>
          <input type="radio" name="age" value="20" /> 20대
        </label>
        <label>
          <input type="radio" name="age" value="30" /> 30대
        </label>
        <label>
          <input type="radio" name="age" value="40" /> 40대~
        </label>
        <label>
          <input type="radio" name="age" value="50" /> 전체
        </label>
      </div> */}
    </div>
  );
};

export default Search;
