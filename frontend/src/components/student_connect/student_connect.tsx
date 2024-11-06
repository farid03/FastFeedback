import { Button, InputNumber } from "antd";
import React, { useState } from "react";

import { Link } from "react-router-dom";

function StudentConnect() {
  const [lectionId, setLectionId] = useState<number | null>();
  return (
    <div className="studentConnectPage">
      <InputNumber
        placeholder="Введите ID Лекции"
        value={lectionId}
        onChange={(value) => setLectionId(value)}
      />
      <Link to={`/lection/student/${lectionId}`}>
        <Button disabled={!lectionId}>Подключиться</Button>
      </Link>
    </div>
  );
}

export default StudentConnect;
