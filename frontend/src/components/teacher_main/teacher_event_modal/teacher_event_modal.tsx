import React from "react";
import { Modal, Tag, Progress, ProgressProps } from "antd";
import { QuickEvent } from "../../create_lection/create_configuration_modal/create_configuration_modal";

const twoColors: ProgressProps["strokeColor"] = {
  "0%": "#ce0071",
  "100%": "#87d068",
};

export type EventStats = {
  connected_users_count: number;
  completed_poll_count: number;
  correct_responces_count: number;
};

export type TeacherModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentEvent: QuickEvent;
  currentEventStats: EventStats;
  isEventEnded: boolean;
};

export const TeacherEventModal = ({
  isOpen,
  onClose,
  currentEvent,
  currentEventStats,
  isEventEnded,
}: TeacherModalProps) => {
  return (
    <Modal
      className="teacher-event-modal"
      open={isOpen}
      onClose={onClose}
      onCancel={onClose}
      onOk={onClose}
    >
      {currentEventStats.completed_poll_count !== 0 && (
        <div className="teacher-event-stats">
          <Progress
            type="dashboard"
            percent={Math.round(
              (currentEventStats.completed_poll_count /
                currentEventStats.completed_poll_count) *
                100,
            )}
            strokeColor={twoColors}
            status="active"
            format={() =>
              `Сдано: ${currentEventStats.completed_poll_count}/${currentEventStats.connected_users_count}`
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
              idx === currentEvent.correctAnswerId && isEventEnded
                ? "green"
                : undefined
            }
          >
            {answer}
          </Tag>
        ))}
      </div>
    </Modal>
  );
};
