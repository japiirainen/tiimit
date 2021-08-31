import Head from 'next/head';
import { ReactQueryDevtools } from 'react-query/devtools';
import { trpc } from '../utils/trpc';
import { useAuth } from './hooks/useAuth';
import { Box, Flex, Button, Heading, Link, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Auth, HelloUser, SignOutButton } from '../components/Auth';
import { User } from '@supabase/supabase-js';

export default function IndexPage() {
  const { user } = useAuth();

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
        <Box mt={20}>
          {user === null ? (
            <Auth />
          ) : (
            <>
              <YourTeams user={user} />
              <Box mt={20} w={'50%'}>
                <NewTeamGroup user={user} />
              </Box>
            </>
          )}
        </Box>
      </Box>
      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
}

type UserProps = {
  user: User;
};

const YourTeams: React.FC<UserProps> = ({ user }) => {
  const { data } = trpc.useQuery([
    'teamGroup.user.all',
    {
      userId: user?.id ?? null,
    },
  ]);

  if (!data || data.length === 0) {
    return <Heading color="whiteAlpha.800">Sinulla ei ole tiimejä</Heading>;
  }
  return (
    <Box>
      <Heading color="whiteAlpha.800">Sinun tiimit</Heading>
      {data?.map((team) => (
        <Box key={team.id}>
          <Link color="whiteAlpha.800">{team.name}</Link>
        </Box>
      ))}
    </Box>
  );
};

const NewTeamGroup: React.FC<UserProps> = ({ user }) => {
  const [name, setName] = useState('');
  const utils = trpc.useContext();
  const addTg = trpc.useMutation('teamGroup.add');

  return (
    <Flex flexDir="row">
      <Input
        color="whiteAlpha.800"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        onClick={() =>
          addTg.mutate(
            { name, owner: user.id },
            {
              onSuccess: () => {
                return utils.invalidateQuery(['teamGroup.user.all']);
              },
            },
          )
        }
      >
        Luo uusi
      </Button>
    </Flex>
  );
};
