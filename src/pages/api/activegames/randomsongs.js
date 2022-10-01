import { QuickDB } from 'quick.db';
const db = new QuickDB();
import lyricsFinder from 'lyrics-finder';
import useSWR from 'swr';
import fetcher from '../../../lib/fetcher';
export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        console.log('reached');
        let spotifyList = await fetch(
          'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF',
          {
            headers: {
              Accept: 'application/json',
              Authorization:
                'Bearer BQAsVXf-wbeK23HVerBNxMIUUPqLdhYdHKU8vjna0XfH9lAIBmqZSFQeNwM1s-7BYdQppHzFD2djb54yz0AVRQf6oMkm6Lpbm6JG8OCZhAR3HcP013W5HIo-qQRzQlDQUyAoQQF-YLIBptT2XLCTC8ClYIa5IYq7gurLZXyl_D5JgBPpxXnVN1FLwhJW_S8',
              'Content-Type': 'application/json',
            },
          }
        )
          .then((i) => i.json())
          .then((i) =>
            i.tracks?.items
              .map((i) => i.track)
              .map((i) => ({
                artist: i.artists[0].name,
                track: i.name,
              }))
          );
        console.log({ spotifyList });
        const randoms = spotifyList.sort(() => Math.random() - 0.5).slice(0, 4);
        await res.status(200).json({
          message: 'Random Songs found',
          success: true,
          spotifyList,
          randoms,
        });
      } catch (error) {
        res.status(400).json({
          message: 'No active games found found',
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
