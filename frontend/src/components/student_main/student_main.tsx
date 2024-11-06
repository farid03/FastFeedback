import { React, useState } from "react";
import StudentIndicator from "../student_indicator/student_indicator";

function StudentMain() {
  const [vibe, setVibe] = useState(1);
  const [pon, setPon] = useState(1);
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
      <form>
        <input type="submit" value="ЖЁСТКИЙ НЕПОН" />
      </form>
      <div>
        vibe: {vibe}
        pon: {pon}
      </div>
    </div>
  );
}

export default StudentMain;
