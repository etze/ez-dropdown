import React from "react";
import AutoComplete from "./AutoComplete";
import ResultComponent from "./ResultComponent";
import "../App.css";
import Axios from "axios";

export default function MainComponent(props) {
  const [state, setState] = React.useState({
    options: [],
    showResult: false,
    loading: true
  });

  // generic state handler
  const handleState = (stateName, stateValue) => {
    setState(prevState => ({ ...prevState, [stateName]: stateValue }));
  };

  // managing data source and data source change
  React.useEffect(() => {
    // console.log("effected");
    if (props.dataSource.link) {
      Axios.get(props.dataSource.link)
        .then(function(response) {
          let options = [];
          response.data.map(item =>
            options.push(item[props.dataSource.parameter])
          );
          handleState("options", options);
          handleState("loading", false);
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      handleState("options", props.dataSource);
      handleState("loading", false);
    }
  }, [props.dataSource]);
  React.useEffect(() => {
    // console.log("show result touched");
    if (state.showResult) {
      document.querySelector(".App").addEventListener(
        "click",
        e => {
          if (e.toElement.className !== "resultItem") {
            handleState("showResult", false);
          }
        },
        { once: true }
      );
    }
  }, [state.showResult]);
  // handling input change
  const handleInputChange = e => {
    if (!state.showResult) {
      handleState("showResult", true);
    }
    handleState("input", e.target.value);
    handleState(
      "results",
      state &&
        state.options.length > 0 &&
        state.options.filter(item =>
          item.toLowerCase().includes(e.target.value.toLowerCase())
        )
    );
  };
  const handleValue = item => {
    props.selectedValue(item);
    handleState("showResult", false);
  };
  return (
    <div className="root">
      <div>{props.showResult}</div>
      <div>
        <AutoComplete
          data={state}
          handleInputChange={handleInputChange}
          placeholderLabel={props.dataSourceName}
        />
        {state.loading ? (
          <div className="loading">Fetching Source Data...</div>
        ) : state.showResult ? (
          <ResultComponent
            results={state.results}
            selectedValue={handleValue}
          />
        ) : null}
      </div>
    </div>
  );
}
