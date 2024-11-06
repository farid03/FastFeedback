import React, { useState } from "react";
import StudentIndicator from "../student_indicator/student_indicator";
import "./student_main.css";

function StudentMain() {
  const [vibe, setVibe] = useState<number>(1);
  const [pon, setPon] = useState<number>(1);
  return (
    <div className="studentMainPage">
      <div className="indicatorsContainer">
        <div className="indicatorContainer">
          пон
          <StudentIndicator val={pon} setVal={setPon} />
        </div>
        <div className="indicatorContainer">
          вайб
          <StudentIndicator val={vibe} setVal={setVibe} />
        </div>
      </div>
      <button className="hardNeponBtn">ЖЁСТКИЙ НЕПОН</button>
    </div>
  );
}

export default StudentMain;
