import React from "react";
import Countdown from "react-countdown";

const CountDownOne = (props) => {
  const { setCompletion } = props;
  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {

    if (completed) {
      setCompletion(true);
      return (
        <>
          <div className="time-count day">
            <span>{"00"}</span>Days
          </div>
          <div className="time-count hour">
            <span>{"00"}</span>hour
          </div>
          <div className="time-count min">
            <span>{"00"}</span>minute
          </div>
          <div className="time-count sec">
            <span>{"00"}</span>second
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="time-count day">
            <span>{days < 10 ? "0" + days : days}</span>Days
          </div>
          <div className="time-count hour">
            <span>{hours < 10 ? "0" + hours : hours}</span>hour
          </div>
          <div className="time-count min">
            <span>{minutes < 10 ? "0" + minutes : minutes}</span>minute
          </div>
          <div className="time-count sec">
            <span>{seconds < 10 ? "0" + seconds : seconds}</span>second
          </div>
        </>
      );
    }
  };
  const targetDate = new Date("2023-03-26T00:00:00Z");

  return (
    <div className="coming-time">
      <Countdown  date={targetDate}  renderer={renderer} />
    </div>
  );
};

export default CountDownOne;
