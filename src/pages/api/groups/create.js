import { QuickDB } from 'quick.db';
const db = new QuickDB();

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const { name, description, members, creatorUID } = req.body;
        console.log({ name, description, members, creatorUID });
        const user = await db.get(`users.${creatorUID}`);
        if (user.groups.length == 2)
          return res
            .status(400)
            .json({ message: 'You are already in 2 groups', success: false });
        if (!name)
          return res.status(400).json({
            message: 'You have not provided a valid name',
            success: false,
          });
        if (!description)
          return res.status(400).json({
            message: 'You have not provided a valid description',
            success: false,
          });
        if (members.length > 5 || members.length < 1)
          return res.status(400).json({
            message: 'Group members must be between 1 and 5',
            success: false,
          });
        const groupID = (Math.random() + 1).toString(36).substring(7);
        const group = await db.set(`group.${groupID}`, {
          name,
          description,
          members,
          creatorUID,
          createdAt: Date.now(),
        });
        console.log({ group });
        let memberInfo = db
          .get(`users`)
          .filter((i) => members.includes(i.id) && i.groups.length < 2);

        console.log({ memberInfo });

        memberInfo.forEach((i) => {
          db.push(`users.${i.id}.groups`, groupID);
        });
        let emails = memberInfo.map((i) => i.email);
        console.log(email);
        emails.forEach((i) => {
          fetch('/api/inbox/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: user.displayName,
              message: `You have been added to a group named ${group.name} by ${user.displayName}`,
              email: i,
            }),
          });
        });
        res
          .status(201)
          .json({ message: 'Group created', success: true, group });
      } catch (error) {
        console.log(error);
        res
          .status(400)
          .json({ message: 'Group not created', success: false, error });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
