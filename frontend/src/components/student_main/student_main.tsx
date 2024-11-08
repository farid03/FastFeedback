import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentIndicator from "./student_indicator/student_indicator";
import "./student_main.css";
import { Button } from "antd";
import { useCookies } from "react-cookie";
import { QuickEvent } from "../create_lection/create_configuration_modal/create_configuration_modal";
import { StudentPollModal } from "./student_poll_modal/student_poll_modal";

type LectionInfo = {
  sessionId: string;
};

const connect = async (
  lectionId: string,
  setToken: (token: string) => void,
) => {
  const response: Response = await fetch(
    `http://fastfeedback.sknt.ru:8080/connect/lections/${lectionId}`,
    {
      method: "POST",
    },
  );

  if (!response.ok) throw new Error(`Something went wrong: ${response.status}`);

  const lectionInfo: LectionInfo & { token: string } = await response.json();

  setToken(lectionInfo.token);
};

type CurrentEventInfo = {
  current_event?: QuickEvent;
  second_before_timeout_event?: number;
};

const updateStats = async (
  lectionId: string,
  token: string,
  vibe_level: "LOW" | "MEDIUM" | "HIGH",
  pon_level: "LOW" | "MEDIUM" | "HIGH",
  updateCurrentEvent: (event: QuickEvent | undefined) => void,
  isEventEnded: boolean,
  setIsEventEnded: (val: boolean) => void,
  onEventBegin: () => void,
  onEventEnd: () => void,
) => {
  const response: Response = await fetch(
    `http://fastfeedback.sknt.ru:8080/lections/${lectionId}/stats`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ vibe_level, pon_level }),
    },
  );

  if (!response.ok) throw new Error(`Something went wrong: ${response.status}`);

  const currentInfo: CurrentEventInfo = await response.json();
  if (isEventEnded && currentInfo.current_event) {
    updateCurrentEvent(currentInfo.current_event);
    setIsEventEnded(false);
    onEventBegin();
    return;
  }
  if (!isEventEnded && !currentInfo.current_event) {
    updateCurrentEvent(currentInfo.current_event);
    setIsEventEnded(true);
    onEventEnd();
    return;
  }
  updateCurrentEvent(currentInfo.current_event);
};

const fireTotalNepon = async (
  lectionId: string,
  token: string,
  cooldown: () => void,
) => {
  const response: Response = await fetch(
    `http://fastfeedback.sknt.ru:8080/lections/${lectionId}/button`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) throw new Error(`Something went wrong: ${response.status}`);
  cooldown();
};

function StudentMain() {
  const { lectionId } = useParams() as { lectionId: string };

  const [cookies, setCookie] = useCookies([`token+${lectionId}`, "cooldown"]);

  const token: string | undefined = cookies[`token+${lectionId}`];
  const cooldown: boolean | undefined = cookies["cooldown"];

  useEffect(() => {
    if (token) return;
    connect(lectionId, (token: string) =>
      setCookie(`token+${lectionId}`, token, { maxAge: 7200 }),
    );
  }, [lectionId, setCookie, token]);

  const [vibe, setVibe] = useState<number>(1);
  const [pon, setPon] = useState<number>(1);

  const [currentEvent, setCurrentEvent] = useState<QuickEvent>();
  const [isEventEnded, setIsEventEnded] = useState<boolean>(true);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!lectionId || !token) return;

    const id = setInterval(
      () =>
        updateStats(
          lectionId,
          token,
          vibe === 0 ? "LOW" : vibe === 1 ? "MEDIUM" : "HIGH",
          pon === 0 ? "LOW" : pon === 1 ? "MEDIUM" : "HIGH",
          (event: QuickEvent | undefined) => setCurrentEvent(event),
          isEventEnded,
          (val: boolean) => setIsEventEnded(val),
          () => setIsModalOpen(true),
          () => {
            setTimeout(() => setIsModalOpen(false), 5000);
          },
        ),
      5000,
    );

    return () => clearInterval(id);
  }, [
    lectionId,
    vibe,
    pon,
    token,
    setCurrentEvent,
    setIsEventEnded,
    isEventEnded,
    setIsModalOpen,
  ]);

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
      <Button
        disabled={cooldown}
        onClick={() => {
          token &&
            fireTotalNepon(lectionId, token, () =>
              setCookie("cooldown", true, { maxAge: 300 }),
            );
        }}
        className="hardNePonBtn"
        type="primary"
        size="large"
      >
        <span>ЖЕСТКИЙ</span>
        <span>НЕПОН</span>
      </Button>
      <StudentPollModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentEvent={currentEvent}
        isEventEnded={isEventEnded}
      />
    </div>
  );
}

export default StudentMain;
