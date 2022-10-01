import { QuickDB } from 'quick.db';
const db = new QuickDB();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const { creatorID, gameID } = req.body;
        let game = await db.get(`game.${gameID}`);
        game.creatorUID = creatorID;
        const res = await db.set(`game.${gameID}`, game);
        res.status(201).json({
          message: 'Game creator updated',
          success: true,
          game,
          gameID,
        });
      } catch (error) {
        console.log({ error });
        res
          .status(400)
          .json({ message: 'Game creator not updated', success: false, error });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
