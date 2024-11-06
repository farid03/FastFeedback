import React from "react";

function StudentIndicator({ val, setVal }) {
  function increaseVal() {
    if (val < 2) {
      setVal(val + 1);
    }
  }

  function decreaseVal() {
    if (val > 0) {
      setVal(val - 1);
    }
  }

  function getColor() {
    if (val === 0) return "red";
    if (val === 1) return "yellow";
    if (val === 2) return "green";
  }

  return (
    <div className="studentIndicator">
      <link rel="stylesheet" href="student_indicator.css" />
      <button className="studentIndicatorBtn" onClick={increaseVal}>
        +
      </button>
      <div className="studentIndicatorDisplay">
        <div className="studentIndicatorDisplayElement" id="displayHigh">
          2
        </div>
        <div className="studentIndicatorDisplayElement" id="displayMedium">
          1
        </div>
        <div className="studentIndicatorDisplayElement" id="displayLow">
          0
        </div>
      </div>
      <div className="studentIndicatorDisplayElement" id="displayLow"></div>
      <button className="studentIndicatorBtn" onClick={decreaseVal}>
        -
      </button>
    </div>
  );
}

export default StudentIndicator;
