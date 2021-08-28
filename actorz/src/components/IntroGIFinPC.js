import iphoneG from "../images/iphoneGifcontent.gif";
import ipadG from "../images/ipadGifcontent.gif";
import { useMediaQuery } from "react-responsive";

const IntroGIFinPC = () => {
  const isPc = useMediaQuery({
    query: "(min-width:1600px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  return (
    <div data-trigger className="startContentsTitle">
      어떠한 기기에서도
      <div className="blockPositionDivide"></div>
      {isPc ? 
        <div className="deviceDevider">
          <div className="device1">
            <div data-trigger>
              <img
                alt=""
                className="iphonePic"
                src="https://media.vlpt.us/images/iooi75/post/f7b1069c-b36c-41a8-9bd7-725fbb01940d/iphone-1845808_1280.png"
              />

              <img alt="" className="iphoneGif" src={iphoneG} />
            </div>
          </div>
          <div className="device2">
            <div data-trigger>
              <img
                alt=""
                className="ipadPic"
                src="https://media.vlpt.us/images/iooi75/post/11d9594f-fd05-4245-a804-9c78addaab02/image.png"
              />
              <img alt="" className="ipadGif" src={ipadG} />
            </div>
          </div>
        </div> 
        
        : <> { !isMobile ? <>
          <div className="device1T">
            <div data-trigger>
              <img
                alt=""
                className="iphonePic"
                src="https://media.vlpt.us/images/iooi75/post/f7b1069c-b36c-41a8-9bd7-725fbb01940d/iphone-1845808_1280.png"
              />

              <img alt="" className="iphoneGif" src={iphoneG} />
            </div>
          </div>

          <div className="blockPositionDivide"></div>

          <div className="device2T">
            <div data-trigger>
              <img
                alt=""
                className="ipadPicT"
                src="https://media.vlpt.us/images/iooi75/post/11d9594f-fd05-4245-a804-9c78addaab02/image.png"
              />
              <img alt="" className="ipadGifT" src={ipadG} />
            </div>
          </div>
        </> 
        : <>

          <div className="device1M">
            <div data-trigger>
              <img alt="" className="iphoneGifM" src={iphoneG} />
            </div>
          </div>

          <div className="blockPositionDivide"></div>

          <div className="device2M">
            <div data-trigger>
              <img alt="" className="ipadGifM" src={ipadG} />
            </div>
          </div> </> }
       </> }
        
    </div>
  );
}

export default IntroGIFinPC;