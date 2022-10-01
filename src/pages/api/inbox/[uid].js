import { QuickDB } from 'quick.db';
const db = new QuickDB();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const { uid } = req.query;
        const messages = await db.get(`inbox.${uid}`);
        if (!messages) {
          return res.status(404).json({ message: 'No messages found' });
        }
        res
          .status(200)
          .json({ message: 'Messages found', success: true, messages });
      } catch (error) {
        res.status(400).json({ message: 'No messages found', success: false });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
