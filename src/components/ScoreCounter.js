import React from "react";

const ScoreCounter = function ({ time, startTime }) {
  return (
    <div className="score-counter">
      <span className="score">{time - startTime}</span>
    </div>
  );
};

export default ScoreCounter;
