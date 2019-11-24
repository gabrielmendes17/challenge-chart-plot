import React from "react";
import "./App.css";
import LineChart from "./components/LineChart";

function App() {
  const event = [
    {
      type: "start",
      timestamp: 1519862400000,
      select: ["min_response_time", "max_response_time"],
      group: ["os", "browser"]
    },
    {
      type: "span",
      timestamp: 1519862400000,
      begin: 1519780251293,
      end: 1519780260201
    },
    {
      type: "data",
      timestamp: 1519862400000,
      os: "linux",
      browser: "chrome",
      min_response_time: 0.1,
      max_response_time: 1.3
    }
  ];
  return (
    <div className="App">
      <LineChart serie={"series-1"} event={event} handleEvent={event} />
    </div>
  );
}

export default App;
