import React from "react";

const AutoCompete = props => {
  return (
    <div className="inputWrapper">
      <input
        placeholder="Please Enter a Name..."
        onChange={props.handleInputChange}
      ></input>
    </div>
  );
};
export default AutoCompete;
