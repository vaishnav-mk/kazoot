import { QuickDB } from 'quick.db';
const db = new QuickDB();
import lyricsFinder from 'lyrics-searcher';
import songlyrics from 'songlyrics';
import lyricsSearcher from 'lyrics-searcher';
export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const { gameID } = req.query;
        let game = await db.get(`game.${gameID}`);
        console.log({ game });

        console.log({ art: game.artist, track: game.track });

        let lyrics = 'Not Found';
        try {
          lyrics = await lyricsFinder(game.artist, game.track);
        } catch (err) {
          //console.log({err})
        }
        await res
          .status(200)
          .json({ message: 'Active Game found', success: true, game, lyrics });
      } catch (error) {
        console.log({ error });
        res.status(400).json({
          message: 'No active games found',
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
