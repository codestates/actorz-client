import server from "../apis/server";

/* const userinfo = () => {
  try {
    server
      .get(`/user/:user_id`, {
        headers: {
          Authorization: ~~~~~,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          return res;
        } else if (res.status === 401) {
          alert("유효하지 않은 아이디입니다. \n 다시 로그인 해주세요");
        }
      });
  } catch (err) {
    alert(
      "회원 정보를 가져오는 중에 예상치 못한 오류가 발생했습니다 \n 잠시 후 다시 이용해주세요"
    );
    return err;
  }
}; */

//export const userInfoInitState = userinfo();

export const userInfoInitState = {
  data: {
    userInfo: {
      id: "user_id",
      mainPic: "이미지",
      email: "goyounjung@gmail.com",
      name: "goyounjung",
      company: "스토리제이 컴퍼니",
      provider: "local",
      gender: true,
      dob: "1994-05-05",
      careers: [
        {
          _id: 1,
          title: "도깨비",
          year: "2016",
          type: ["액션", "판타지"],
        },
        {
          _id: 2,
          title: "스위트홈",
          year: "2015",
          type: ["스릴러", "호러"],
        },
        {
          _id: 3,
          title: "겨울왕국",
          year: "2100",
          type: ["드라마", "판타지"],
        },
        {
          _id: 4,
          title: "치즈인더트랩",
          year: "2019",
          type: ["액션", "판타지"],
        },
      ],
      recruiter: {
        bAddress: {
          city: "서울",
          street: "강남",
          zipCode: "11111",
        },
        bEmail: "codestates@gmail.com",
        bName: "코드스테이츠-본점",
        jobTitle: "학원",
        phoneNum: "02-0000-0000",
      },
      role: "guest",
    },
  },
};
