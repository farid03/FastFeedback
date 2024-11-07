import React, { useState } from "react";
import { Modal, Radio, RadioChangeEvent, Space } from "antd";
import { QuickEvent } from "../../create_lection/create_configuration_modal/create_configuration_modal";

export type StudentPollModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isEventEnded: boolean;
  currentEvent: QuickEvent;
};

function StudentPollModal({
  isOpen,
  onClose,
  isEventEnded,
  currentEvent,
}: StudentPollModalProps) {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    console.log(isEventEnded);
    setValue(e.target.value);
  };

  function processOk() {
    onClose();
  }

  return (
    <Modal
      className="student-event-modal"
      open={isOpen}
      onCancel={onClose}
      onClose={onClose}
      onOk={processOk}
    >
      <div className="student-event-body">
        <span>{currentEvent.text}</span>
        <div className="options-block">
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
              {currentEvent.answers.map((answer: string, index: number) => {
                return (
                  <div key={index}>
                    <Radio value={index}>{answer}</Radio>
                  </div>
                );
              })}
            </Space>
          </Radio.Group>
        </div>
      </div>
    </Modal>
  );
}

export default StudentPollModal;
