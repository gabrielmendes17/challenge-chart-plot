import React from "react";
import "./App.css";
import LineChart from "./components/LineChart";

function App() {
  const event = {
    type: "start",
    timestamp: 1519862400000,
    select: ["min_response_time", "max_response_time"],
    group: ["os", "browser"]
  };
  return (
    <div className="App">
      <LineChart serie={"series-1"} event={event} handleEvent={event} />
    </div>
  );
}

export default App;
