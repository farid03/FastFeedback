import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
//import { useCookies } from "react-cookie";
import { Progress, ProgressProps, QRCode, Button, Flex } from "antd";

import "./teacher_main.css";
import { TeacherEventModal } from "./teacher_event_modal/teacher_event_modal";
import { QuickEvent } from "../create_lection/create_configuration_modal/create_configuration_modal";
import { EventPickerModal } from "./event_picker_modal/event_picker_modal";

const twoColors: ProgressProps["strokeColor"] = {
  "0%": "#ce0071",
  "100%": "#87d068",
};

export type LectionStats = {
  vibe_level: number;
  pon_level: number;
};

const getCurrentStats = async (
  lectionId: string,
  token: string,
  updateStats: (stats: LectionStats) => void,
  playSound: () => void,
) => {
  const response: Response = await fetch(
    `http://fastfeedback.sknt.ru/lections/${lectionId}/stats`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) throw new Error(`Something went wrong: ${response.status}`);

  const lectionStats: LectionStats & { is_need_sound_notification: boolean } =
    await response.json();

  if (lectionStats.is_need_sound_notification) playSound();

  updateStats(lectionStats);
};

const getAllEvents = async (
  lectionId: string,
  token: string,
  updateEvents: (events: QuickEvent[]) => void,
) => {
  const response: Response = await fetch(
    `http://fastfeedback.sknt.ru/lections/${lectionId}/events`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) throw new Error(`Something went wrong: ${response.status}`);

  const events: QuickEvent[] = await response.json();

  updateEvents(events);
};

const startEvent = async (
  lectionId: string,
  token: string,
  event: QuickEvent,
  onSuccess: () => void,
) => {
  const response: Response = await fetch(
    `http://fastfeedback.sknt.ru/lections/${lectionId}/events/${event.id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) throw new Error(`Something went wrong: ${response.status}`);
  onSuccess();
};

const stopCurrentEvent = async (
  lectionId: string,
  token: string,
  onSuccess: () => void,
) => {
  const response: Response = await fetch(
    `http://fastfeedback.sknt.ru/lections/${lectionId}/events`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) throw new Error(`Something went wrong: ${response.status}`);
  onSuccess();
};

const playNePonSound = () => {
  const soundUrl =
    "https://www.myinstants.com/media/sounds/red-siren-alert.mp3";
  const sound = new Audio(soundUrl);
  sound.play();
};

export const TeacherMain = () => {
  const [currentStats, setCurrentStats] = useState<LectionStats>({
    vibe_level: 3,
    pon_level: 2.1,
  });

  const { lectionId } = useParams() as { lectionId: string };
  //const [cookies] = useCookies(["token"]);

  //const token: string | undefined = cookies["token"];
  const token = "placeholder";

  useEffect(() => {
    if (!token || !lectionId) return;
    const id = setInterval(
      () => getCurrentStats(lectionId, token, setCurrentStats, playNePonSound),
      5000,
    );

    return () => clearInterval(id);
  }, [token, lectionId, setCurrentStats]);

  const [events, setEvents] = useState<QuickEvent[]>([]);

  useEffect(() => {
    if (!token || !lectionId) return;
    getAllEvents(lectionId, token, setEvents);
  }, [token, lectionId, setEvents]);

  const [isEventPickerOpen, setIsEventPickerOpen] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [currentEvent, setCurrentEvent] = useState<QuickEvent | undefined>();

  const [isEventEnded, setIsEventEnded] = useState<boolean>(false);

  if (!token) return <Navigate to="/create-lection" />;

  return (
    <div className="teacher-main">
      <Flex gap={150}>
        <QRCode
          value={`http://fastfeedback.sknt.ru/lection/student/${lectionId}`}
          size={450}
        />
        <Flex vertical={true} gap="medium">
          <div className="progress-container">
            <Flex gap="large">
              <Progress
                type="dashboard"
                percent={Math.round(((currentStats.pon_level - 1) / 2) * 100)}
                strokeColor={twoColors}
                status="active"
                format={(precent) => `Пон: ${precent}`}
                size={[300, 300]}
              />
              <Progress
                type="dashboard"
                percent={Math.round(((currentStats.vibe_level - 1) / 2) * 100)}
                strokeColor={twoColors}
                status="active"
                format={(precent) => `Вайб: ${precent}`}
                size={[300, 300]}
              />
            </Flex>
          </div>
          <Button
            className="start-event"
            type="primary"
            onClick={() => setIsEventPickerOpen(true)}
            size="large"
          >
            Начать событие
          </Button>
        </Flex>
      </Flex>
      {!!currentEvent && (
        <TeacherEventModal
          isOpen={isModalOpen}
          onClose={() => isEventEnded && setIsModalOpen(false)}
          isEventEnded={isEventEnded}
          currentEvent={currentEvent}
          stopEvent={() =>
            stopCurrentEvent(lectionId, token, () => setIsEventEnded(true))
          }
        />
      )}
      <EventPickerModal
        isOpen={isEventPickerOpen}
        onClose={() => setIsEventPickerOpen(false)}
        events={events}
        pickEvent={(event) => {
          startEvent(lectionId, token, event, () => {
            setCurrentEvent(event);
            setIsEventPickerOpen(false);
            setIsModalOpen(true);
          });
        }}
      />
    </div>
  );
};
