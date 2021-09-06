import { useIsFetching, useIsMutating } from 'react-query';
import { Spinner, Flex } from '@chakra-ui/react';

export const IsFetchingSpinner = () => {
  const isLoading = useIsFetching() + useIsMutating() > 0;

  if (!isLoading) return null;

  return (
    <Flex justify="center" align="center" pos="fixed" w="100%" h="100%">
      <Spinner size="xl" />
    </Flex>
  );
};
