import React from "react";
import server from "../apis/server";
import googlePng from "../images/google.png";

const Google = () => {
  const googleLogin = async () => {
    const url = await server.get("/googleurl").then(res => {
      if(res.status === 200){
        return res.data.data;
      }
      return;
    });
    if(url){
      window.location.href = url;
    }else{
      alert("구글 이메일 로그인 중 오류가 발생했습니다");
    }
  }

  return (
    <div className="loginBtnPosition">
      <button
        className="btn-login login"
        onClick={googleLogin}
      >
        <img
          src={googlePng}
          alert="google-logo"
          className="oauth-logo"
          alt="google-login-logo"
        ></img>
        <div className="settingBtn"> 구글 로그인 </div>
      </button>
    </div>
  );
}

export default Google;
// const dispatch = useDispatch();

// const responseGoogle = async (googleData) => {
//   await server.post("/login/google", {
//     token: googleData.tokenId
//   }).then(res => {
//     if (res.status === 200 || res.status === 201) {
//       localStorage.setItem("accessToken", res.data.data.accessToken);
//       localStorage.setItem("id", res.data.data.id);
//       handleClickClose();
//     } else {
//       alert("구글 로그인 중 오류가 발생했습니다.");
//       return;
//     }
//   });
//   await server //로그인한 유저의 정보를 state에 저장
//   .get(`/user/${localStorage.getItem("id")}`)
//   .then((res) => {
//     if (res.status === 200) {
//       dispatch(getUserInfo(res.data.data.userInfo));
//     }
//   })
//   .catch((err) => {
//     throw err;
//   });
//   // console.log(res);
//   console.log("---------------------")
//   console.log("email: "+ googleData.profileObj.email);
//   // console.log("accessToken: " + googleData.accessToken);
//   console.log("---------------------")
//   window.location.href = redirectUri;
// }

// return (
//   <Googlelogin 
//     clientId={process.env.REACT_APP_Google}
//     buttonText="구글로 로그인하기"
//     render={renderProps => (
//      <button 
//       onClick={renderProps.onClick} disabled={renderProps.disabled}
//       className="btn-login login"
//      >
//       <img
//         src={google}
//         alert="google-logo"
//         className="kakao-logo"
//         alt="google-login-logo"
//       ></img>
//      구글로 로그인하기</button>
//     )}
//     onSuccess={responseGoogle}
//     onFailure={responseGoogle}
//     cookiePolicy={"single_host_origin"}
//   />
// );