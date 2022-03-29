import React from "react";

export const Spaceship = function (props) {
  const styles = { left: `${props.x}px` };
  return (
    <div className="spaceship ship" style={styles}>
      <div className="wing ship"></div>
      <div className="cockpit ship"></div>
      <div className="wing ship"></div>
    </div>
  );
};
