import React from "react";

const HealthBar = function (props) {
  const styles = {
    width: `${props.hp * 2}%`,
  };

  return (
    <div className="health-bar">
      <div className="current-health" style={styles}></div>
    </div>
  );
};

export default HealthBar;
