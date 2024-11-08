import React from 'react';
import { Box, Flex, Button, Heading, Spacer } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const Navigation = () => {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/signin');
  };

  return (
    <Box bg="blue.500" px={4} py={3}>
      <Flex maxW="1200px" mx="auto" alignItems="center">
        <RouterLink to="/">
          <Heading size="md" color="white">Chama SACCO</Heading>
        </RouterLink>
        <Spacer />
        {user ? (
          <Flex gap={4}>
            <Button
              as={RouterLink}
              to="/create-group"
              colorScheme="whiteAlpha"
            >
              Create Group
            </Button>
            <Button
              colorScheme="whiteAlpha"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </Flex>
        ) : (
          <Button
            as={RouterLink}
            to="/signin"
            colorScheme="whiteAlpha"
          >
            Sign In
          </Button>
        )}
      </Flex>
    </Box>
  );
};