import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useAuthStore } from '../../store/authStore';

interface SignInFormData {
  email: string;
  password: string;
}

export const SignInForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();
  const signIn = useAuthStore(state => state.signIn);
  const toast = useToast();

  const onSubmit = async (data: SignInFormData) => {
    try {
      await signIn(data.email, data.password);
      toast({
        title: 'Welcome back!',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error signing in',
        description: (error as Error).message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} w="100%" maxW="400px">
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <Text color="red.500">{errors.email.message}</Text>}
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <Text color="red.500">{errors.password.message}</Text>}
        </FormControl>

        <Button type="submit" colorScheme="blue" w="100%">
          Sign In
        </Button>
      </VStack>
    </Box>
  );
};