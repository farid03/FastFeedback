import StudentIndicator from "../student_indicator/student_indicator";

function StudentMain() {
  return (
    <div className="studentMainPage">
      <div className="indicatorsContainer">
        <div className="indicatorContainer">
          пон
          <StudentIndicator />
        </div>
        <div className="indicatorContainer">
          вайб
          <StudentIndicator />
        </div>
      </div>
      <form>
        <input type="submit" value="ЖЁСТКИЙ НЕПОН" />
      </form>
    </div>
  );
}

export default StudentMain;
