import { QuickDB } from 'quick.db';
const db = new QuickDB();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const { winnerUID, gameID } = req.body;
        let game = await db.get(`game.${gameID}`);
        game.ended = true;
        game.started = false;
        game.winnerUID = winnerUID;

        const res = await db.set(`game.${gameID}`, game);

        res.status(201).json({ message: 'Game ended', success: true, gameID });
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
