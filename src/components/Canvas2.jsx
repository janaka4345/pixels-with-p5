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
export default function Canvas2(props) {
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

    graphic.image(img, 0, 0);
    graphic.loadPixels();
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        cells.push({
          x: x * cellSize,
          y: y * cellSize,
          positionX: x * cellSize,
          positionY: y * cellSize,
          speedX: Math.random() * 2,
          speedY: Math.random() * 2,
        });
      }
    }
  };
}
function preload(p5) {
  img = p5.loadImage("./face.jpg");
}
function draw(p5) {
  return () => {
    p5.background(255, 0, 0);

    cells.forEach((cell, i) => {
      p5.image(
        img,
        cell.positionX,
        cell.positionY,
        cellSize,
        cellSize,
        cell.x,
        cell.y,
        cellSize,
        cellSize
      );
      p5.push();

      cell.positionX += cell.speedX;
      cell.positionY += cell.speedY;

      p5.fill(0, 0, 0, 1);
      p5.strokeWeight(2);
      p5.stroke(255);
      p5.square(cell.positionX, cell.positionY, cellSize);
      p5.pop();
    });
    // p5.noLoop();
  };
}
function mousePressed(p5) {
  console.log(p5.frameRate());
}
