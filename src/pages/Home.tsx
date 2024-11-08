import React from 'react';
import { Box, Heading, SimpleGrid, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useGroupStore } from '../store/groupStore';
import { useAuthStore } from '../store/authStore';

export const Home = () => {
  const { user } = useAuthStore();
  const { groups, loading, fetchUserGroups } = useGroupStore();

  React.useEffect(() => {
    if (user) {
      fetchUserGroups(user.uid);
    }
  }, [user, fetchUserGroups]);

  if (!user) {
    return (
      <Box textAlign="center" py={10}>
        <Heading mb={4}>Welcome to Chama SACCO</Heading>
        <Text mb={6}>Please sign in to manage your groups and contributions.</Text>
        <Button as={RouterLink} to="/signin" colorScheme="blue">
          Sign In
        </Button>
      </Box>
    );
  }

  if (loading) {
    return <Text>Loading groups...</Text>;
  }

  return (
    <Box>
      <Heading mb={6}>Your Groups</Heading>
      {groups.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Text mb={4}>You haven't joined any groups yet.</Text>
          <Button as={RouterLink} to="/create-group" colorScheme="blue">
            Create a Group
          </Button>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {groups.map((group) => (
            <Box
              key={group.id}
              p={6}
              bg="white"
              rounded="lg"
              shadow="md"
              _hover={{ shadow: 'lg' }}
            >
              <Heading size="md" mb={2}>{group.name}</Heading>
              <Text mb={4} color="gray.600">{group.description}</Text>
              <Button
                as={RouterLink}
                to={`/group/${group.id}`}
                colorScheme="blue"
                size="sm"
              >
                View Group
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};