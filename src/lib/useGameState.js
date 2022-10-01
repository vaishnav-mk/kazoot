import { useState } from 'react';
export function useGameState(gameID) {
  let [gameState, setGameState] = useState({
    started: false,
    ended: false,
  });
  if (gameID) {
    fetch(`/api/activegames/${gameID}`)
      .then((i) => i.json())
      .then((i) =>
        setGameState({
          started: i.game.started,
          ended: i.game.ended,
        })
      );
  }

  return { gameState };
}
