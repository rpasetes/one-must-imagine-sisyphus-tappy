import { Container, Text, TextStyle } from "pixi.js";

let container: Container;

export function initFrame(width: number, height: number) {
  container = new Container();

  const titleTextStyle = new TextStyle({
    fontFamily: "Arial Black, Arial, sans-serif",
    fontSize: 72,
    fontWeight: "bold",
    fill: "#ff00ff",
    stroke: {
      color: "#ffffff",
      width: 6,
    },
    dropShadow: {
      color: "#000000",
      blur: 10,
      angle: Math.PI / 4,
      distance: 8,
    },
    wordWrap: true,
    wordWrapWidth: 440,
    letterSpacing: 2,
  });

  const titleText = new Text({ style: titleTextStyle });
  titleText.anchor.set(0.5, 0.5);
  titleText.x = width / 2;
  titleText.y = height / 2 - 80;
  titleText.text = "One Must Imagine Sisyphus Tappy";

  const subtitleTextStyle = new TextStyle({
    fontFamily: "Arial Black, Arial, sans-serif",
    fontSize: 30,
    fontWeight: "bold",
    fill: "#ff00ff",
    stroke: {
      color: "#ffffff",
      width: 6,
    },
    dropShadow: {
      color: "#000000",
      blur: 10,
      angle: Math.PI / 4,
      distance: 8,
    },
    wordWrap: true,
    wordWrapWidth: 440,
    letterSpacing: 2,
  });

  const subtitleText = new Text({
    style: subtitleTextStyle,
    text: "Tap Space to move to the beat and stay ahead of the Fury!",
  });

  subtitleText.anchor.set(0.5, 0.5);
  subtitleText.x = width / 2;
  subtitleText.y = height / 2 + 200;

  container.addChild(titleText, subtitleText);
  container.visible = false;

  return container;
}

export function frame(isVisible: boolean) {
  if (!container) {
    return;
  }

  container.visible = isVisible;
}
