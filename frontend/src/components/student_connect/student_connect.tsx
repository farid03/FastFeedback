import { Button, Flex, Input } from "antd";
import React, { useState } from "react";

import { Link } from "react-router-dom";

function StudentConnect() {
  const [lectionId, setLectionId] = useState<string>("");
  return (
    <div className="studentConnectPage">
      <Flex vertical={true} gap="large" align="center">
        <Input
          placeholder="Введите ID Лекции"
          value={lectionId}
          onChange={(e) => setLectionId(e.target.value)}
          size="large"
        />
        <Link to={`/lection/student/${lectionId}`}>
          <Button disabled={!lectionId} type="primary" size="large">
            Подключиться
          </Button>
        </Link>
      </Flex>
    </div>
  );
}

export default StudentConnect;
