import { QuickDB } from 'quick.db';
const db = new QuickDB();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const { groupID } = req.query;
        const group = await db.get(`groups.${groupID}`);
        if (!group) {
          return res.status(404).json({ message: 'No group found' });
        }
        res.status(200).json({ message: 'Group found', success: true, group });
      } catch (error) {
        res.status(400).json({ message: 'No group found', success: false });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
