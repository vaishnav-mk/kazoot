import { QuickDB } from 'quick.db';
const db = new QuickDB();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const { gameid } = req.query;
        const game = await db.get(`game.${gameid}`);
        const players = game?.currentPlayers;

        await res
          .status(200)
          .json({ message: 'Players found', success: true, players });
      } catch (error) {
        res.status(400).json({
          message: 'No active players found',
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
