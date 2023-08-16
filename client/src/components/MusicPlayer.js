import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import "./css/styles.css";
import { useRef, useState, useCallback } from "react";
import ProgressBar from "./ProgressBar";

const MusicPlayer = ({
  music_name,
  setMusicName,
  list,
  isPlaying,
  setIsPlaying,
}) => {
  //
  const audioref = useRef();
  const progressBarRef = useRef();
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    // console.log("run");
    const currentTime = audioref.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioref, duration, progressBarRef, setTimeProgress]);
  //
  const playbtn = () => {
    if (isPlaying) {
      setIsPlaying(false);
      audioref.current.pause();
      cancelAnimationFrame(playAnimationRef.current);
    } else {
      setIsPlaying(true);
      audioref.current.play();
      playAnimationRef.current = requestAnimationFrame(repeat);
    }
  };
  //
  const nextMusic = () => {
    setIsPlaying(true);
    let nextsong = list.indexOf(music_name) + 1;
    if (nextsong > list.length - 1) {
      nextsong = 0;
    }
    setMusicName(list[nextsong]);
    // console.log(list.indexOf(music_name));
  };
  //
  const prevMusic = () => {
    setIsPlaying(true);
    let nextsong = list.indexOf(music_name) - 1;
    if (nextsong < 0) {
      nextsong = list.length - 1;
    }
    setMusicName(list[nextsong]);
    // console.log(list.indexOf(music_name));
  };

  const onLoadedMetadata = () => {
    const seconds = audioref.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
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
        onLoadedMetadata={onLoadedMetadata}
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
      <ProgressBar
        progressBarRef={progressBarRef}
        audioref={audioref}
        timeProgress={timeProgress}
        duration={duration}
      />
    </footer>
  );
};

export default MusicPlayer;
