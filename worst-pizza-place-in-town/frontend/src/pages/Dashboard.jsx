import React, { useState, useEffect } from 'react';
import { Box, Container, Heading, Text, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid, Spinner, Flex, Alert, AlertIcon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import PizzaPlaceCard from '../components/PizzaPlaceCard';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const [submissions, setSubmissions] = useState([]);
  const [votedPlaces, setVotedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch user's submissions
        const submissionsResponse = await axios.get('/api/pizza-places/user/submissions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Fetch places the user has voted on
        const votedResponse = await axios.get('/api/pizza-places/user/voted', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setSubmissions(submissionsResponse.data || []);
        setVotedPlaces(votedResponse.data || []);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="50vh">
        <Spinner size="xl" color="red.500" />
      </Flex>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={8}>
        <Heading as="h1" size="xl" mb={2} color="white">
          Dashboard
        </Heading>
        <Text color="gray.400">
          Welcome back, {user?.username || 'User'}!
        </Text>
      </Box>

      <Tabs colorScheme="red" variant="enclosed">
        <TabList>
          <Tab color="gray.300" _selected={{ color: 'white', bg: 'gray.800', borderColor: 'gray.700' }}>My Submissions</Tab>
          <Tab color="gray.300" _selected={{ color: 'white', bg: 'gray.800', borderColor: 'gray.700' }}>Places I've Voted On</Tab>
        </TabList>

        <TabPanels bg="gray.800" borderWidth="1px" borderColor="gray.700" borderRadius="md" mt="-1px">
          <TabPanel>
            {submissions.length === 0 ? (
              <Alert status="info" bg="gray.700" color="white">
                <AlertIcon />
                You haven't submitted any pizza places yet.
              </Alert>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {submissions.map(place => (
                  <PizzaPlaceCard key={place._id} pizzaPlace={place} />
                ))}
              </SimpleGrid>
            )}
          </TabPanel>

          <TabPanel>
            {votedPlaces.length === 0 ? (
              <Alert status="info" bg="gray.700" color="white">
                <AlertIcon />
                You haven't voted on any pizza places yet.
              </Alert>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {votedPlaces.map(place => (
                  <PizzaPlaceCard key={place._id} pizzaPlace={place} />
                ))}
              </SimpleGrid>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Dashboard; 