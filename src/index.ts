import "./style.scss";

import { Bodies, Composite, Engine, Mouse, MouseConstraint, Render, Runner } from 'matter-js';
import galaxyImage from './assets/blackhole.jpg';

document.body.style.backgroundImage = `url(${galaxyImage})`;
document.body.style.backgroundSize = 'cover';

/**
 * Create an element for matterjs in the center of the page
 */
const matterjsElement = document.createElement("div");
matterjsElement.id = "matterjs";
matterjsElement.style.width = "800px";
matterjsElement.style.height = "600px";
matterjsElement.style.margin = "auto";
matterjsElement.style.position = "relative";
matterjsElement.style.top = "50px";
matterjsElement.style.background = "transparent";
document.body.appendChild(matterjsElement);

const engine = Engine.create();
const render = Render.create({
  element: matterjsElement,
  engine: engine,
  options: {
    background: 'transparent',
    wireframes: false,
  }
});

const ground = Bodies.rectangle(400, 630, 810, 60, { isStatic: true });
const ceiling = Bodies.rectangle(400, -30, 810, 60, { isStatic: true });
const leftWall = Bodies.rectangle(-30, 300, 60, 610, { isStatic: true });
const rightWall = Bodies.rectangle(830, 300, 60, 610, { isStatic: true });
Composite.add(engine.world, [ground, ceiling, leftWall, rightWall]);

Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

/**
 * Creating a new box everytime user click on a button
 *   creating the button
 *   adding event listener
 */
const button = document.createElement("button");
button.innerText = "Add box";
matterjsElement.appendChild(button);
button.addEventListener("click", () => {
  /** Random box in random position with random width, height */
  const box = Bodies.rectangle(
    Math.random() * 800,
    Math.random() * 600,
    Math.random() * 200,
    Math.random() * 200
  );
  Composite.add(engine.world, [box]);
});

/**
 * Make it possible to drag matterjs objects
 */
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false
    }
  }
});
Composite.add(engine.world, mouseConstraint);
