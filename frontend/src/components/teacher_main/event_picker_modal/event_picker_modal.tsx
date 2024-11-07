import React from "react";
import { QuickEvent } from "../../create_lection/create_configuration_modal/create_configuration_modal";
import { Modal, Carousel, Button } from "antd";

export type EventPickerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  events: QuickEvent[];
  pickEvent: (event: QuickEvent) => void;
};

const eventStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#fff",
  background: "#ce0071",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
};

export const EventPickerModal = ({
  isOpen,
  onClose,
  events,
  pickEvent,
}: EventPickerModalProps) => {
  return (
    <Modal
      className="event-picker-modal"
      open={isOpen}
      onCancel={onClose}
      onClose={onClose}
      footer={[]}
    >
      <div className="event-picker-body">
        <span>Выберите событие, которое необходимо начать:</span>
        <div className="event-picker-container">
          <Carousel arrows infinite={false}>
            {events.map((event) => (
              <div key={event.id}>
                <div style={eventStyle} className="event-picker-event">
                  <span>Опрос</span>
                  <span>{event.text}</span>
                  <Button onClick={() => pickEvent(event)}>Выбрать</Button>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </Modal>
  );
};
