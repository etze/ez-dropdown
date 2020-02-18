import React from "react";

export default function ResultComponent(props) {
  React.useEffect(() => {
    console.log("porps changed");
  }, []);
  return (
    <div className="results">
      {props.results && props.results.length > 0 ? (
        props.results.map((item, index) => (
          <div
            className="resultItem"
            // proof on clicking concept // any other function can implement here:
            onClick={() => alert(`${item} Clicked!`)}
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
