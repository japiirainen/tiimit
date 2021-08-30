import Head from 'next/head';
import Link from 'next/link';
import { ReactQueryDevtools } from 'react-query/devtools';
import { trpc } from '../utils/trpc';
import { supabase } from '../utils/supabase';

async function signInWithGoogle() {
  return await supabase.auth.signIn({
    provider: 'google',
  });
}
async function signout() {
  const { error } = await supabase.auth.signOut();
}

export default function IndexPage() {
  // const postsQuery = trpc.useQuery(['post.all']);
  // const addPost = trpc.useMutation('post.add');
  // const utils = trpc.useContext();

  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   postsQuery.data?.forEach((post) => {
  //     utils.prefetchQuery(['post.byId', post.id]);
  //   });
  // }, [postsQuery.data, utils]);
  const user = supabase.auth.user();
  console.log(user);

  return (
    <>
      <Head>
        <title>Tiimit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Tiimit</h1>
      <h2>Sinun tiimit</h2>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          /**
           * In a real app you probably don't want to use this manually
           * Checkout React Hook Form - it works great with tRPC
           * @link https://react-hook-form.com/
           */

          const $email: HTMLInputElement = (e as any).target.elements.email;
          try {
            const data = await signInWithGoogle();
            console.log('got auth data', data);
          } catch (e) {
            console.error(e);
          }
        }}
      >
        <label htmlFor="title">Email:</label>
        <br />
        <input id="email" name="email" type="text" />
        <button type="submit">submit</button>
      </form>

      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
}

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createSSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });

//   await ssg.fetchQuery('post.all');

//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
