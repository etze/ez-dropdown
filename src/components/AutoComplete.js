import React from "react";

const AutoCompete = props => {
  return (
    <div className="inputWrapper">
      <input
        className="input"
        placeholder={`Please Enter a Name ${props.placeholderLabel}`}
        onChange={props.handleInputChange}
      ></input>
    </div>
  );
};
export default AutoCompete;
