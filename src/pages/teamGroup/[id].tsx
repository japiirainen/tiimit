import { useRouter } from 'next/dist/client/router';
import { PageWrapper } from 'pages';
import { trpc } from '../../utils/trpc';

export default function PostViewPage() {
  const id = useRouter().query.id as string;
  const tg = trpc.useQuery(['teamGroup.byId', { id }]);

  return (
    <PageWrapper>
      <h1>{tg.data?.name}</h1>

      <h2>Raw data:</h2>
      <pre>{JSON.stringify(tg.data ?? null, null, 4)}</pre>
    </PageWrapper>
  );
}
