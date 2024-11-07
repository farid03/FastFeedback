import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentIndicator from "./student_indicator/student_indicator";
import "./student_main.css";
import { Button } from "antd";
import { useCookies } from "react-cookie";

type LectionInfo = {
  sessionId: string;
};

function StudentMain() {
  const [, setLectionInfo] = useState<LectionInfo>();
  const params = useParams();

  const [, setCookie] = useCookies(["token"]);

  useEffect(() => {
    const connect = async () => {
      const response: Response = await fetch(
        `http://fastfeedback.sknt.ru:8080/connect/lections/${params.lectionId}`,
        {
          method: "POST",
        },
      );
      if (!response.ok)
        throw new Error(`Something went wrong: ${response.status}`);
      const lectionInfo: LectionInfo & { token: string } =
        await response.json();
      setLectionInfo(lectionInfo);
      setCookie("token", lectionInfo.token);
    };
    connect();
  }, [params, setLectionInfo, setCookie]);

  const [vibe, setVibe] = useState<number>(1);
  const [pon, setPon] = useState<number>(1);
  return (
    <div className="studentMainPage">
      <div className="indicatorsContainer">
        <div className="indicatorContainer">
          <p className="indicator-label">ПоН</p>
          <div className="indicatorWrapper">
            <StudentIndicator val={pon} setVal={setPon} />
          </div>
        </div>
        <div className="indicatorContainer">
          <p className="indicator-label">ВайБ</p>
          <div className="indicatorWrapper">
            <StudentIndicator val={vibe} setVal={setVibe} />
          </div>
        </div>
      </div>
      <Button className="hardNePonBtn" type="primary" size="large">
        <span>ЖЕСТКИЙ</span>
        <span>НЕПОН</span>
      </Button>
    </div>
  );
}

export default StudentMain;
