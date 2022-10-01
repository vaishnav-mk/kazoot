import { QuickDB } from 'quick.db';
const db = new QuickDB();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const { uid } = req.query;
        const results = await db.get(`results.${uid}`);
        if (!results) {
          return res.status(404).json({ message: 'Results not found' });
        }
        res
          .status(200)
          .json({ message: 'Results found', success: true, results });
      } catch (error) {
        res.status(400).json({ message: 'Results not found', success: false });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
