import React from 'react';
import { Box, Flex, Link, Button, Heading } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box bg="gray.800" px={4} py={3} borderBottom="1px" borderColor="gray.700">
      <Flex maxW="container.xl" mx="auto" align="center" justify="space-between">
        <Heading as={RouterLink} to="/" size="md" color="red.400">
          🍕 Worst Pizza Places
        </Heading>
        
        <Flex gap={4} align="center">
          <Link as={RouterLink} to="/" color="white" _hover={{ color: 'red.300' }}>
            Home
          </Link>
          <Link as={RouterLink} to="/submit" color="white" _hover={{ color: 'red.300' }}>
            Submit
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link as={RouterLink} to="/dashboard" color="white" _hover={{ color: 'red.300' }}>
                Dashboard
              </Link>
              <Button onClick={handleLogout} colorScheme="red" size="sm" variant="outline">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link as={RouterLink} to="/login" color="white" _hover={{ color: 'red.300' }}>
                Login
              </Link>
              <Link as={RouterLink} to="/register">
                <Button colorScheme="red" size="sm">
                  Register
                </Button>
              </Link>
            </>
          )}
        </Flex>
      </Flex>
    </Box> 
  );
};

export default Navbar; 