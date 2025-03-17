import React, { useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Text, Link, useToast, FormErrorMessage } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { register } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const validateForm = () => {
    const newErrors = {};
    
    if (!username) newErrors.username = 'Username is required';
    else if (username.length < 3) newErrors.username = 'Username must be at least 3 characters';
    
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      await register(username, email, password);
      toast({
        title: 'Registration successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error.message || 'Could not create account',
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
          Register
        </Heading>
        
        <form onSubmit={handleSubmit}>
          <FormControl isInvalid={errors.username} mb={4}>
            <FormLabel color="gray.300">Username</FormLabel>
            <Input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              bg="gray.700"
              borderColor="gray.600"
              _hover={{ borderColor: 'gray.500' }}
              _focus={{ borderColor: 'red.500' }}
            />
            <FormErrorMessage>{errors.username}</FormErrorMessage>
          </FormControl>
          
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
          
          <FormControl isInvalid={errors.password} mb={4}>
            <FormLabel color="gray.300">Password</FormLabel>
            <Input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              bg="gray.700"
              borderColor="gray.600"
              _hover={{ borderColor: 'gray.500' }}
              _focus={{ borderColor: 'red.500' }}
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>
          
          <FormControl isInvalid={errors.confirmPassword} mb={6}>
            <FormLabel color="gray.300">Confirm Password</FormLabel>
            <Input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              bg="gray.700"
              borderColor="gray.600"
              _hover={{ borderColor: 'gray.500' }}
              _focus={{ borderColor: 'red.500' }}
            />
            <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
          </FormControl>
          
          <Button 
            type="submit" 
            colorScheme="red" 
            size="lg" 
            width="full"
            isLoading={loading}
          >
            Register
          </Button>
        </form>
        
        <Text mt={4} textAlign="center" color="gray.400">
          Already have an account?{' '}
          <Link as={RouterLink} to="/login" color="red.400" _hover={{ color: 'red.300' }}>
            Login
          </Link>
        </Text>
      </Box>
    </Container>
  );
};

export default Register; 