import React, { useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Text, Link, useToast, FormErrorMessage } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error.message || 'Invalid credentials',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="md" py={12}>
      <Box bg="gray.800" p={8} borderRadius="lg" boxShadow="dark-lg" borderColor="gray.700" borderWidth="1px">
        <Heading as="h1" size="xl" textAlign="center" mb={6} color="white">
          Login
        </Heading>
        
        <form onSubmit={handleSubmit}>
          <FormControl isInvalid={errors.email} mb={4}>
            <FormLabel color="gray.300">Email</FormLabel>
            <Input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              bg="gray.700"
              borderColor="gray.600"
              _hover={{ borderColor: 'gray.500' }}
              _focus={{ borderColor: 'red.500' }}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
          
          <FormControl isInvalid={errors.password} mb={6}>
            <FormLabel color="gray.300">Password</FormLabel>
            <Input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              bg="gray.700"
              borderColor="gray.600"
              _hover={{ borderColor: 'gray.500' }}
              _focus={{ borderColor: 'red.500' }}
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>
          
          <Button 
            type="submit" 
            colorScheme="red" 
            size="lg" 
            width="full"
            isLoading={loading}
          >
            Login
          </Button>
        </form>
        
        <Text mt={4} textAlign="center" color="gray.400">
          Don't have an account?{' '}
          <Link as={RouterLink} to="/register" color="red.400" _hover={{ color: 'red.300' }}>
            Register
          </Link>
        </Text>
      </Box>
    </Container>
  );
};

export default Login; 