import { useState, useEffect, useRef } from 'react';
import { getAuth } from 'firebase/auth';
import fetcher from './fetcher';
import useSWR from 'swr';
export function usePlayerList(gameID) {
  let [players, setPlayers] = useState([]);
  if (gameID) {
    fetch(`/api/activegames/players/123`)
      .then((i) => i.json())
      .then((i) => setPlayers(i.players));
  }
  return { players };
}
