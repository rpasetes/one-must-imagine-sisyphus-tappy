import { DEBUG_MODE } from "./debug";
import "./main.css";
import { Application, Container, Text, Ticker } from "pixi.js";

import * as elevation from "./ui/elevation";
import * as streak from "./ui/streak";
import * as gameover from "./ui/gameover";
import * as startPrompt from "./ui/startPrompt";
import * as debug from "./ui/debug";
import * as debugMetronome from "./ui/debugMetronome";

let uiElements: Container;
let elevationTextSprite: Text;
let streakTextSprite: Text;

export function initFrame(app: Application) {
  uiElements = new Container();
  const width = app.screen.width;
  const height = app.screen.height;

  elevationTextSprite = elevation.initFrame();
  uiElements.addChild(elevationTextSprite);

  streakTextSprite = streak.initFrame(width, height);
  uiElements.addChild(streakTextSprite);

  const gameOverText = gameover.initFrame(width, height);
  uiElements.addChild(gameOverText);

  const startPromptText = startPrompt.initFrame(width, height);
  uiElements.addChild(startPromptText);

  // Make sure z-index sorting is enabled on the stage
  uiElements.sortableChildren = true;

  if (DEBUG_MODE) {
    const debugText = debug.initFrame(width);
    uiElements.addChild(debugText);

    const debugMetronomeText = debugMetronome.initFrame(width);
    uiElements.addChild(debugMetronomeText);
  }

  return uiElements;
}

export function frame(
  _expectMove: boolean,
  elevationScore: number,
  streakScore: number,
  lost: boolean,
  gameStarted: boolean,
  ticker?: Ticker,
) {
  if (ticker) {
    if (gameStarted) {
      elevation.frame(elevationScore, ticker);
      streak.frame(streakScore, ticker);
    }
  }

  const showGameplayUi = gameStarted;
  elevationTextSprite.visible = showGameplayUi;
  streakTextSprite.visible = showGameplayUi;

  startPrompt.frame(!gameStarted);

  if (lost) {
    gameover.frame();
  }
}
