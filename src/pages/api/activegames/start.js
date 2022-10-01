import { QuickDB } from 'quick.db';
const db = new QuickDB();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const { gameID } = req.body;
        console.log({ gameID });
        await db.set(`game.${gameID}.started`, true);
        console.log(await db.get(`game.${gameID}`));
        res.status(201).json({ message: 'Game updated', success: true });
      } catch (error) {
        console.log({ error });
        res
          .status(400)
          .json({ message: 'Game not updated', success: false, error });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
