import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import "./css/styles.css";
import { useRef } from "react";
import ProgressBar from "./ProgressBar";

const MusicPlayer = ({
  music_name,
  setMusicName,
  list,
  isPlaying,
  setIsPlaying,
}) => {
  const audioref = useRef();
  const playbtn = () => {
    if (isPlaying) {
      setIsPlaying(false);
      audioref.current.pause();
    } else {
      setIsPlaying(true);
      audioref.current.play();
    }
  };

  const nextMusic = () => {
    setIsPlaying(true);
    let nextsong = list.indexOf(music_name) + 1;
    if (nextsong > list.length - 1) {
      nextsong = 0;
    }
    setMusicName(list[nextsong]);
    // console.log(list.indexOf(music_name));
  };

  const prevMusic = () => {
    setIsPlaying(true);
    let nextsong = list.indexOf(music_name) - 1;
    if (nextsong < 0) {
      nextsong = list.length - 1;
    }
    setMusicName(list[nextsong]);
    // console.log(list.indexOf(music_name));
  };
  return (
    <footer
      className="musicPlayer"
      style={{ width: "100%", backgroundColor: "teal" }}
    >
      <audio
        src={`http://localhost:8800/music/${music_name}`}
        autoPlay
        controls
        ref={audioref}
        style={{ display: "none" }}
      />
      <button className="btnStyle" onClick={prevMusic}>
        <BiSkipPrevious />
      </button>
      {isPlaying ? (
        <button className="btnStyle" onClick={playbtn}>
          {/* <button className="btnStyle" onClick={() => setIsPlaying(true)}> */}
          <AiFillPauseCircle />
        </button>
      ) : (
        <button className="btnStyle" onClick={playbtn}>
          {/* <button className="btnStyle" onClick={() => setIsPlaying(false)}> */}
          <AiFillPlayCircle />
        </button>
      )}

      <button className="btnStyle" onClick={nextMusic}>
        <BiSkipNext />
      </button>
      <ProgressBar />
    </footer>
  );
};

export default MusicPlayer;
