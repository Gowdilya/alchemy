import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import RGBAlchemy from "./components/RGBAlchemy";

function App() {
  const [data, setData] = useState();

  async function loadGame() {
    const response = await fetch("http://localhost:9876/init");
    const jsonData = await response.json();
    setData(jsonData);
  }

  async function loadGameUser(userId: string) {
    const response = await fetch("http://localhost:9876/init/user/" + userId);
    const jsonData = await response.json();
    let newData = { ...jsonData };
    setData(newData);
  }
  const playGameAgain = (userId: string) => {
    loadGameUser(userId);
  };

  useEffect(() => {
    loadGame();
  }, []);

  return (
    <div className="App">
      {data ? <RGBAlchemy data={data} handlePlayAgain={playGameAgain} /> : null}
    </div>
  );
}

export default App;
