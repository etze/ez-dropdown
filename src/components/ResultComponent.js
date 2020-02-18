import React from "react";

export default function ResultComponent(props) {
  return (
    <div className="results">
      {props.results && props.results.length > 0 ? (
        props.results.map((item, index) => (
          <div
            className="resultItem"
            // proof on clicking concept // any other function can implement here:
            onClick={() => props.selectedValue(item)}
            key={index}
          >
            {item}
          </div>
        ))
      ) : (
        <div className="resultItem">No data...</div>
      )}
    </div>
  );
}
