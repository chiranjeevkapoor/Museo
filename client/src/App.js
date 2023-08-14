import "./App.css";
import { useState, useEffect } from "react";
import List from "./components/List";
import MusicPlayer from "./components/MusicPlayer";
// import ReactAudioPlayer from "react-audio-player";
function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [list, setList] = useState([]);
  const [music_name, setMusicName] = useState("");
  useEffect(() => {
    fetch("http://localhost:8800/list")
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        setList(data);
      })
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <div className="App">
      <header>Your Music</header>
      <List
        list={list}
        setMusicName={setMusicName}
        setIsPlaying={setIsPlaying}
      />
      <MusicPlayer
        music_name={music_name}
        setMusicName={setMusicName}
        list={list}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
}

export default App;
