import { QuickDB } from 'quick.db';
const db = new QuickDB();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const game = await db.get(`game`);
        console.log({ game });
        console.log('recent');
        console.log(Object.keys(game));
        let key = Object.keys(game)[Object.keys(game).length - 1];
        console.log({ key });

        await res
          .status(200)
          .json({ message: 'recent found', success: true, key });
      } catch (error) {
        console.log({ error: error.toString() });
        res.status(400).json({
          message: 'No keys players found',
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
