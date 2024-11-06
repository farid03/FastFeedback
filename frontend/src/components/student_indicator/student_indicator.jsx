function StudentIndicator() {
  return (
    <div className="studentIndicator">
      <link rel="stylesheet" href="student_indicator.css" />
      <button className="studentIndicatorBtn">+</button>
      <div className="studentIndicatorDisplay">
        <div className="studentIndicatorDisplayElement" id="displayHigh"></div>
        <div
          className="studentIndicatorDisplayElement"
          id="displayMedium"
        ></div>
        <div className="studentIndicatorDisplayElement" id="displayLow"></div>
      </div>
      <div className="studentIndicatorDisplayElement" id="displayLow"></div>
      <button className="studentIndicatorBtn">-</button>
    </div>
  );
}

export default StudentIndicator;
