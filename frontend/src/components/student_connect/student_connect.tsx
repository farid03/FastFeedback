import { Button, Input } from "antd";
import React, { useState } from "react";

import { Link } from "react-router-dom";

function StudentConnect() {
  const [lectionId, setLectionId] = useState<string>("");
  return (
    <div className="studentConnectPage">
      <Input
        placeholder="Введите ID Лекции"
        value={lectionId}
        onChange={(e) => setLectionId(e.target.value)}
      />
      <Link to={`/lection/student/${lectionId}`}>
        <Button disabled={!lectionId}>Подключиться</Button>
      </Link>
    </div>
  );
}

export default StudentConnect;
