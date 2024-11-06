import { Link } from "react-router-dom";
import React from "react";

function RoleDispatch() {
  return (
    <div className="roleDispatchPage">
      <header className="pageHeader">Выберите роль</header>
      <Link to="/lection/connect">
        <button className="roleDispatchBtn"> Студент </button>
      </Link>
      <Link to="/create-lection">
        <button className="roleDispatchBtn"> Преподаватель</button>
      </Link>
    </div>
  );
}

export default RoleDispatch;
