import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useContributionStore } from '../../store/contributionStore';
import { useAuthStore } from '../../store/authStore';

interface MakeContributionFormData {
  amount: number;
  groupId: string;
}

export const MakeContributionForm = ({ groupId }: { groupId: string }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<MakeContributionFormData>();
  const makeContribution = useContributionStore(state => state.makeContribution);
  const user = useAuthStore(state => state.user);
  const toast = useToast();

  const onSubmit = async (data: MakeContributionFormData) => {
    if (!user) return;

    try {
      await makeContribution({
        groupId,
        userId: user.uid,
        amount: data.amount,
        date: new Date(),
        status: 'pending'
      });
      
      toast({
        title: 'Contribution submitted successfully',
        status: 'success',
        duration: 3000,
      });
      reset();
    } catch (error) {
      toast({
        title: 'Error making contribution',
        description: (error as Error).message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} w="100%" maxW="400px">
      <VStack spacing={4}>
        <FormControl isRequired isInvalid={!!errors.amount}>
          <FormLabel>Contribution Amount</FormLabel>
          <Input
            type="number"
            step="0.01"
            {...register('amount', { 
              required: 'Amount is required',
              min: { value: 0, message: 'Amount must be positive' }
            })}
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" w="100%">
          Submit Contribution
        </Button>
      </VStack>
    </Box>
  );
};