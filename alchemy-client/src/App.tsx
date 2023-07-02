import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import RGBAlchemy from "./components/RGBAlchemy";
import Loading from "./components/Loading";

function App() {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function loadGameData() {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:9876/init");
      if (!response.ok) {
        throw new Error("Failed to fetch game data");
      }
      const jsonData = await response.json();
      setData(jsonData);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  async function loadUserGameData(userId: string) {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:9876/init/user/" + userId);
      if (!response.ok) {
        throw new Error("Failed to fetch user game data");
      }
      const jsonData = await response.json();
      let newData = { ...jsonData };
      setData(newData);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }
  const playGameAgain = (userId: string) => {
    loadUserGameData(userId);
  };

  useEffect(() => {
    loadGameData();
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        data && <RGBAlchemy data={data} handlePlayAgain={playGameAgain} />
      )}
    </div>
  );
}

export default App;
