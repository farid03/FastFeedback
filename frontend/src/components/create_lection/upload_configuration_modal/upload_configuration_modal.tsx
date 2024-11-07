import React, { useState } from "react";
import { Alert, Button, Modal, Upload, UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { QuickEvent } from "../create_configuration_modal/create_configuration_modal";

export type UploadConfigurationProps = {
  setLectionState: (value: QuickEvent[]) => void;
  isOpen: boolean;
  onClose: () => void;
};

type FileError = {
  hasError: boolean;
  errorText: string;
};

function UploadConfigurationModal({
  setLectionState,
  isOpen,
  onClose,
}: UploadConfigurationProps) {
  const [events, setEvents] = useState<QuickEvent[]>([]);
  const noError: FileError = {
    hasError: false,
    errorText: "",
  };
  const [fileError, setFileError] = useState<FileError>(noError);
  function FileErrorDisplay({ hasError, errorText }: FileError) {
    if (!hasError) return null;
    return <Alert type="error" message={errorText}></Alert>;
  }
  const uploadProps: UploadProps = {
    name: "events.json",
    multiple: false,
    maxCount: 1,
    beforeUpload: (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target != null && e.target.result != null) {
          const text = e.target.result;
          try {
            const newEvents = JSON.parse(text as string);
            setEvents(newEvents);
            console.log(events);
            setFileError(noError);
          } catch {
            const err: FileError = {
              hasError: true,
              errorText:
                "Невозможно импортировать конфигурацию из данного файла",
            };
            setFileError(err);
          }
        }
      };
      reader.readAsText(file);
      console.log(file);

      return false;
    },
  };
  function onOk() {
    if (!fileError.hasError) {
      setLectionState(events);
      onClose();
    }
  }
  return (
    <Modal
      className="upload-configuration-modal"
      open={isOpen}
      onClose={onClose}
      onCancel={onClose}
      onOk={onOk}
    >
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <FileErrorDisplay
        hasError={fileError.hasError}
        errorText={fileError.errorText}
      />
    </Modal>
  );
}

export default UploadConfigurationModal;
