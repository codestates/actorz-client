import React, { useEffect } from "react";
import '../App.css'
import 'antd/dist/antd.css';


import server from "../apis/server";

const LoginCallback = () => {
  const login = async () => {
    try{
      const location = window.location.href.split("=")[1];
      const code = location.split("&")[0];
      const statusCode = await server.post("/login/naver", { code }).then(res => res.status);
      console.log(statusCode)
      if(statusCode === 201){
        
      }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {login()}, [])
  
  return (
    <div>helloWorld</div>
  )
}
export default LoginCallback;