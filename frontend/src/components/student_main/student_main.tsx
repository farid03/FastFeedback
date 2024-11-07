import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentIndicator from "./student_indicator/student_indicator";
import "./student_main.css";
import { Button } from "antd";

type LectionInfo = {
  token: string;
  sessionId: string;
};

function StudentMain() {
  const [lectionInfo, setLectionInfo] = useState<LectionInfo>();
  console.log(lectionInfo);
  const params = useParams();

  useEffect(() => {
    const connect = async () => {
      const response: Response = await fetch(
        `http://94.19.121.253/lections/${params.lectionId}/connect`,
        {
          method: "POST",
        },
      );
      if (!response.ok)
        throw new Error(`Something went wrong: ${response.status}`);
      const lectionInfo: LectionInfo = await response.json();
      setLectionInfo(lectionInfo);
    };
    connect();
  }, [params, setLectionInfo]);

  const [vibe, setVibe] = useState<number>(1);
  const [pon, setPon] = useState<number>(1);
  return (
    <div className="studentMainPage">
      <div className="indicatorsContainer">
        <div className="indicatorContainer">
          <p>пон</p>
          <div className="indicatorWrapper">
            <StudentIndicator val={pon} setVal={setPon} />
          </div>
        </div>
        <div className="indicatorContainer">
          <p>вайб</p>
          <div className="indicatorWrapper">
            <StudentIndicator val={vibe} setVal={setVibe} />
          </div>
        </div>
      </div>
      <p>
        <Button className="hardNePonBtn" type="primary" size="large">
          ЖЁСТКИЙ НЕПОН
        </Button>
      </p>
    </div>
  );
}

export default StudentMain;
