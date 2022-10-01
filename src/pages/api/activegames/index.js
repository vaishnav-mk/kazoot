import { QuickDB } from 'quick.db';
const db = new QuickDB();
import lyricsFinder from 'lyrics-finder';

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const gameID = '123';
        const yes = await db.get(`game.${gameID}`);
        if (!yes) {
          await db.set(`game.${gameID}`, {
            creatorUID: 'rK9QGQLgnidkGagajwXvKvWzq4y1',
            started: false,
            id: gameID,
            track: 'Chris Brown',
            track: 'Under The Influence',
            currentPlayers: [],
          });
        }
        let game = await db.get(`game.${gameID}`);

        game.artist = randomSongs[0].artist;
        game.track = randomSongs[0].track;
        let lyrics =
          (await lyricsFinder(randomSongs[0].artist, randomSongs[0].track)) ||
          'Not Found!';

        await res.status(200).json({
          message: 'Active Game found',
          success: true,
          game,
          lyrics,
          options,
        });
      } catch (error) {
        console.log({ error });
        res.status(400).json({
          message: 'No active games found found',
          success: false,
          error,
        });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
