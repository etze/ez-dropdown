import React from "react";
import "./App.css";

import MainComponent from "./components/MainComponent";
import { primaryData, secondaryData } from "./config/data";

function App() {
  const [state, setState] = React.useState(true);
  const [text, setText] = React.useState("");
  // a proof that array works as well

  // const handleChangingDataSourc = () => {
  //   console.log(state);
  //   setState();
  // };

  const handleValue = value => {
    // proof of the 'returning value' concept
    setText(value);
  };
  return (
    <div className="App">
      <MainComponent
        // dataSource can accept a normal array or an object with link and parameter properties:
        // {{
        //   link: "https://jsonplaceholder.typicode.com/users",
        //   parameter: "name"
        // }}
        // or
        // {secondaryData}
        dataSource={state ? primaryData : secondaryData}
        dataSourceName={state ? "From API" : "From Array"}
        selectedValue={handleValue}
      />
      <h2>{text}</h2>
      {/* The proof input data can change at ANY TIME */}

      <button onClick={() => setState(!state)}>Switch Data Source</button>

      {/* document
        .querySelector(".App")
        .removeEventListener("click", e => {}); */}
      {/* getEventListeners(yourElement); */}
    </div>
  );
}

export default App;
