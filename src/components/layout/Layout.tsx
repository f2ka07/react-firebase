import React from 'react';
import { Box } from '@chakra-ui/react';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box minH="100vh" bg="gray.50">
      <Navigation />
      <Box maxW="1200px" mx="auto" px={4} py={8}>
        {children}
      </Box>
    </Box>
  );
};