import { useSelector, useDispatch } from "react-redux";
import { getAllPostInfo } from "../actions/postAction";
import server from "../apis/server";
import video from "../images/video.mp4";

export const postInitState = {
  data: {
    posts: [
      {
        id: 1,
        path: [
          {
            _id: 1,
            type: "picture",
            path: "https://media.vlpt.us/images/iooi75/post/a0e76905-5ec8-4bcc-8d64-2db0a6e6e168/image.png",
          },
          {
            _id: 2,
            type: "video",
            path: video,
          },
        ],
        content:
          "저의 두번째 출연작인 드라마 '도깨비' 촬영 현장입니다. 이곳에서 저승사자 역할을 했습니다.",
        /* 'createdAt': date type,
  'updatedAt': date type, */
        genre: ["공포", "스릴러"],
        /* 'tags': [...], */
        likes: ["user_id"],
      },
    ],
  },
};

//const post = useSelector((post) => post.postInfoReducer);

const Postlist = async () => {};

Postlist();
