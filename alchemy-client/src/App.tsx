import { useEffect, useState } from "react";
import RGBAlchemy from "./components/RGBAlchemy";
import Loading from "./components/Loading";

export interface GameData {
  userId: string;
  width: number;
  height: number;
  maxMoves: number;
  target: number[];
}

function App() {
  const [data, setData] = useState<GameData>();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isServerAvailable, setServerAvailabile] = useState<boolean>(true);
  const pollingInterval = 5000; // every 5 seconds

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
      setServerAvailabile(true);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      setServerAvailabile(false);
      serverRecoveryPolling();
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
      setServerAvailabile(true);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      setServerAvailabile(false);
      serverRecoveryPolling(userId);
    }
  }
  useEffect(() => {
    loadGameData();
  }, []);

  const playGameAgain = (userId: string) => {
    loadUserGameData(userId);
  };

  const serverRecoveryPolling = (userID?: string) => {
    setError(null);
    // Schedule a new loadData after the polling interval
    setTimeout(() => {
      if (userID) {
        loadUserGameData(userID);
      } else {
        loadGameData();
      }
    }, pollingInterval);
  };

  console.log("isServerAvailable:", isServerAvailable);
  console.log("isLoading:", isLoading);
  console.log("error:", error);
  console.log("data:", data);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        isServerAvailable &&
        data && <RGBAlchemy data={data} handlePlayAgain={playGameAgain} />
      )}
    </div>
  );
}

export default App;
