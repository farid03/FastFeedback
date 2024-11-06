import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const getLectionId = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(10), 1000);
  });
};

export const CreateLection = () => {
  const navigate = useNavigate();
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
