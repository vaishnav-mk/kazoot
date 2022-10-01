import { useRouter } from 'next/router';
import fetcher from '../../../../lib/fetcher';
import { useAuth } from '../../../../lib/useAuth';
import AdminPanel from '../../../../components/AdminPanel';
import useSWR from 'swr';
import PlayerPanelBeforeStart from '../../../../components/PlayerPanelBeforeStart';
import PlayerPanelInGame from '../../../../components/PlayerPanelInGame';
import Loading from '../../../../components/Loading';
const Panel = ({ user }) => {
  const { id } = useRouter().query;
  const { data, error, isValidating } = useSWR(
    `/api/activegames/${id}`,
    fetcher
  );
  if (!data)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>{error}</div>;
  const { game, lyrics } = data;
  console.log({ opt: data.options });
  if (user.uid == game?.creatorUID) {
    return (
      <div>
        <AdminPanel gameInfo={game} lyrics={lyrics} id={id} />
      </div>
    );
  } else {
    if (game?.started) {
      return (
        <PlayerPanelInGame
          gameInfo={game}
          lyrics={lyrics}
          user={user}
          options={game.options}
          id={id}
        />
      );
    } else {
      return (
        <PlayerPanelBeforeStart
          user={user}
          gameInfo={game}
          id={id}
          options={game.options}
        />
      );
    }
  }
};
const TestPage = () => {
  const router = useRouter();
  const { id } = router.query;
  let { pending, isSignedIn, user, auth } = useAuth();

  if (!user) return <div>fetching</div>;
  return <Panel user={user} />;
};

export default TestPage;
