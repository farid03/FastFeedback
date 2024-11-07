import React from "react";
import "./student_indicator.css";
import { Button, Progress } from "antd";

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

  function getColors(): string[] {
    let color = ["transparent"];
    if (val === 0) {
      color = ["#ef2b32", "transparent", "transparent"];
    }
    if (val === 1) {
      color = ["#efcc0d", "#efcc0d", "transparent"];
    }
    if (val === 2) {
      color = ["#a5f438", "#a5f438", "#a5f438"];
    }
    return color;
  }

  return (
    <div className="studentIndicator">
      <Button className="studentIndicatorBtn" onClick={increaseVal}>
        +
      </Button>
      <Progress
        className="studentIndicatorDisplay"
        percent={((val + 1) * 100) / 3}
        steps={3}
        showInfo={false}
        size={[80, 80]}
        strokeColor={getColors()}
      ></Progress>
      <Button className="studentIndicatorBtn" onClick={decreaseVal}>
        -
      </Button>
    </div>
  );
}

export default StudentIndicator;
