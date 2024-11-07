import React, { useState } from "react";
import { Button, Input, InputNumber, Modal, Radio, Carousel } from "antd";
import "./create_configuration_modal.css";

const eventStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#fff",
  background: "#ce0071",
  display: "flex",
  flexDirection: "column",
  gap: 4,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
};

export type QuickEvent = {
  id: number;
  type: "poll";
  text: string;
  answers: string[];
  correct_answer_id: number;
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

  const clear = () => {
    setNewTextField("");
    setNewTimeout(undefined);
    setNewAnswer("");
    setNewAnswers([]);
    setNewRightIndex(0);
  };

  const onClose = () => {
    clear();
    onCloseProp();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      onCancel={onClose}
      onOk={onClose}
      footer={[]}
    >
      <div className="create-configuration-modal">
        <div className="modal-header">
          <span>Редактирование конфигурации</span>
        </div>

        <div className="modal-body">
          <span>Текущий набор событий:</span>
          <div className="modal-events-list-container">
            <Carousel arrows infinite={false}>
              {lectionState.map((event) => (
                <div key={event.id}>
                  <div style={eventStyle} className="event-picker-event">
                    <span>Опрос</span>
                    <span>{event.text}</span>
                    <Button
                      onClick={() =>
                        setLectionState(
                          lectionState.filter((item) => item.id !== event.id),
                        )
                      }
                    >
                      Удалить
                    </Button>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
          <div className="modal-event-creation">
            <span>Создание нового события:</span>

            <div className="modal-event-question-input">
              <Input
                size="large"
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
                    size="large"
                    value={newRightIndex}
                    onChange={(e) => setNewRightIndex(e.target.value)}
                    className="modal-event-radio-container"
                  >
                    {newAnswers.map((answer, idx) => (
                      <Radio
                        key={idx}
                        className="modal-event-answer"
                        value={idx}
                      >
                        {answer}
                      </Radio>
                    ))}
                  </Radio.Group>
                </>
              )}
              <div className="new-answer">
                <Input
                  size="large"
                  placeholder="Новый вариант ответа"
                  className="modal-event-answer-input"
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                />
                <Button
                  type="primary"
                  size="large"
                  onClick={() => {
                    setNewAnswers((prev) => [...prev, newAnswer]);
                    setNewAnswer("");
                  }}
                  disabled={newAnswer.length === 0}
                >
                  Добавить вариант ответа
                </Button>
              </div>
            </div>

            <InputNumber
              size="large"
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
              size="large"
              type="primary"
              className="modal-event-create-event"
              disabled={newTextField === "" || newAnswers.length === 0}
              onClick={() => {
                setLectionState([
                  ...lectionState,
                  {
                    id: lectionState.length,
                    type: "poll",
                    text: newTextField,
                    answers: newAnswers,
                    correct_answer_id: newRightIndex,
                    timeout: newTimeout,
                  },
                ]);
                clear();
              }}
            >
              Создать событие
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
