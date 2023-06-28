import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import RGBAlchemy from "./components/RGBAlchemy";

function App() {
  const [data, setData] = useState();
  async function logJSONData() {
    const response = await fetch("http://localhost:9876/init");
    const jsonData = await response.json();
    console.log(jsonData);
    setData(jsonData);
  }
  useEffect(() => {
    logJSONData();
  }, []);
  return <div className="App">{data ? <RGBAlchemy data={data} /> : null}</div>;
}

export default App;
