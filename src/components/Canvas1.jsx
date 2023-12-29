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
    // for (let i = 25; i < 27; i++) {
    //   const x = Math.floor(cells[i].x / cellSize);
    //   const y = Math.floor(cells[i].y / cellSize);
    //   p5.push();
    //   p5.image(
    //     img,
    //     Math.random() * cw,
    //     Math.random() * cw,
    //     cellSize,
    //     cellSize,
    //     x * cellSize,
    //     y * cols,
    //     cellSize,
    //     cellSize
    //   );
    //   p5.pop();
    // }

    cells.forEach((cell, i) => {
      const x = Math.floor(cell.x / cellSize);
      const y = Math.floor(cell.y / cellSize);
      p5.push();
      // p5.fill(cell.color);
      // p5.translate(cell.x, cell.y);
      p5.image(
        img,
        cell.positionX,
        cell.positionY,
        cellSize,
        cellSize,
        x * cellSize,
        y * cols,
        cellSize,
        cellSize
      );
      cell.positionX += cell.speedX;
      cell.positionY += cell.speedY;

      //   // p5.Fill(0, 0, 0, 0.5);
      //   // p5.strokeWeight(5);
      //   // p5.stroke(255);
      //   // p5.square(cell.x, cell.y, cellSize);
      //   p5.pop();
    });
    // p5.noLoop();
  };
}
function mousePressed(p5) {
  console.log(p5.frameRate());
}
