import React from "react";
import "./App.css";
import LineChart from "./components/LineChart";

function App() {
  const events = [
    {
      type: "start",
      timestamp: 1519862400000,
      select: ["min_response_time", "max_response_time"],
      group: ["os", "browser"]
    },
    {
      type: "span",
      timestamp: 1519862400000,
      begin: 1519862400000,
      end: 1519862460000
    },
    {
      type: "data",
      timestamp: 1519862400000,
      os: "Linux",
      browser: "Chrome",
      min_response_time: 0.1,
      max_response_time: 1.3
    },
    {
      type: "data",
      timestamp: 1519862400000,
      os: "Mac",
      browser: "Chrome",
      min_response_time: 0.4,
      max_response_time: 1.2
    },
    {
      type: "data",
      timestamp: 1519862400000,
      os: "Mac",
      browser: "Firefox",
      min_response_time: 0.3,
      max_response_time: 1.2
    },
    {
      type: "data",
      timestamp: 1519862400000,
      os: "Linux",
      browser: "Firefox",
      min_response_time: 0.1,
      max_response_time: 1.0
    },
    {
      type: "data",
      timestamp: 1519862460000,
      os: "Linux",
      browser: "Chrome",
      min_response_time: 0.2,
      max_response_time: 0.9
    },
    {
      type: "data",
      timestamp: 1519862460000,
      os: "Mac",
      browser: "Chrome",
      min_response_time: 0.1,
      max_response_time: 1.0
    },
    {
      type: "data",
      timestamp: 1519862460000,
      os: "Mac",
      browser: "Firefox",
      min_response_time: 0.2,
      max_response_time: 1.1
    },
    {
      type: "data",
      timestamp: 1519862460000,
      os: "Linux",
      browser: "Firefox",
      min_response_time: 0.3,
      max_response_time: 1.4
    },
    { type: "stop", timestamp: 1519862460000 }
  ];
  return (
    <div className="App">
      <LineChart serie={"series-1"} events={events} />
    </div>
  );
}

export default App;
