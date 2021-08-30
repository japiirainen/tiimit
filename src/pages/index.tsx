import Head from 'next/head';
import { ReactQueryDevtools } from 'react-query/devtools';
import { trpc } from '../utils/trpc';
import { supabase } from '../utils/supabase';
import { useAuth } from './hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import { Box, Icon, Flex, Button, Heading, Link } from '@chakra-ui/react';
import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Auth, HelloUser, SignOutButton } from '../components/Auth';

export default function IndexPage() {
  const { signOut, user } = useAuth();
  // const postsQuery = trpc.useQuery(['post.all']);
  // const addPost = trpc.useMutation('post.add');
  // const utils = trpc.useContext();

  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   postsQuery.data?.forEach((post) => {
  //     utils.prefetchQuery(['post.byId', post.id]);
  //   });
  // }, [postsQuery.data, utils]);

  return (
    <>
      <Head>
        <title>Tiimit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box pos="fixed" w="100%" h="100%" backgroundColor="blackAlpha.900">
        <SignOutButton />
        <HelloUser />
        <Flex justify="center" flexDir="row" width="100%">
          <Heading textAlign="center" size="3xl" color="whiteAlpha.800">
            Tiimit
          </Heading>
        </Flex>
        {user === null ? <Auth /> : <>{JSON.stringify(user, null, 2)}</>}
      </Box>
      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
}
