import React, { useState, useRef, useEffect, useCallback } from "react";
import Input from "../styles/styled-components/Input";
import Card from "../Card";
import Button from "../styles/styled-components/Button";
const Timer = () => {
  // We need ref in this, because we are dealing
  // with JS setInterval to keep track of it and
  // stop it when needed
  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState("00:00:00");
  const [input, setInput] = useState(0);
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer =useCallback( (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  },[]);

  const clearTimer = useCallback((e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer(`00:00:00`);

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  }, [startTimer]);

  const getDeadTime =useCallback( () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + input * 60);
    return deadline;
  },[input]);

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    clearTimer(getDeadTime());
  }, [clearTimer, getDeadTime]);

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const onClickReset = (e) => {
    e.preventDefault();
    clearTimer(getDeadTime());
  };

  return (
    <>
      <Card>
        <label>
          Minutes
          <Input type="number" onChange={(e) => setInput(e.target.value)} />
        </label>
        <h2>{timer}</h2>
        <Button onClick={onClickReset}>Start/Reset</Button>
        <Button onClick={clearTimer}>Clear Timer</Button>
      </Card>
    </>
  );
};

export default Timer;
