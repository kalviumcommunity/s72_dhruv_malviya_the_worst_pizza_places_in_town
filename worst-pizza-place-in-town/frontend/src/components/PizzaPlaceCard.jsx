import React from 'react';
import { Box, Heading, Text, Badge, Flex, Button, useToast } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const PizzaPlaceCard = ({ pizzaPlace }) => {
  const { isAuthenticated, user } = useAuth();
  const toast = useToast();

  const { _id, name, address, ratings, votes, submittedBy } = pizzaPlace;
  
  const upvoteCount = votes?.upvotes?.length || 0;
  const downvoteCount = votes?.downvotes?.length || 0;
  
  const hasUpvoted = isAuthenticated && votes?.upvotes?.includes(user?.id);
  const hasDownvoted = isAuthenticated && votes?.downvotes?.includes(user?.id);

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
      await axios.post(`/api/pizza-places/${_id}/vote`, 
        { vote: voteType }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast({
        title: 'Vote recorded',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      
      // In a real app, we would update the state or refetch the data
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

  const getOverallRating = () => {
    const { cheeseToCrustRatio, toppingDisappointment, sauceQuality, overallExperience } = ratings;
    return ((cheeseToCrustRatio + toppingDisappointment + sauceQuality + overallExperience) / 4).toFixed(1);
  };

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      p={5} 
      boxShadow="md"
      bg="gray.800"
      borderColor="gray.700"
      transition="transform 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
    >
      <Heading as="h3" size="md" mb={2} color="white">
        {name}
      </Heading>
      
      <Text color="gray.400" fontSize="sm" mb={3}>
        {address}
      </Text>
      
      <Flex mb={4}>
        <Badge colorScheme="red" fontSize="0.8em" mr={2}>
          Overall: {getOverallRating()}/5
        </Badge>
        <Badge colorScheme="orange" fontSize="0.8em">
          Submitted by: {submittedBy?.username || 'Anonymous'}
        </Badge>
      </Flex>
      
      <Flex justify="space-between" align="center" mt={4}>
        <Flex>
          <Button 
            size="sm" 
            leftIcon={<FaThumbsUp />} 
            colorScheme={hasUpvoted ? "green" : "gray"}
            variant={hasUpvoted ? "solid" : "outline"}
            mr={2}
            onClick={() => handleVote('up')}
          >
            {upvoteCount}
          </Button>
          <Button 
            size="sm" 
            leftIcon={<FaThumbsDown />} 
            colorScheme={hasDownvoted ? "red" : "gray"}
            variant={hasDownvoted ? "solid" : "outline"}
            onClick={() => handleVote('down')}
          >
            {downvoteCount}
          </Button>
        </Flex>
        
        <Button 
          as={RouterLink} 
          to={`/pizza-place/${_id}`}
          size="sm" 
          colorScheme="red"
        >
          View Details
        </Button>
      </Flex>
    </Box>
  );
};

export default PizzaPlaceCard; 