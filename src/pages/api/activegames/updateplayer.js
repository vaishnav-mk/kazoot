import { QuickDB } from 'quick.db';
const db = new QuickDB();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const { playerUID, gameID, displayName } = req.body;
        const game = await db.get(`game.${gameID}`);

        if (game?.currentPlayers.map((i) => i.playerUID).includes(playerUID))
          return;
        const updateResult = await db.push(`game.${gameID}.currentPlayers`, {
          playerUID,
          displayName,
          score: 0,
        });
        res
          .status(201)
          .json({ message: 'User created', success: true, gameID, playerUID });
      } catch (error) {
        console.log({ error });
        res
          .status(400)
          .json({ message: 'User not created', success: false, error });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
