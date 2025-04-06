import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Heading, Text, Flex, Badge, Spinner, Button, Divider, Grid, GridItem, Progress, useToast } from '@chakra-ui/react';
import { FaThumbsUp, FaThumbsDown, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const PizzaPlaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const toast = useToast();
  
  const [pizzaPlace, setPizzaPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPizzaPlace = async () => {
      try {
        const response = await axios.get(`/api/pizza-places/${id}`);
        setPizzaPlace(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch pizza place details');
        setLoading(false);
      }
    };

    fetchPizzaPlace();
  }, [id]);

  const handleVote = async (voteType) => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to vote',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/pizza-places/${id}/vote`, 
        { vote: voteType }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setPizzaPlace(response.data);
      
      toast({
        title: 'Vote recorded',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to record vote',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" height="50vh">
        <Spinner size="xl" color="red.500" />
      </Flex>
    );
  }

  if (error || !pizzaPlace) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text color="red.500">{error || 'Pizza place not found'}</Text>
        <Button leftIcon={<FaArrowLeft />} onClick={() => navigate('/')} mt={4} colorScheme="red">
          Back to Home
        </Button>
      </Container>
    );
  }

  const { name, address, description, ratings, votes, submittedBy, createdAt } = pizzaPlace;
  
  const upvoteCount = votes?.upvotes?.length || 0;
  const downvoteCount = votes?.downvotes?.length || 0;
  
  const hasUpvoted = isAuthenticated && votes?.upvotes?.includes(user?.id);
  const hasDownvoted = isAuthenticated && votes?.downvotes?.includes(user?.id);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Button leftIcon={<FaArrowLeft />} onClick={() => navigate('/')} mb={6} variant="outline" colorScheme="red">
        Back to Home
      </Button>
      
      <Box bg="gray.800" p={6} borderRadius="lg" boxShadow="dark-lg" borderColor="gray.700" borderWidth="1px">
        <Heading as="h1" size="xl" mb={2} color="white">
          {name}
        </Heading>
        
        <Text color="gray.400" fontSize="md" mb={4}>
          {address}
        </Text>
        
        <Flex wrap="wrap" gap={2} mb={6}>
          <Badge colorScheme="purple">
            Submitted by: {submittedBy?.username || 'Anonymous'}
          </Badge>
          <Badge colorScheme="blue">
            Added on: {formatDate(createdAt)}
          </Badge>
        </Flex>
        
        <Divider mb={6} borderColor="gray.700" />
        
        <Box mb={8}>
          <Heading as="h2" size="md" mb={4} color="white">
            Description
          </Heading>
          <Text color="gray.300">{description}</Text>
        </Box>
        
        <Box mb={8}>
          <Heading as="h2" size="md" mb={4} color="white">
            Ratings
          </Heading>
          
          <Grid templateColumns="1fr 3fr" gap={4} alignItems="center">
            <GridItem>
              <Text fontWeight="bold" color="gray.300">Cheese-to-Crust Ratio:</Text>
            </GridItem>
            <GridItem>
              <Flex align="center">
                <Progress 
                  value={ratings.cheeseToCrustRatio * 20} 
                  colorScheme="red" 
                  size="md" 
                  borderRadius="md" 
                  width="100%" 
                  mr={2}
                  bg="gray.700"
                />
                <Text fontWeight="bold" color="white">{ratings.cheeseToCrustRatio}/5</Text>
              </Flex>
            </GridItem>
            
            <GridItem>
              <Text fontWeight="bold" color="gray.300">Topping Disappointment:</Text>
            </GridItem>
            <GridItem>
              <Flex align="center">
                <Progress 
                  value={ratings.toppingDisappointment * 20} 
                  colorScheme="orange" 
                  size="md" 
                  borderRadius="md" 
                  width="100%" 
                  mr={2}
                  bg="gray.700"
                />
                <Text fontWeight="bold" color="white">{ratings.toppingDisappointment}/5</Text>
              </Flex>
            </GridItem>
            
            <GridItem>
              <Text fontWeight="bold" color="gray.300">Sauce Quality:</Text>
            </GridItem>
            <GridItem>
              <Flex align="center">
                <Progress 
                  value={ratings.sauceQuality * 20} 
                  colorScheme="yellow" 
                  size="md" 
                  borderRadius="md" 
                  width="100%" 
                  mr={2}
                  bg="gray.700"
                />
                <Text fontWeight="bold" color="white">{ratings.sauceQuality}/5</Text>
              </Flex>
            </GridItem>
            
            <GridItem>
              <Text fontWeight="bold" color="gray.300">Overall Experience:</Text>
            </GridItem>
            <GridItem>
              <Flex align="center">
                <Progress 
                  value={ratings.overallExperience * 20} 
                  colorScheme="green" 
                  size="md" 
                  borderRadius="md" 
                  width="100%" 
                  mr={2}
                  bg="gray.700"
                />
                <Text fontWeight="bold" color="white">{ratings.overallExperience}/5</Text>
              </Flex>
            </GridItem>
          </Grid>
        </Box>
        
        <Divider mb={6} borderColor="gray.700" />
        
        <Flex justify="space-between" align="center">
          <Flex>
            <Button 
              leftIcon={<FaThumbsUp />} 
              colorScheme={hasUpvoted ? "green" : "gray"}
              variant={hasUpvoted ? "solid" : "outline"}
              mr={2}
              onClick={() => handleVote('up')}
            >
              Upvote ({upvoteCount})
            </Button>
            <Button 
              leftIcon={<FaThumbsDown />} 
              colorScheme={hasDownvoted ? "red" : "gray"}
              variant={hasDownvoted ? "solid" : "outline"}
              onClick={() => handleVote('down')}
            >
              Downvote ({downvoteCount})
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};

export default PizzaPlaceDetails; 