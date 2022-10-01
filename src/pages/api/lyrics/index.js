import lyricsSearcher from 'lyrics-finder';

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const { artist, track } = req.body;
        const result = await lyricsSearcher(artist, name);

        res
          .status(201)
          .json({ message: 'Lyrics found', success: true, result });
      } catch (error) {
        console.log(error);
        res
          .status(400)
          .json({ message: 'Lyrics not found', success: false, result });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
