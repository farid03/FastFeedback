import { Button, Flex } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreateConfigurationModal,
  QuickEvent,
} from "./create_configuration_modal/create_configuration_modal";
import downloadConfiguration from "./download_configuration/download_configuration";
import UploadConfigurationModal from "./upload_configuration_modal/upload_configuration_modal";
// import { useCookies } from "react-cookie";

export type CreateLectionResponse = {
  token: string;
  sessionId: string;
};

const getLectionId = async (events: QuickEvent[]) => {
  const response: Response = await fetch("http://94.19.121.253/lections", {
    method: "POST",
    body: JSON.stringify(events),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error(`Something went wrong: ${response.status}`);
  const lectionResponse: CreateLectionResponse = await response.json();
  //TODO Save Token
  console.log(lectionResponse.token);
  return lectionResponse.sessionId;
};

export const CreateLection = () => {
  const navigate = useNavigate();
  //const [cookies, setCookie] = useCookies();

  const [lectionState, setLectionState] = useState<QuickEvent[]>([]);
  const [isCreationModalOpen, setIsCreationModalOpen] =
    useState<boolean>(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  return (
    <Flex vertical={true} gap="middle">
      <Flex gap="middle">
        <Button onClick={() => setIsUploadModalOpen(true)} size="large">
          Импортировать конфигурацию
        </Button>
        <Button
          onClick={() => downloadConfiguration(lectionState)}
          size="large"
        >
          Экспортировать конфигурацию
        </Button>
        <Button onClick={() => setIsCreationModalOpen(true)} size="large">
          Редактировать конфигурацию
        </Button>
      </Flex>
      <Button
        onClick={async () => {
          const lectionId = await getLectionId(lectionState);
          navigate(`/lection/teacher/${lectionId}`);
        }}
        type="primary"
        size="large"
      >
        Начать лекцию
      </Button>
      <CreateConfigurationModal
        lectionState={lectionState}
        setLectionState={setLectionState}
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
      />
      <UploadConfigurationModal
        setLectionState={setLectionState}
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </Flex>
  );
};
