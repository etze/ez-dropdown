import React from "react";
import AutoComplete from "./AutoComplete";
import ResultComponent from "./ResultComponent";
import "../App.css";

export default function MainComponent(props) {
  const [state, setState] = React.useState({
    options: [],
    showResult: false,
    loading: true
  });

  // generic state handler (my favorite)
  const handleState = (stateName, stateValue) => {
    setState(prevState => ({ ...prevState, [stateName]: stateValue }));
  };

  // managing data source and data source change
  React.useEffect(() => {
    if (props.dataSource.link) {
      fetch(props.dataSource.link)
        .then(response => response.json())
        .then(json => {
          let options = [];
          json.map(item => options.push(item[props.dataSource.parameter]));
          handleState("options", options);
          handleState("loading", false);
        });
    } else {
      handleState("options", props.dataSource);
      handleState("loading", false);
    }
    document.querySelector(".App").addEventListener("click", e => {
      if (e.toElement.className !== "resultItem") {
        handleState("showResult", false);
      }
    });
  }, [props.dataSource]);

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
            selectedValue={props.selectedValue}
          />
        ) : null}
      </div>
    </div>
  );
}
