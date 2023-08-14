import "./css/styles.css";
const Card = ({ name, setMusicName, setIsPlaying }) => {
  const playSong = () => {
    // props.updateMusic(props.name);
    setMusicName(name);
    setIsPlaying(true);
  };
  return (
    <div className="card">
      <button
        onClick={playSong}
        style={{ border: "none", backgroundColor: "aliceblue" }}
      >
        {name}
      </button>
    </div>
  );
};

export default Card;
