import React from "react";
import "./student_indicator.css";

export type StudentIndicatorProps = {
  val: number;
  setVal: (newVal: number) => void;
};

function StudentIndicator({ val, setVal }: StudentIndicatorProps) {
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

  function getDisplayElementsStyle(element: number): React.CSSProperties {
    let color = "transparent";
    if (val === 0 && element === 0) {
      color = "red";
    }
    if (val === 1 && element <= 1) {
      color = "yellow";
    }
    if (val === 2) {
      color = "green";
    }
    return { backgroundColor: color };
  }

  return (
    <div className="studentIndicator">
      <button className="studentIndicatorBtn" onClick={increaseVal}>
        +
      </button>
      <div className="studentIndicatorDisplay">
        <div
          className="studentIndicatorDisplayElement"
          id="displayHigh"
          style={getDisplayElementsStyle(2)}
        ></div>
        <div
          className="studentIndicatorDisplayElement"
          id="displayMedium"
          style={getDisplayElementsStyle(1)}
        ></div>
        <div
          className="studentIndicatorDisplayElement"
          id="displayLow"
          style={getDisplayElementsStyle(0)}
        ></div>
      </div>
      <button className="studentIndicatorBtn" onClick={decreaseVal}>
        -
      </button>
    </div>
  );
}

export default StudentIndicator;
