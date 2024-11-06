import { Link } from "react-router-dom";
import React from "react";

function RoleDispatch() {
  return (
    <div className="roleDispatchPage">
      <header className="pageHeader">Выберите роль</header>
      <button className="roleDispatchBtn"> Студент </button>
      <button className="roleDispatchBtn">
        <Link to="/create-lection">Преподаватель</Link>
      </button>
    </div>
  );
}

export default RoleDispatch;
