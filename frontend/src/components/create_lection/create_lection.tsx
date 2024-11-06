import { Button } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreateConfigurationModal,
  Event,
} from "./create_configuration_modal/create_configuration_modal";
// import { useCookies } from "react-cookie";

export type CreateLectionResponse = {
  token: string;
  sessionId: string;
};

const getLectionId = async () => {
  const response: Response = await fetch("http://94.19.121.253/lections", {
    method: "POST",
    body: JSON.stringify([]),
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

  const [lectionState, setLectionState] = useState<Event[]>([]);
  const [isCreationModalOpen, setIsCreationModalOpen] =
    useState<boolean>(false);

  return (
    <div>
      <Button disabled>Импортировать конфигурацию</Button>
      <Button disabled>Экспортировать конфигурацию</Button>
      <Button onClick={() => setIsCreationModalOpen(true)}>
        Редактировать конфигурацию
      </Button>
      <Button
        onClick={async () => {
          const lectionId = await getLectionId();
          navigate(`/lection/teacher/${lectionId}`);
        }}
        type="primary"
      >
        Начать лекцию
      </Button>
      <CreateConfigurationModal
        lectionState={lectionState}
        setLectionState={setLectionState}
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
      />
    </div>
  );
};
