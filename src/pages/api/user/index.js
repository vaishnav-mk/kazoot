import { QuickDB } from 'quick.db';
const db = new QuickDB();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const { displayName, email, uid, photoURL } = req.body;
        const user = await db.set(`users.${uid}`, {
          displayName,
          email,
          uid,
          photoURL,
          createdAt: Date.now(),
          groups: [],
          description: '',
        });

        res.status(201).json({ message: 'User created', success: true, user });
      } catch (error) {
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
