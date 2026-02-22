"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Metadata } from "next";
import { FiUsers, FiBookOpen, FiAward, FiGlobe } from "react-icons/fi";

const stats = [
  { label: "Active Students", value: "50,000+", icon: FiUsers },
  { label: "Expert Instructors", value: "1,200+", icon: FiAward },
  { label: "Premium Courses", value: "3,500+", icon: FiBookOpen },
  { label: "Countries Reached", value: "120+", icon: FiGlobe },
];

const ContactContent = () => {
  return (
    <Box
      minH="100vh"
      py={{ base: 16, md: 24 }}
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
    >
      <Container maxW="7xl" mx="auto" px={{ base: 4, lg: 8 }}>
        {/* Header Section */}
        <VStack textAlign="center" mb={20} gap={6}>
          <Box
            display="inline-block"
            px={4}
            py={1.5}
            bg="blue.100"
            color="blue.700"
            _dark={{ bg: "blue.900", color: "blue.200" }}
            borderRadius="full"
            fontWeight="bold"
            fontSize="sm"
            letterSpacing="wide"
            textTransform="uppercase"
            mb={2}
          >
            About Us
          </Box>
          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "5xl", lg: "7xl" }}
            fontWeight="extrabold"
            letterSpacing="tight"
            color="gray.900"
            _dark={{ color: "white" }}
          >
            Empowering the World <br />
            <Box as="span" color="blue.500">
              Through Knowledge
            </Box>
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="gray.600"
            _dark={{ color: "gray.400" }}
            maxW="3xl"
            mx="auto"
            mt={4}
            lineHeight="tall"
          >
            We are a leading online learning platform dedicated to providing
            high-quality, accessible, and affordable education. Our mission is
            to democratize education and help individuals unlock their true
            potential.
          </Text>
        </VStack>

        {/* Vision & Mission Section */}
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={8}
          mb={24}
        >
          <GridItem>
            <Box
              p={10}
              bg="white"
              _dark={{ bg: "gray.800", borderColor: "gray.700" }}
              boxShadow="2xl"
              borderRadius="3xl"
              border="1px solid"
              borderColor="gray.100"
              height="full"
              transition="all 0.3s"
              _hover={{ transform: "translateY(-8px)" }}
            >
              <Flex
                w={16}
                h={16}
                align="center"
                justify="center"
                bg="blue.500"
                color="white"
                rounded="2xl"
                mb={6}
                boxShadow="lg"
              >
                <FiGlobe size={28} />
              </Flex>
              <Heading
                as="h3"
                size="xl"
                mb={4}
                color="gray.900"
                _dark={{ color: "white" }}
              >
                Our Vision
              </Heading>
              <Text
                color="gray.600"
                _dark={{ color: "gray.400" }}
                fontSize="lg"
                lineHeight="relaxed"
              >
                To create a world where anyone, anywhere has the power to
                transform their life through learning. We envision a future
                where skills are the universal currency, and our platform is the
                central hub for acquiring them.
              </Text>
            </Box>
          </GridItem>

          <GridItem>
            <Box
              p={10}
              bgGradient="to-br"
              gradientFrom="blue.600"
              gradientTo="purple.600"
              color="white"
              boxShadow="2xl"
              borderRadius="3xl"
              height="full"
              transition="all 0.3s"
              _hover={{ transform: "translateY(-8px)" }}
            >
              <Flex
                w={16}
                h={16}
                align="center"
                justify="center"
                bg="whiteAlpha.300"
                color="white"
                rounded="2xl"
                mb={6}
                backdropFilter="blur(10px)"
              >
                <FiAward size={28} />
              </Flex>
              <Heading as="h3" size="xl" mb={4}>
                Our Mission
              </Heading>
              <Text fontSize="lg" lineHeight="relaxed" opacity={0.9}>
                To provide accessible, affordable, and highly engaging online
                education. By partnering with world-class instructors and
                leveraging modern technology, we deliver learning experiences
                that produce real-world results.
              </Text>
            </Box>
          </GridItem>
        </Grid>

        {/* Stats Section */}
        <Box mb={20}>
          <VStack mb={14} textAlign="center">
            <Heading
              as="h2"
              size="2xl"
              color="gray.900"
              _dark={{ color: "white" }}
              mb={4}
            >
              Our Impact in Numbers
            </Heading>
            <Text
              color="gray.500"
              _dark={{ color: "gray.400" }}
              fontSize="xl"
              maxW="2xl"
              mx="auto"
            >
              We take pride in our rapidly growing community of lifelong
              learners and educators around the globe.
            </Text>
          </VStack>

          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={6}
          >
            {stats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <GridItem key={idx}>
                  <VStack
                    p={8}
                    bg="white"
                    _dark={{ bg: "gray.800", borderColor: "gray.700" }}
                    borderRadius="2xl"
                    boxShadow="sm"
                    border="1px solid"
                    borderColor="gray.100"
                    transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                    _hover={{
                      transform: "translateY(-5px)",
                      boxShadow: "xl",
                      borderColor: "blue.500",
                      _dark: { borderColor: "blue.400" },
                    }}
                  >
                    <Flex
                      w={16}
                      h={16}
                      align="center"
                      justify="center"
                      bg="blue.50"
                      _dark={{ bg: "gray.700" }}
                      color="blue.500"
                      rounded="full"
                      mb={5}
                    >
                      <IconComp size={28} />
                    </Flex>
                    <Heading
                      as="h3"
                      size="2xl"
                      color="gray.900"
                      _dark={{ color: "white" }}
                      fontWeight="extrabold"
                    >
                      {stat.value}
                    </Heading>
                    <Text
                      fontSize="lg"
                      color="gray.500"
                      _dark={{ color: "gray.400" }}
                      fontWeight="medium"
                      mt={2}
                    >
                      {stat.label}
                    </Text>
                  </VStack>
                </GridItem>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactContent;
