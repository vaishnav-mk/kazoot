import { QuickDB } from 'quick.db';
const db = new QuickDB();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const { message, email, from } = req.body;
        const user = await db.get(`users`);
        console.log({
          user,
          message,
          email,
        });
        const mail = Object.values(user || {}).find((i) => i.email == email);
        console.log({ mail });
        const result = await db.get(`inbox.${mail.uid}`);
        let inbox;
        if (!result) {
          inbox = await db.set(`inbox.${mail.uid}`, [
            {
              message,
              from,
              createdAt: Date.now(),
            },
          ]);
        } else {
          inbox = await db.set(`inbox.${mail.uid}`, [
            ...result,
            {
              message,
              from,
              createdAt: Date.now(),
            },
          ]);
        }
        res
          .status(201)
          .json({ message: 'Message created', success: true, inbox });
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
