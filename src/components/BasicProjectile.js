import React from "react";

const BasicProjectile = function (props) {
  const styles = {
    top: `${props.y}px`,
    left: `${props.x}px`,
    transform: `rotate(${props.angle}deg)`,
  };
  return <div className="basic-projectile" style={styles}></div>;
};

export default BasicProjectile;
