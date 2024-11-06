import React from "react";

import { Link } from "react-router-dom";

function StudentConnect() {
  return (
    <div className="studentConnectPage">
      <form>
        <input type="text" title="ID Лекции"></input>
        <Link to={`/lection/student/1`}>
          <input type="submit" value="Подключиться"></input>
        </Link>
      </form>
    </div>
  );
}

export default StudentConnect;
