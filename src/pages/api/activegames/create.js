import { QuickDB } from 'quick.db';
const db = new QuickDB();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const { creatorUID, artist, track, options } = req.body;
        const gameID = (Math.random() + 1).toString(36).substring(7);
        console.log({ creatorUID, artist, track, gameID });
        const game = await db.set(`game.${gameID}`, {
          creatorUID,
          artist,
          track,
          started: true,
          currentPlayers: [],
          ended: false,
          options,
        });
        console.log({ game });
        res
          .status(201)
          .json({ message: 'Game created', success: true, game, gameID });
      } catch (error) {
        console.log({ error });
        res
          .status(400)
          .json({ message: 'Game not created', success: false, error });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
