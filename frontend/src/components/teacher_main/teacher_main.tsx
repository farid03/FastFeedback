import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./teacher_main.css";

export const TeacherMain = () => {
  return (
    <div className="teacher-main">
      <div className="progress-container">
        <CircularProgressbar value={34} text="34%" />
        <CircularProgressbar value={69} text="69%" />
      </div>
    </div>
  );
};
