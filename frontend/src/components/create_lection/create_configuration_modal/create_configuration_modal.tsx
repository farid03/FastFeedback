import React, { useState } from "react";
import { Button, Input, InputNumber, Modal, Radio } from "antd";

export type QuickEvent = {
  id: number;
  type: "poll";
  text: string;
  answers: string[];
  correctAnswerId: number;
  timeout?: number;
};

export type CreateConfigurationModalProps = {
  lectionState: QuickEvent[];
  setLectionState: (value: QuickEvent[]) => void;
  isOpen: boolean;
  onClose: () => void;
};

export const CreateConfigurationModal = ({
  lectionState,
  setLectionState,
  isOpen,
  onClose: onCloseProp,
}: CreateConfigurationModalProps) => {
  const [newTextField, setNewTextField] = useState<string>("");

  const [newTimeout, setNewTimeout] = useState<number>();

  const [newAnswer, setNewAnswer] = useState<string>("");

  const [newAnswers, setNewAnswers] = useState<string[]>([]);

  const [newRightIndex, setNewRightIndex] = useState<number>(0);

  const onClose = () => {
    setNewTextField("");
    setNewTimeout(undefined);
    setNewAnswer("");
    setNewAnswers([]);
    setNewRightIndex(0);
    onCloseProp();
  };

  return (
    <Modal
      className="create-configuration-modal"
      open={isOpen}
      onClose={onClose}
      onCancel={onClose}
      onOk={onClose}
    >
      <div className="modal-header">
        <span>Редактирование конфигурации</span>
      </div>

      <div className="modal-body">
        <span>Текущий набор событий:</span>
        <div className="modal-events-list-container">
          {lectionState.map((event) => (
            <div className="modal-event-view" key={event.id}>
              <span>ID: {event.id}</span>
              <span>Type: {event.type}</span>
              <span>Text: {event.text}</span>
            </div>
          ))}
        </div>
        <div className="modal-event-creation">
          <span>Создание нового события:</span>

          <div className="modal-event-question-input">
            <Input
              placeholder="Введите вопрос"
              value={newTextField}
              onChange={(e) => setNewTextField(e.target.value)}
            />
          </div>

          <div className="modal-event-answers-input-container">
            {newAnswers.length !== 0 && (
              <>
                <span>Выберите верный вариант ответа:</span>
                <Radio.Group
                  value={newRightIndex}
                  onChange={(e) => setNewRightIndex(e.target.value)}
                  className="modal-event-radio-container"
                >
                  {newAnswers.map((answer, idx) => (
                    <Radio key={idx} className="modal-event-answer" value={idx}>
                      {answer}
                    </Radio>
                  ))}
                </Radio.Group>
              </>
            )}
            <Input
              placeholder="Введите новый вариант ответа"
              className="modal-event-answer-input"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            />
            <Button
              onClick={() => setNewAnswers((prev) => [...prev, newAnswer])}
              disabled={newAnswer.length === 0}
            >
              Добавить вариант ответа
            </Button>
          </div>

          <InputNumber
            className="modal-event-timeout-input"
            placeholder="Введите таймаут"
            value={newTimeout}
            min={0}
            onChange={(value) => {
              if (!value) setNewTimeout(0);
              if (value) setNewTimeout(value);
            }}
          />

          <Button
            className="modal-event-create-event"
            disabled={newTextField === "" || newAnswers.length === 0}
            onClick={() =>
              setLectionState([
                ...lectionState,
                {
                  id: lectionState.length,
                  type: "poll",
                  text: newTextField,
                  answers: newAnswers,
                  correctAnswerId: newRightIndex,
                  timeout: newTimeout,
                },
              ])
            }
          >
            Создать событие
          </Button>
        </div>
      </div>
    </Modal>
  );
};
