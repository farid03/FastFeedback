import { Button, Flex, Input } from "antd";
import React, { useState } from "react";

import { Link } from "react-router-dom";

function StudentConnect() {
  const [lectionId, setLectionId] = useState<string>("");
  return (
    <div
      className="studentConnectPage"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Flex
        vertical={true}
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
        gap="large"
      >
        <Input
          placeholder="Введите ID Лекции"
          value={lectionId}
          onChange={(e) => setLectionId(e.target.value)}
          style={{
            width: "70%",
            height: "20%",
          }}
          size="large"
        />
        <Link
          to={`/lection/student/${lectionId}`}
          style={{
            width: "70%",
            height: "20%",
          }}
        >
          <Button
            disabled={!lectionId}
            style={{
              width: "100%",
              height: "100%",
            }}
            type="primary"
            size="large"
          >
            Подключиться
          </Button>
        </Link>
      </Flex>
    </div>
  );
}

export default StudentConnect;
