import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useGroupStore } from '../../store/groupStore';
import { useAuthStore } from '../../store/authStore';

interface CreateGroupFormData {
  name: string;
  description: string;
  contributionAmount: number;
  contributionFrequency: 'weekly' | 'monthly';
}

export const CreateGroupForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateGroupFormData>();
  const createGroup = useGroupStore(state => state.createGroup);
  const user = useAuthStore(state => state.user);
  const toast = useToast();

  const onSubmit = async (data: CreateGroupFormData) => {
    if (!user) return;

    try {
      await createGroup({
        ...data,
        adminId: user.uid,
        members: [user.uid],
        createdAt: new Date(),
        balance: 0,
      });
      
      toast({
        title: 'Group created successfully',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error creating group',
        description: (error as Error).message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} w="100%" maxW="500px">
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Group Name</FormLabel>
          <Input {...register('name', { required: true })} />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea {...register('description')} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Contribution Amount</FormLabel>
          <Input
            type="number"
            {...register('contributionAmount', { required: true, min: 0 })}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Contribution Frequency</FormLabel>
          <Select {...register('contributionFrequency', { required: true })}>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </Select>
        </FormControl>

        <Button type="submit" colorScheme="blue" w="100%">
          Create Group
        </Button>
      </VStack>
    </Box>
  );
};