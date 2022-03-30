import React from "react";
import { Spaceship } from "./Spaceship";
import { Alien } from "./Alien";
import BasicProjectile from "./BasicProjectile";
import HealthBar from "./HealthBar";
import ScoreCounter from "./ScoreCounter";

const SpaceInvader = function () {
  /////---Ship control---/////

  const [shipX, setShipX] = React.useState(650);
  const shipY = 780; //Yes

  let speed = 0;
  const moveShip = function (e) {
    if (e.key === "a") speed = -8;
    if (e.key === "d") speed = 8;
  };

  const stopShip = function (e) {
    if (e.key === "a" && speed === -8) speed = 0;
    if (e.key === "d" && speed === 8) speed = 0;
  };

  /////---Alien control---/////

  const [alienX, setAlineX] = React.useState(600);
  let alienSpeed = 3;
  const alienMovement = function () {
    setAlineX((old) => {
      if (old + alienSpeed >= 1190 || old + alienSpeed <= 110) {
        alienSpeed *= -1;
      }
      return old + alienSpeed;
    });
  };

  /////---Alien Attacks---/////
  const [allProjectiles, setAllProjectiles] = React.useState([]);

  const circleAttack = function () {
    const atk = new Array(72).fill("").map((el, i) => ({
      x: alienX,
      y: 100,
      angle: i * 5,
      type: "basic",
    }));

    setAllProjectiles((old) => [...old, ...atk]);
  };

  const renderProjectile = function (projectile) {
    if (projectile.type === "basic") {
      return <BasicProjectile {...projectile} />;
    }
  };

  const projectileMovement = function (speed) {
    setAllProjectiles((old) => {
      const newArr = [];
      old.forEach((proj) => {
        if (!(proj.x >= 1300 || proj.x <= 0 || proj.y <= 0 || proj.y >= 800)) {
          if (proj.type === "basic") {
            newArr.push({
              ...proj,
              x: proj.x + speed * Math.cos((proj.angle / 180) * Math.PI),
              y: proj.y + speed * Math.sin((proj.angle / 180) * Math.PI),
            });
          }
          if (proj.type === "hit") {
            setHealth((old) => old - 1);
          }
        }
      });
      return newArr;
    });
  };

  const checkHit = function (proj) {
    if (Math.abs(proj.y - shipY) <= 15) {
      if (Math.abs(proj.x - shipX) <= 15) {
        return true;
      }
    }
    return false;
  };
  /////---Time and health count---/////
  const [time, setTime] = React.useState(0);
  const [health, setHealth] = React.useState(50);
  const [startTime, setStartTime] = React.useState(0);

  /////---Game Loop---/////
  const [game, setGame] = React.useState(false);

  const startGame = () => {
    setGame(true);
    setHealth(50);
    setAllProjectiles([]);
    setTime(0);
    setStartTime(Date.now());
  };

  React.useEffect(() => {
    if (game) {
      document.addEventListener("keydown", moveShip);
      document.addEventListener("keyup", stopShip);
      const tick = setInterval(function () {
        setShipX((old) =>
          old + speed >= 1250 || old + speed <= 50 ? old : old + speed
        );
        alienMovement();
        projectileMovement(10);
        setTime(Date.now());
      }, 25);
      return function () {
        clearInterval(tick);
        document.removeEventListener("keydown", moveShip);
        document.removeEventListener("keyup", stopShip);
      };
    }
  }, [game]);

  React.useEffect(() => {
    if (Math.random() > 0.9) circleAttack();
  }, [alienX]);

  React.useEffect(() => {
    setAllProjectiles((old) =>
      old.map((proj) => ({
        ...proj,
        type: checkHit(proj) ? "hit" : "basic",
      }))
    );
  }, [shipX, allProjectiles]);

  React.useEffect(() => {
    if (health <= 0) {
      setGame(false);
    }
  }, [health]);

  return (
    <section className="space-invader-section">
      <h2 className="space-invader-header">space invaders</h2>
      <div className="space-invader-main" onClick={circleAttack}>
        <HealthBar hp={health} />
        <ScoreCounter time={time} startTime={startTime} />
        <Alien x={alienX} />
        <Spaceship x={shipX} />
        {allProjectiles.map(renderProjectile)}
        {game || (
          <button className="start-btn" onClick={startGame}>
            Start
          </button>
        )}
      </div>
    </section>
  );
};

export default SpaceInvader;
