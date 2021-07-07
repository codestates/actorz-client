import React, { useEffect } from "react";
import { getUserInfo } from "../actions/userAction";
import { useDispatch } from "react-redux";
import '../App.css'
import 'antd/dist/antd.css';


import server from "../apis/server";

const LoginCallback = () => {
  const dispatch = useDispatch();

  const login = async () => {
    try{
      const location = window.location.href.split("=")[1];
      const code = location.split("&")[0];
      await server.post("/login/naver", { code }).then(res => {
        if (res.status === 200 || res.status === 201) {
          localStorage.setItem("accessToken", res.data.data.accessToken);
        } else {
          alert("구글 로그인 중 오류가 발생했습니다.");
        }
      });

      await server //로그인한 유저의 정보를 state에 저장
          .get(`/user/:user_id`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              dispatch(getUserInfo(res.data.data.userInfo));
            }
          })
          .catch((err) => {
            throw err;
          });

      window.location.href = "https://localhost:3000/mainpage"
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {login()})
  
  return (
    <div></div>
  )
}
export default LoginCallback;