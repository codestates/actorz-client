import { _Button, Comment } from "semantic-ui-react";

const ProfilesEffectinTablet = () => {
  
  return (
    <>
      <div className="mobileCommentsCenterPosition">
        <div className="mobileCommentsBlockLeft"></div>
        <div className="mobileCommentsPosition">
          <Comment.Group data-trigger size="massive">
            <Comment>
              <Comment.Avatar
                as="a"
                src="https://media.vlpt.us/images/iooi75/post/91a32cce-61a4-4721-b99e-0354f325ccd2/thumb-2040665147_d6gESnAz_673a0411062e8b6370c76113f987e20ce44474fc_370x420.jpg"
              />
              <Comment.Content>
                <Comment.Author as="a">임정국</Comment.Author>
                <Comment.Metadata>
                  <span>5 days ago</span>
                </Comment.Metadata>
                <Comment.Text>
                  역할에 따라 다른 포토폴리오를 제출하고 싶습니다.
                </Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>

          <Comment.Group data-trigger size="small">
            <Comment>
              <Comment.Avatar
                as="a"
                src="https://media.vlpt.us/images/iooi75/post/8358273b-0356-4609-bcaa-c5994e6f8143/thumb-3555495007_UkK1tqyz_9b9162add0597b54c1666643e93f359a985649b9_370x420.jpg"
              />
              <Comment.Content>
                <Comment.Author as="a">한혜민</Comment.Author>
                <Comment.Metadata>
                  <span>8 days ago</span>
                </Comment.Metadata>
                <Comment.Text>
                  여태까지 뽑는 사람/회사 중심으로 만들어진 어플이
                  대부분이었는데, 배우 중심이면 좋겠습니다. 단순히 예쁘고
                  잘난 사람들, 또는 멋진 사진을 찍은 사람이 상위권에 오르는
                  것이 아니라 진짜 배우를 발굴해낼 수 있는 기능을 할 수
                  있으면 좋겠습니다. 좋은 어플을 만들어주셔서 감사합니다.
                </Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>

          <Comment.Group data-trigger size="massive">
            <Comment>
              <Comment.Avatar
                as="a"
                src="https://media.vlpt.us/images/iooi75/post/5fb05e93-a32a-4283-a28f-1a3f05b150db/image.png"
              />
              <Comment.Content>
                <Comment.Author as="a">이하나</Comment.Author>
                <Comment.Metadata>
                  <span>6 days ago</span>
                </Comment.Metadata>
                <Comment.Text>남들과 다르게 어필하고 싶어요</Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>

          <Comment.Group data-trigger size="massive">
            <Comment>
              <Comment.Avatar
                as="a"
                src="https://media.vlpt.us/images/iooi75/post/69939f54-8a86-4301-a6be-19ae12f09d7e/image.png"
              />
              <Comment.Content>
                <Comment.Author as="a">이빛나</Comment.Author>
                <Comment.Metadata>
                  <span>6 days ago</span>
                </Comment.Metadata>
                <Comment.Text>
                  현재는 개인유튜브를 개설하여 그곳에 출연영상들을 올리고
                  있는데, 간혹 저작권 등의 문제로 본인의 출연영상을 유튜브에
                  못 올릴 때도 있었기 때문에. [저작권 문제]
                </Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>

          <Comment.Group data-trigger size="massive">
            <Comment>
              <Comment.Avatar
                as="a"
                src="https://media.vlpt.us/images/iooi75/post/f424b957-0755-4407-b24f-01cd5da2c5a3/thumb-2009107696_1eypsHg8_75b78deb1f72d28d204e9c7f8684aa27b44c0cab_370x420.jpg"
              />
              <Comment.Content>
                <Comment.Author as="a">이준석</Comment.Author>
                <Comment.Metadata>
                  <span>4 days ago</span>
                </Comment.Metadata>
                <Comment.Text>
                  더 경쟁력있게 포트폴리오를 만드는 방법을 알고 싶습니다.
                </Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>

          <Comment.Group data-trigger size="large">
            <Comment>
              <Comment.Avatar
                as="a"
                src="https://media.vlpt.us/images/iooi75/post/902642ff-9b2d-404a-9116-82a42e44642b/image.png"
              />
              <Comment.Content>
                <Comment.Author as="a">이강인</Comment.Author>
                <Comment.Metadata>
                  <span>6 days ago</span>
                </Comment.Metadata>
                <Comment.Text>
                  {" "}
                  어플을 통해 여러 에이전시들에 프로필을 간편하게 보낼 수
                  있다면 좋을 것 같습니다
                </Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>

          <Comment.Group
            data-trigger
            className="commentsBlurEffect"
            size="large"
          >
            <Comment>
              <Comment.Avatar
                className="commentsBlurEffect"
                as="a"
                src="https://media.vlpt.us/images/iooi75/post/a0e76905-5ec8-4bcc-8d64-2db0a6e6e168/image.png"
              />
              <Comment.Content className="commentsBlurEffect">
                <Comment.Author as="a">이윤아</Comment.Author>
                <Comment.Metadata>
                  <span>7 days ago</span>
                </Comment.Metadata>
                <Comment.Text>
                  카카오나 인스타와 연동이 되었으면 좋겠습니다.
                </Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>

          <Comment.Group
            className="commentsBlurEffect2"
            data-trigger
            size="large"
          >
            <Comment>
              <Comment.Avatar
                className="commentsBlurEffect2"
                as="a"
                src="https://media.vlpt.us/images/iooi75/post/3c22e9a1-6c10-44fa-b8e2-ecdec3ed2ccd/thumb-2009107696_xPJE0lpT_da11888d84e969f6f85acbdb214582d75c19fd86_370x420.jpg"
              />
              <Comment.Content className="commentsBlurEffect2">
                <Comment.Author as="a">김은미</Comment.Author>
                <Comment.Metadata>
                  <span>2 days ago</span>
                </Comment.Metadata>
                <Comment.Text>
                  어떻게 해야 강력한 이미지로 부각될까와 이 프로필이 제대로
                  전해질까의 고민^^;
                </Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>

          <Comment.Group
            className="commentsBlurEffect3"
            data-trigger
            size="large"
          >
            <Comment>
              <Comment.Avatar
                className="commentsBlurEffect3"
                as="a"
                src="https://media.vlpt.us/images/iooi75/post/a061751c-9e73-4344-9ff4-8edd9fc70dfa/image.png"
              />
              <Comment.Content className="commentsBlurEffect3">
                <Comment.Author as="a">이하늘</Comment.Author>
                <Comment.Metadata>
                  <span>2 days ago</span>
                </Comment.Metadata>
                <Comment.Text>
                  이미 존재하는 에이전시, 캐스팅디비 어라운드어스 등의
                  어플과 차이점이 있을까요
                </Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>

          <Comment.Group
            className="commentsBlurEffect4"
            data-trigger
            size="massive"
          >
            <Comment>
              <Comment.Avatar
                className="commentsBlurEffect4"
                as="a"
                src="https://media.vlpt.us/images/iooi75/post/9763ba86-5501-426f-ada9-a43206c5e68d/image.png"
              />
              <Comment.Content className="commentsBlurEffect4">
                <Comment.Author as="a">윤나라</Comment.Author>
                <Comment.Metadata>
                  <span>9 days ago</span>
                </Comment.Metadata>
                <Comment.Text>
                  타 사이트와의 명백한 차이점? 배우들은 개개인의 작품활동을
                  하기위해 사이트에 등록을 합니다.. 본인에게 작품이 캐스팅이
                  되고, 활동을 할 수 있어야하는데 어떠한 작품에 어떤 경로로
                  어떤 제작진이 살펴보는지에 대한 정보공유(?)가 있으면
                  좋을것 같아요
                </Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>

          <Comment.Group
            className="commentsBlurEffect5"
            data-trigger
            size="large"
          >
            <Comment>
              <Comment.Avatar
                className="commentsBlurEffect5"
                as="a"
                src="https://media.vlpt.us/images/iooi75/post/d820e8e1-9b0e-467e-9ae3-cbf9f41facc2/image.png"
              />
              <Comment.Content className="commentsBlurEffect5">
                <Comment.Author as="a">이수진</Comment.Author>
                <Comment.Metadata>
                  <span>2 days ago</span>
                </Comment.Metadata>
                <Comment.Text>
                  만드는 플랫폼이나 형식이 뚜렷하지 않아 어려운 것같습니다.{" "}
                </Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>

          <Comment.Group
            data-trigger
            className="commentsBlurEffect6"
            size="large"
          >
            <Comment>
              <Comment.Avatar
                className="commentsBlurEffect6"
                as="a"
                src="https://media.vlpt.us/images/iooi75/post/68b1c9d4-5bca-4b69-bf4f-b0f7f9063b69/image.png"
              />
              <Comment.Content className="commentsBlurEffect6">
                <Comment.Author as="a">이규진</Comment.Author>
                <Comment.Metadata>
                  <span>2 days ago</span>
                </Comment.Metadata>
                <Comment.Text>
                  양식이 정해져 있으면 좋겠습니다.{" "}
                </Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>

          <Comment.Group
            data-trigger
            className="commentsBlurEffect7"
            size="large"
          >
            <Comment>
              <Comment.Avatar
                className="commentsBlurEffect7"
                as="a"
                src="https://media.vlpt.us/images/iooi75/post/8b5bce11-546a-40fe-bfc0-cf0ff345029d/image.png"
              />
              <Comment.Content className="commentsBlurEffect7">
                <Comment.Author as="a">이윤아</Comment.Author>
                <Comment.Metadata>
                  <span>7 days ago</span>
                </Comment.Metadata>
                <Comment.Text>
                  카카오나 인스타와 연동이 되었으면 좋겠습니다.
                </Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>

          <Comment.Group
            data-trigger
            className="commentsBlurEffect8"
            size="massive"
          >
            <Comment>
              <Comment.Avatar
                className="commentsBlurEffect8"
                as="a"
                src="https://media.vlpt.us/images/iooi75/post/9dd6bae5-a8f7-491a-9dca-6abdb5d6658d/image.png"
              />
              <Comment.Content className="commentsBlurEffect8">
                <Comment.Author as="a">김나은</Comment.Author>
                <Comment.Metadata>
                  <span>11 days ago</span>
                </Comment.Metadata>
                <Comment.Text>
                  매니저를 통하는 방법보다 편한 방법을 알고싶네요...{" "}
                </Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>

          <Comment.Group
            data-trigger
            className="commentsBlurEffect9"
            size="massive"
          >
            <Comment>
              <Comment.Avatar
                className="commentsBlurEffect9"
                as="a"
                src="https://media.vlpt.us/images/iooi75/post/c59e08f7-2ec0-496a-b276-1252bf46e6e6/image.png"
              />
              <Comment.Content className="commentsBlurEffect9">
                <Comment.Author as="a">최수빈</Comment.Author>
                <Comment.Metadata>
                  <span>11 days ago</span>
                </Comment.Metadata>
                <Comment.Text>
                  사진만으로 배우의 매력을 다 알 수 없다고 생각하기 때문에
                  다른 무언가가 필요해요{" "}
                </Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>

          <Comment.Group
            data-trigger
            className="commentsBlurEffect10"
            size="massive"
          >
            <Comment>
              <Comment.Avatar
                className="commentsBlurEffect10"
                as="a"
                src="https://media.vlpt.us/images/iooi75/post/5533a9b7-f895-402b-8ca8-fb9b69f5a3b9/image.png"
              />
              <Comment.Content className="commentsBlurEffect10">
                <Comment.Author as="a">우지원</Comment.Author>
                <Comment.Metadata>
                  <span>10 days ago</span>
                </Comment.Metadata>
                <Comment.Text>
                  올리고 싶지 않은 경력은 제외하면 좋겠습니다.{" "}
                </Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>

          <Comment.Group
            data-trigger
            className="commentsBlurEffect11"
            size="massive"
          >
            <Comment>
              <Comment.Avatar
                className="commentsBlurEffect11"
                as="a"
                src="https://media.vlpt.us/images/iooi75/post/ecaed6e9-6e2a-4027-87dd-ab705e9ffec0/image.png"
              />
              <Comment.Content className="commentsBlurEffect11">
                <Comment.Author as="a">이람</Comment.Author>
                <Comment.Metadata>
                  <span>8 days ago</span>
                </Comment.Metadata>
                <Comment.Text>
                  배우들끼리 사진수업을 듣고 서로 찍어줄 수 있는 플랫폼,
                  협력자가 되면 좋겠단 생각이 듭니다.
                </Comment.Text>
                <Comment.Actions>
                  <a>Reply</a>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        </div>
        <div className="mobileCommentsBlockRight"></div>
      </div>
    </>
  ); 
}

export default ProfilesEffectinTablet;
