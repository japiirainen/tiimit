import Head from 'next/head';
import { ReactQueryDevtools } from 'react-query/devtools';
import { range, pipe, mapWithIndex } from 'iiris';
import { trpc } from '../utils/trpc';
import { useAuth } from '../hooks/useAuth';
import {
  Box,
  Icon,
  Flex,
  Button,
  Heading,
  Link,
  Input,
  Container,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormLabel,
  IconButton,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Auth, HelloUser, SignOutButton } from '../components/Auth';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/dist/client/router';
import { BiPlus, BiRightArrowAlt } from 'react-icons/bi';

export const PageWrapper: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Tiimit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box pos="fixed" w="100%" h="100%" backgroundColor="blackAlpha.900">
        {children}
      </Box>
    </>
  );
};

export default function IndexPage() {
  const { user } = useAuth();

  return (
    <PageWrapper>
      <SignOutButton />
      <HelloUser />
      <Flex justify="center" flexDir="row" width="100%">
        <Heading textAlign="center" size="3xl" color="whiteAlpha.800">
          Tiimit
        </Heading>
      </Flex>
      <Container
        mt={20}
        maxW="90%"
        w="700px"
        flexDir="column"
        textAlign="start"
        align="center"
        justifyContent="center"
      >
        {user === null ? (
          <Auth />
        ) : (
          <>
            <YourTeams user={user} />
            <Box mt={20}>
              <NewTeamGroup user={user} />
            </Box>
          </>
        )}
      </Container>
      {process.env.NODE_ENV !== 'production' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </PageWrapper>
  );
}

type UserProps = {
  user: User;
};

const YourTeams: React.FC<UserProps> = ({ user }) => {
  const router = useRouter();
  const { data } = trpc.useQuery([
    'teamGroup.user.all',
    {
      userId: user?.id ?? null,
    },
  ]);

  return (
    <Flex w="100%" flexDir="column">
      {!data || data.length === 0 ? (
        <Heading color="whiteAlpha.800">Sinulla ei ole pelit</Heading>
      ) : (
        <>
          <Heading mb="4" color="whiteAlpha.800">
            Sinun pelit
          </Heading>
          {data?.map((tg) => (
            <Flex key={tg.id} justifyContent="start" alignItems="center">
              <Link
                fontSize="2xl"
                onClick={() => router.push(`/teamGroup/${tg.id}`)}
                color="whiteAlpha.800"
              >
                {tg.name}
              </Link>
              <Icon
                ml="2"
                color="whiteAlpha.800"
                w="6"
                h="6"
                as={BiRightArrowAlt}
              />
            </Flex>
          ))}
        </>
      )}
    </Flex>
  );
};

const NewTeamGroup: React.FC<UserProps> = ({ user }) => {
  const [name, setName] = useState('');
  const [participant, setParticipant] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);
  const [numTeams, setNumTeams] = useState(0);
  const utils = trpc.useContext();
  const addTg = trpc.useMutation('teamGroup.add');
  const addTeam = trpc.useMutation('team.add');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const newTeam = ({
    tgId,
    name,
    participants,
  }: {
    tgId: string;
    name: string;
    participants: string[];
  }) =>
    addTeam.mutate({
      groupId: tgId,
      name: name,
      participants,
    });

  return (
    <>
      <Button leftIcon={<BiPlus />} colorScheme="whiteAlpha" onClick={onOpen}>
        Luo uusi
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setName('');
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Luo uusi peli</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>Nimi</FormLabel>
            <Input
              color="blackAlpha.700"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormLabel>Osallistujat</FormLabel>
            <Flex>
              <Input
                color="blackAlpha.700"
                value={participant}
                onChange={(e) => setParticipant(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setParticipants([...participants, participant]);
                    setParticipant('');
                  }
                }}
              />
              <IconButton
                aria-label="add-participant"
                colorScheme="twitter"
                icon={<BiPlus />}
                onClick={() => {
                  setParticipants((prev) => [...prev, participant]);
                  setParticipant('');
                }}
              />
            </Flex>
            {JSON.stringify(participants, null, 2)}
            <FormLabel>Tiimien määrä</FormLabel>
            <NumberInput
              onChange={(val) => setNumTeams(+val)}
              value={numTeams}
              max={participants.length}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blackAlpha"
              onClick={() => {
                const teams = makeTeams(participants, numTeams);
                addTg.mutate(
                  { name, owner: user.id },
                  {
                    onSuccess: async (tg) => {
                      await Promise.all(
                        teams.map((t) =>
                          newTeam({
                            name: t.name,
                            participants: t.participants,
                            tgId: tg.id,
                          }),
                        ),
                      );
                      utils.invalidateQuery(['teamGroup.user.all']);
                      onClose();
                      router.push(`/teamGroup/${tg.id}`);
                    },
                  },
                );
              }}
            >
              Luo peli ja generoi tiimit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const makeTeams = (
  participants: string[],
  numTeams: number,
): { name: string; participants: string[] }[] => {
  const shuffledPs = pipe(participants, shuffle, chunk(numTeams));
  console.log('shuffled', shuffledPs);
  return pipe(
    range(0, numTeams),
    mapWithIndex((i, p) => ({
      name: `Tiimi ${i}`,
      participants: shuffledPs[p],
    })),
  );
};

const chunk =
  (chunks: number) =>
  <T,>(arr: T[]): T[][] =>
    arr.reduce((acc, item, index) => {
      acc[index % chunks].push(item);
      return acc;
    }, Array.from(Array(chunks), () => []) as T[][]);

function shuffle<T>(array: T[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
