import React, { useState, useEffect } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Textarea, FormErrorMessage, useToast, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text, Flex, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const SubmitPizzaPlace = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    ratings: {
      cheeseToCrustRatio: 3,
      toppingDisappointment: 3,
      sauceQuality: 3,
      overallExperience: 3
    }
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to submit a pizza place',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
    }
  }, [isAuthenticated, navigate, toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value 
    });
  };

  const handleRatingChange = (name, value) => {
    setFormData({
      ...formData,
      ratings: {
        ...formData.ratings,
        [name]: value
      }
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/pizza-places', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast({
        title: 'Submission successful',
        description: 'Your pizza place has been added',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: 'Submission failed',
        description: error.response?.data?.message || 'Could not submit pizza place',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const RatingInput = ({ name, label, value }) => (
    <FormControl mb={4}>
      <FormLabel color="gray.300">{label}</FormLabel>
      <Flex>
        <Slider
          value={value}
          min={1}
          max={5}
          step={1}
          onChange={(val) => handleRatingChange(name, val)}
          flex="1"
          mr={4}
          colorScheme="red"
        >
          <SliderTrack bg="gray.700">
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
        <NumberInput
          maxW="100px"
          value={value}
          min={1}
          max={5}
          onChange={(valueString) => handleRatingChange(name, parseInt(valueString))}
          bg="gray.700"
          borderColor="gray.600"
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
      <Text fontSize="sm" color="gray.400">
        1 = Not bad, 5 = Terrible
      </Text>
    </FormControl>
  );

  return (
    <Container maxW="container.md" py={8}>
      <Box bg="gray.800" p={8} borderRadius="lg" boxShadow="dark-lg" borderColor="gray.700" borderWidth="1px">
        <Heading as="h1" size="xl" textAlign="center" mb={6} color="white">
          Submit a Pizza Place
        </Heading>
        
        <form onSubmit={handleSubmit}>
          <FormControl isInvalid={errors.name} mb={4}>
            <FormLabel color="gray.300">Pizza Place Name</FormLabel>
            <Input 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter the name of the pizza place"
              bg="gray.700"
              borderColor="gray.600"
              _hover={{ borderColor: 'gray.500' }}
              _focus={{ borderColor: 'red.500' }}
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>
          
          <FormControl isInvalid={errors.address} mb={4}>
            <FormLabel color="gray.300">Address</FormLabel>
            <Input 
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter the address"
              bg="gray.700"
              borderColor="gray.600"
              _hover={{ borderColor: 'gray.500' }}
              _focus={{ borderColor: 'red.500' }}
            />
            <FormErrorMessage>{errors.address}</FormErrorMessage>
          </FormControl>
          
          <FormControl isInvalid={errors.description} mb={6}>
            <FormLabel color="gray.300">Description</FormLabel>
            <Textarea 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your disappointing experience"
              rows={4}
              bg="gray.700"
              borderColor="gray.600"
              _hover={{ borderColor: 'gray.500' }}
              _focus={{ borderColor: 'red.500' }}
            />
            <FormErrorMessage>{errors.description}</FormErrorMessage>
          </FormControl>
          
          <Box mb={6}>
            <Heading as="h2" size="md" mb={4} color="white">
              Ratings
            </Heading>
            
            <RatingInput 
              name="cheeseToCrustRatio" 
              label="Cheese-to-Crust Ratio" 
              value={formData.ratings.cheeseToCrustRatio} 
            />
            
            <RatingInput 
              name="toppingDisappointment" 
              label="Topping Disappointment" 
              value={formData.ratings.toppingDisappointment} 
            />
            
            <RatingInput 
              name="sauceQuality" 
              label="Sauce Quality" 
              value={formData.ratings.sauceQuality} 
            />
            
            <RatingInput 
              name="overallExperience" 
              label="Overall Experience" 
              value={formData.ratings.overallExperience} 
            />
          </Box>
          
          <Button 
            type="submit" 
            colorScheme="red" 
            size="lg" 
            width="full"
            isLoading={loading}
          >
            Submit Pizza Place
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SubmitPizzaPlace;