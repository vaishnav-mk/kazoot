import { QuickDB } from 'quick.db';
const db = new QuickDB();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const { uid } = req.body;
        const res = await db.delete(`inbox.${uid}`);
        console.log({ res });
        res
          .status(201)
          .json({ message: 'Messages deleted', success: true, res });
      } catch (error) {
        console.log(error);
        res
          .status(400)
          .json({ message: 'Message not created', success: false, error });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
