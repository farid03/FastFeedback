import React, { useState } from "react";
import { Button, Modal, Radio, RadioChangeEvent, Result } from "antd";
import { QuickEvent } from "../../create_lection/create_configuration_modal/create_configuration_modal";
import { Navigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import "./student_poll_modal.css";

export type StudentPollModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isEventEnded: boolean;
  currentEvent?: QuickEvent;
};

const submitAnswer = async (
  lectionId: string,
  eventId: number,
  answer: string,
  token: string,
  onSuccess: () => void,
) => {
  const response: Response = await fetch(
    `http://fastfeedback.sknt.ru:8080/lections/${lectionId}/polls/${eventId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ asnwer: answer }),
    },
  );

  if (!response.ok) throw new Error(`Something went wrong: ${response.status}`);
  onSuccess();
};

export const StudentPollModal = ({
  isOpen,
  onClose: onCloseProp,
  isEventEnded,
  currentEvent,
}: StudentPollModalProps) => {
  const [value, setValue] = useState(0);

  const { lectionId } = useParams() as { lectionId: string };

  const [cookies] = useCookies([`token+${lectionId}`]);

  const token: string | undefined = cookies[`token+${lectionId}`];

  const [alreadyAnswered, setAlreadyAnswered] = useState<boolean>(false);

  const onClose = () => {
    setValue(0);
    setAlreadyAnswered(false);
    onCloseProp();
  };

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  if (!token) return <Navigate to="/lection/connect" />;

  return (
    <Modal
      className="student-event-modal"
      open={isOpen}
      onCancel={onClose}
      onClose={onClose}
      footer={[]}
    >
      <div className="student-event-body">
        {(!currentEvent || isEventEnded) && (
          <>
            <span className="student-event-header">Событие завершено</span>
            <Result status="warning" />
          </>
        )}
        {currentEvent && (
          <>
            <span className="student-event-header">{currentEvent.text}</span>
            <Radio.Group
              disabled={alreadyAnswered}
              onChange={onChange}
              value={value}
            >
              <div className="options-block">
                {currentEvent.answers.map((answer: string, index: number) => {
                  return (
                    <div key={index}>
                      <Radio value={index}>{answer}</Radio>
                    </div>
                  );
                })}
              </div>
            </Radio.Group>
            {alreadyAnswered && (
              <Result
                status={
                  value === currentEvent.correct_answer_id ? "success" : "error"
                }
              />
            )}
            <Button
              disabled={alreadyAnswered}
              type="primary"
              onClick={() => {
                submitAnswer(
                  lectionId,
                  currentEvent.id,
                  currentEvent.answers[value],
                  token,
                  () => {
                    setAlreadyAnswered(true);
                    setTimeout(() => onClose(), 5000);
                  },
                );
              }}
            >
              Отправить ответ
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
};
