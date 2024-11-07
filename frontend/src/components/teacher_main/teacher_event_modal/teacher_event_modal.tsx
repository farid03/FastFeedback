import React, { useEffect, useState } from "react";
import { Modal, Tag, Progress, ProgressProps, Button } from "antd";
import { QuickEvent } from "../../create_lection/create_configuration_modal/create_configuration_modal";
import { Navigate, useParams } from "react-router-dom";

const twoColors: ProgressProps["strokeColor"] = {
  "0%": "#ce0071",
  "100%": "#87d068",
};

export type EventStats = {
  connected_users_count: number;
  completed_poll_count: number;
  correct_responses_count: number;
};

export type TeacherModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentEvent: QuickEvent;
  isEventEnded: boolean;
  stopEvent: () => void;
};

const getCurrentEventStats = async (
  lessonId: string,
  eventId: number,
  token: string,
  updateStats: (stats: EventStats) => void,
) => {
  const response: Response = await fetch(
    `http://fastfeedback.sknt.ru/lections/${lessonId}/polls/${eventId}/stats`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) throw new Error(`Something went wrong: ${response.status}`);
  const eventStats: EventStats = await response.json();

  updateStats(eventStats);
};

export const TeacherEventModal = ({
  isOpen,
  onClose,
  currentEvent,
  isEventEnded,
  stopEvent,
}: TeacherModalProps) => {
  const [currentEventStats, setCurrentEventStats] = useState<EventStats>();

  const { lectionId } = useParams() as { lectionId: string };
  const token = "placeholder";

  useEffect(() => {
    console.log(lectionId, token, isEventEnded);
    if (!lectionId || !token || isEventEnded) return;
    const id = setInterval(
      () =>
        getCurrentEventStats(lectionId, currentEvent.id, token, (stats) =>
          setCurrentEventStats(stats),
        ),
      5000,
    );

    return () => clearInterval(id);
  }, [lectionId, token, currentEvent, isEventEnded, setCurrentEventStats]);

  if (!token) return <Navigate to="/create-lection" />;

  console.log(currentEvent.correct_answer_id);

  return (
    <Modal
      className="teacher-event-modal"
      open={isOpen}
      onClose={onClose}
      onCancel={onClose}
      footer={[]}
    >
      {currentEventStats && (
        <div className="teacher-event-stats">
          <Progress
            type="dashboard"
            percent={Math.round(
              (currentEventStats.completed_poll_count /
                currentEventStats.connected_users_count) *
                100,
            )}
            strokeColor={twoColors}
            status="active"
            format={() =>
              `Сдано: ${currentEventStats.completed_poll_count}/${currentEventStats.connected_users_count}`
            }
          />
          <Progress
            type="dashboard"
            percent={Math.round(
              (currentEventStats.correct_responses_count /
                currentEventStats.completed_poll_count) *
                100,
            )}
            strokeColor={twoColors}
            status="active"
            format={() =>
              `Верно: ${currentEventStats.correct_responses_count}/${currentEventStats.completed_poll_count}`
            }
          />
        </div>
      )}
      <div className="teacher-event-modal-question">
        <span>{currentEvent.text}</span>
      </div>
      <div className="teacher-event-modal-answers">
        {currentEvent.answers.map((answer, idx) => (
          <Tag
            key={idx}
            className="teacher-event-modal-answer"
            color={
              idx === currentEvent.correct_answer_id && isEventEnded
                ? "green"
                : undefined
            }
          >
            {answer}
          </Tag>
        ))}
      </div>
      <Button disabled={isEventEnded} onClick={stopEvent} type="primary">
        Завершить событие
      </Button>
    </Modal>
  );
};
