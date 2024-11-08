import React, { useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
  VStack,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { useContributionStore } from '../../store/contributionStore';

interface ContributionsListProps {
  groupId: string;
}

export const ContributionsList = ({ groupId }: ContributionsListProps) => {
  const { contributions, loading, fetchGroupContributions } = useContributionStore();

  useEffect(() => {
    fetchGroupContributions(groupId);
  }, [groupId, fetchGroupContributions]);

  if (loading) {
    return <Text>Loading contributions...</Text>;
  }

  if (contributions.length === 0) {
    return <Text>No contributions found.</Text>;
  }

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="xl" fontWeight="bold">Contributions History</Text>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {contributions.map((contribution) => (
              <Tr key={contribution.id}>
                <Td>{format(new Date(contribution.date), 'PPP')}</Td>
                <Td>KES {contribution.amount.toFixed(2)}</Td>
                <Td>
                  <Badge
                    colorScheme={contribution.status === 'completed' ? 'green' : 'yellow'}
                  >
                    {contribution.status}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
};