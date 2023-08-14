import Card from "./Card";

const List = ({ list, setMusicName, setIsPlaying }) => {
  return (
    <ul>
      {list.map((el) => {
        return (
          <Card
            name={el}
            setMusicName={setMusicName}
            key={el}
            setIsPlaying={setIsPlaying}
          />
        );
      })}
    </ul>
  );
};
export default List;
