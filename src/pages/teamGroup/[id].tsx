import {
  Heading,
  SimpleGrid,
  Flex,
  useBreakpoint,
  Button,
  Text,
  IconButton,
  Tooltip,
  Icon,
} from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { PageWrapper } from 'pages';
import { BiArrowBack, BiCrown } from 'react-icons/bi';
import { trpc } from '../../utils/trpc';

export default function PostViewPage() {
  const router = useRouter();
  const bp = useBreakpoint();
  const id = useRouter().query.id as string;
  const tg = trpc.useQuery(['teamGroup.byId', { id }]);
  const teams = trpc.useQuery(['team.byGroup', { groupId: id }]);

  const newCaptain = trpc.useMutation('team.newCaptain');

  return (
    <PageWrapper>
      <Button
        colorScheme="whiteAlpha"
        leftIcon={<BiArrowBack />}
        onClick={() => router.push('/')}
      >
        takaisin
      </Button>
      <Heading color="whiteAlpha.800" textAlign="center">
        {tg.data?.name}
      </Heading>
      <SimpleGrid
        columns={bp === 'sm' || bp === 'base' ? 1 : 2}
        spacing={10}
        px={2}
        mt="12"
      >
        {teams.data
          ?.sort((a, b) => (a.id < b.id ? 1 : -1))
          .map((team) => (
            <Flex
              key={team.id}
              border="1px"
              borderColor="whiteAlpha.500"
              p={5}
              flexDir="column"
            >
              <Heading color="whiteAlpha.800" textAlign="center">
                {team.name}
              </Heading>
              {team.participants
                .sort((a, b) => {
                  if (a === team.captain) return -1;
                  if (b === team.captain) return 1;
                  return a.charCodeAt(0) < b.charCodeAt(0) ? 1 : -1;
                })
                .map((p, i) => (
                  <Flex key={i} py="2">
                    {p === team.captain ? (
                      <Icon color="gold" w="8" h="8" as={BiCrown} mr="2" />
                    ) : null}
                    <Text color="whiteAlpha.800" fontSize="2xl">
                      {p}
                    </Text>
                    <Tooltip label="Ylennä kapteeniksi">
                      <IconButton
                        aria-label="crown-button"
                        colorScheme="whiteAlpha"
                        icon={<BiCrown />}
                        ml="auto"
                        onClick={() =>
                          newCaptain.mutate(
                            {
                              teamId: team.id,
                              captainName: p,
                            },
                            {
                              onSuccess: () => {
                                teams.refetch();
                              },
                            },
                          )
                        }
                      />
                    </Tooltip>
                  </Flex>
                ))}
            </Flex>
          ))}
      </SimpleGrid>
    </PageWrapper>
  );
}
