import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
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
  return lectionResponse.sessionId;
};

export const CreateLection = () => {
  const navigate = useNavigate();
  //const [cookies, setCookie] = useCookies();

  return (
    <div>
      <Button disabled>Импортировать конфигурацию</Button>
      <Button disabled>Экспортировать конфигурацию</Button>
      <Button disabled>Редактировать конфигурацию</Button>
      <Button
        onClick={async () => {
          const lectionId = await getLectionId();
          navigate(`/lection/teacher/${lectionId}`);
        }}
        type="primary"
      >
        Начать лекцию
      </Button>
    </div>
  );
};
