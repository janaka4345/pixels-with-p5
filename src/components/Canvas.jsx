import { useEffect, useRef, useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
let img;
let graphic;
let cw = 400;
let ch = 400;
let cellSize = 20;
let rows = cw / cellSize;
let cols = ch / cellSize;
let cells = [];
export default function Canvas(props) {
  return (
    <div>
      <div

      // style={{ width: "100%", height: "100%" }}
      >
        <ReactP5Wrapper sketch={sketch} />
      </div>
    </div>
  );
}

function sketch(p5) {
  p5.preload = preload(p5);
  p5.setup = setup(p5);
  p5.draw = draw(p5);
  p5.mousePressed = () => mousePressed(p5);
}
function setup(p5) {
  return () => {
    p5.createCanvas(cw, ch, { willReadFrequently: true });
    graphic = p5.createGraphics(200, 200);
    p5.background(0);
    graphic.image(img, 0, 0);
    graphic.loadPixels();
  };
}
function preload(p5) {
  img = p5.loadImage("./face.jpg");
}
function draw(p5) {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      cells.push({
        x: x * cellSize,
        y: y * cellSize,
        size: cellSize,
        color: Math.random() * 255,
      });
    }
  }
  return () => {
    cells.forEach((cell) => {
      p5.push();
      p5.fill(cell.color);
      p5.translate(cell.x, cell.y);
      p5.square(0, 0, cell.size);
      p5.pop();
    });
  };
}
function mousePressed(p5) {
  console.log(graphic);
}
