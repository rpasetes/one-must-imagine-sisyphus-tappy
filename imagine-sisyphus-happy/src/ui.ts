import { DEBUG_MODE } from "./debug";
import "./main.css";
import { Application, Container, Text, Ticker } from "pixi.js";
import type { GameState } from "./stateMachine";

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

export function frame(state: GameState, ticker?: Ticker) {
  if (ticker) {
    if (state.gameStarted) {
      elevation.frame(state.elevation, ticker);
      streak.frame(state.streak, ticker);
    }
  }

  const showGameplayUi = state.gameStarted;
  elevationTextSprite.visible = showGameplayUi;
  streakTextSprite.visible = showGameplayUi;

  startPrompt.frame(!state.gameStarted);

  if (state.lost) {
    gameover.frame();
  }
}
