import React, { useEffect } from 'react';
import {
  Box,
  Heading,
  VStack,
  Divider,
  useToast,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { MakeContributionForm } from '../contributions/MakeContributionForm';
import { ContributionsList } from '../contributions/ContributionsList';
import { useGroupStore } from '../../store/groupStore';

export const GroupDashboard = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { groups, loading, fetchUserGroups } = useGroupStore();
  const group = groups.find(g => g.id === groupId);

  useEffect(() => {
    if (!groups.length) {
      fetchUserGroups(groupId!);
    }
  }, [groupId, fetchUserGroups, groups.length]);

  if (loading) {
    return <Spinner />;
  }

  if (!group) {
    return <Text>Group not found</Text>;
  }

  return (
    <Box>
      <VStack spacing={8} align="stretch">
        <Heading size="lg">{group.name}</Heading>
        <Text color="gray.600">{group.description}</Text>
        
        <Box>
          <Heading size="md" mb={4}>Make a Contribution</Heading>
          <MakeContributionForm groupId={groupId!} />
        </Box>

        <Divider />

        <Box>
          <ContributionsList groupId={groupId!} />
        </Box>
      </VStack>
    </Box>
  );
};