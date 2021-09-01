import { Icon, Button, Flex, Text } from '@chakra-ui/react';
import { useAuth } from 'hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import { BiLogOut } from 'react-icons/bi';

export const Auth = () => {
  const { signIn } = useAuth();

  return (
    <Flex flexDir="column" align="center" mt="20">
      <Button
        colorScheme="whiteAlpha"
        size="lg"
        w={400}
        maxW="80%"
        h={50}
        rightIcon={<Icon as={FcGoogle} />}
        onClick={signIn}
      >
        Kirjaudu sisään
      </Button>
    </Flex>
  );
};

export const SignOutButton = () => {
  const { signOut, user } = useAuth();
  if (!user) return null;
  return (
    <Button
      position="absolute"
      right={0}
      colorScheme="whiteAlpha"
      size="sm"
      rightIcon={<Icon as={BiLogOut} />}
      onClick={signOut}
    >
      Kirjaudu ulos
    </Button>
  );
};

export const HelloUser = () => {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <Text color="whiteAlpha.800">Terve {user?.user_metadata.full_name}</Text>
  );
};
