import React from "react";
import "./student_indicator.css";
import { Button } from "antd";

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

  return (
    <div className="studentIndicator">
      <Button
        className="studentIndicatorBtn"
        id="btnPlus"
        onClick={increaseVal}
      >
        +
      </Button>
      <div
        className="indicator-square"
        style={{
          backgroundColor: val === 2 ? "#a5f438" : "white",
        }}
      />
      <div
        className="indicator-square"
        style={{
          backgroundColor:
            val === 2 ? "#a5f438" : val === 1 ? "#efcc0d" : "white",
        }}
      />
      <div
        className="indicator-square"
        style={{
          backgroundColor:
            val === 2 ? "#a5f438" : val === 1 ? "#efcc0d" : "#ef2b32",
        }}
      />
      <Button
        className="studentIndicatorBtn"
        id="btnMinus"
        onClick={decreaseVal}
      >
        -
      </Button>
    </div>
  );
}

export default StudentIndicator;
