import React from "react";

export const Alien = function (props) {
  const styles = {
    left: `${props.x}px`,
  };

  return (
    <div className="alien-main" style={styles}>
      <div className="alien-tentacle-1 alien-tentacle">
        <div className="black-tentacle-1 black-tentacle"></div>
      </div>
      <div className="alien-tentacle-2 alien-tentacle">
        <div className="black-tentacle-2 black-tentacle"></div>
      </div>
      <div className="alien-tentacle-3 alien-tentacle">
        <div className="black-tentacle-3 black-tentacle"></div>
      </div>
      <div className="alien-tentacle-4 alien-tentacle">
        <div className="black-tentacle-4 black-tentacle"></div>
      </div>
      <div className="alien-head"></div>
    </div>
  );
};
