import React from "react";
import { Link } from "react-router-dom";
import { Button, Flex } from "antd";

import "./role_dispatch.css";

function RoleDispatch() {
  return (
    <div className="roleDispatchPage" style={{ textAlign: "center" }}>
      <Flex vertical={true} gap="medium">
        <h2 className="pageHeader" style={{ marginTop: "30px" }}>
          Выберите роль
        </h2>
        <Flex gap="large">
          <Link to="/lection/connect">
            <Button type="primary" size="large" className="roleDispatchBtn">
              Студент
            </Button>
          </Link>
          <Link to="/create-lection">
            <Button className="roleDispatchButton" size="large">
              Преподаватель
            </Button>
          </Link>
        </Flex>
      </Flex>
    </div>
  );
}

export default RoleDispatch;
