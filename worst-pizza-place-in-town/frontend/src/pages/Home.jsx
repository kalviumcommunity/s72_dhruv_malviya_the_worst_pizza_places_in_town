import React, { useState, useEffect } from 'react';
import { Box, Container, Heading, Text, SimpleGrid, Flex, Input, InputGroup, InputLeftElement, Spinner } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import axios from 'axios';
import PizzaPlaceCard from '../components/PizzaPlaceCard';

const Home = () => {
  const [pizzaPlaces, setPizzaPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPizzaPlaces = async () => {
      try {
        const response = await axios.get('/api/pizza-places');
        setPizzaPlaces(response.data);
        setFilteredPlaces(response.data);
        setLoading(false); 
      } catch (error) {
        setError('Failed to fetch pizza places');
        setLoading(false);
      }
    };

    fetchPizzaPlaces();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPlaces(pizzaPlaces);
    } else {
      const filtered = pizzaPlaces.filter(place => 
        place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPlaces(filtered);
    }
  }, [searchTerm, pizzaPlaces]);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="50vh">
        <Spinner size="xl" color="red.500" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text color="red.500">{error}</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Box textAlign="center" mb={8}>
        <Heading as="h1" size="2xl" mb={4} color="white">
          The Worst Pizza Places in Town 🍕
        </Heading>
        <Text fontSize="xl" color="gray.400">
          Discover and share your disappointing pizza experiences!
        </Text>
      </Box>

      <Box mb={8}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.500" />
          </InputLeftElement>
          <Input 
            placeholder="Search pizza places..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="lg"
            borderRadius="full"
            bg="gray.800"
            borderColor="gray.700"
            _hover={{ borderColor: 'gray.600' }}
            _focus={{ borderColor: 'red.500', boxShadow: '0 0 0 1px var(--chakra-colors-red-500)' }}
          />
        </InputGroup>
      </Box>

      {filteredPlaces.length === 0 ? (
        <Text textAlign="center" fontSize="lg" color="gray.400">
          No pizza places found. Be the first to add one!
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {filteredPlaces.map(place => (
            <PizzaPlaceCard key={place._id} pizzaPlace={place} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default Home; 