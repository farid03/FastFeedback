import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

import "./role_dispatch.css";

function RoleDispatch() {
  return (
    <div className="roleDispatchPage">
      <header className="pageHeader">Выберите роль</header>
      <Link to="/lection/connect">
        <Button type="primary" className="roleDispatchBtn">
          Студент
        </Button>
      </Link>
      <Link to="/create-lection">
        <Button className="roleDispatchButton">Преподаватель</Button>
      </Link>
    </div>
  );
}

export default RoleDispatch;
