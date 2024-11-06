import React, { useState } from "react";
import { Button, Input, InputNumber, Modal, Select } from "antd";

export type Event = {
  id: number;
} & (
  | {
      type: "poll";
      text: string;
      answers: string[];
      correctAnswerId: number;
      timeout: number;
    }
  | {
      type: "tap";
      timeout: number;
    }
  | {
      type: "notification";
      text: string;
      timeout: number;
    }
);

export type CreateConfigurationModalProps = {
  lectionState: Event[];
  setLectionState: (value: Event[]) => void;
  isOpen: boolean;
  onClose: () => void;
};

export const CreateConfigurationModal = ({
  lectionState,
  setLectionState,
  isOpen,
  onClose,
}: CreateConfigurationModalProps) => {
  const [newEventType, setNewEventType] = useState<
    "poll" | "tap" | "notification"
  >("poll");

  const [newTextField, setNewTextField] = useState<string>("");

  const [newTimeout, setNewTimeout] = useState<number>(0);

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
              {event.type !== "tap" && <span>Text: {event.text}</span>}
            </div>
          ))}
        </div>
        <div className="modal-event-creation">
          <span>Создание нового события:</span>
          <Select
            placeholder="Выберите тип события"
            defaultValue="poll"
            options={[
              { value: "poll", label: "Опрос" },
              { value: "tap", label: "Тапалка" },
              { value: "notification", label: "Уведомление" },
            ]}
            onChange={(value: string) => {
              value === "tap" || value === "poll" || value === "notification"
                ? setNewEventType(value)
                : setNewEventType("poll");
            }}
          />

          {newEventType === "notification" && (
            <div className="modal-event-with-text-creation">
              <Input
                placeholder="Введите текст уведомления"
                value={newTextField}
                onChange={(e) => setNewTextField(e.target.value)}
              />
            </div>
          )}

          {newEventType === "poll" && (
            <div className="modal-event-poll-creation">
              <Input
                placeholder="Введите вопрос"
                value={newTextField}
                onChange={(e) => setNewTextField(e.target.value)}
              />
            </div>
          )}

          <InputNumber
            placeholder="Введите таймаут"
            value={newTimeout}
            min={0}
            onChange={(value) => {
              if (!value) setNewTimeout(0);
              if (value) setNewTimeout(value);
            }}
          />

          <Button disabled onClick={() => setLectionState([])}>
            Создать событие
          </Button>
        </div>
      </div>
    </Modal>
  );
};
