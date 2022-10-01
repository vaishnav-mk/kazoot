import { QuickDB } from 'quick.db';
const db = new QuickDB();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const { rightAnswers, wrongAnswers, questions, type, uid, categories } =
          req.body;
        const result = await db.set(
          `results.${uid}.${(Math.random() + 1).toString(36).substring(7)}`,
          {
            rightAnswers,
            wrongAnswers,
            questions,
            type,
            createdAt: Date.now(),
            categories: categories,
            challengerUID: req.body.challengerUID,
          }
        );
        res
          .status(201)
          .json({ message: 'Result created', success: true, result });
      } catch (error) {
        res
          .status(400)
          .json({ message: 'Result not created', success: false, error });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
