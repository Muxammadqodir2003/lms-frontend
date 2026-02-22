"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Image,
  Badge,
  Icon,
  VStack,
  HStack,
  Circle,
} from "@chakra-ui/react";
import {
  FaGraduationCap,
  FaUsers,
  FaGlobe,
  FaRocket,
  FaCheckCircle,
} from "react-icons/fa";

interface StatItem {
  icon: any;
  label: string;
  value: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const AboutContent = () => {
  const stats: StatItem[] = [
    { icon: FaGraduationCap, label: "Talabalar", value: "50,000+" },
    { icon: FaUsers, label: "Mentorlar", value: "200+" },
    { icon: FaGlobe, label: "Kurslar", value: "1,200+" },
    { icon: FaRocket, label: "Muvaffaqiyat", value: "95%" },
  ];

  const team: TeamMember[] = [
    {
      name: "Asilbek Olimov",
      role: "Asoschi & CEO",
      image: "https://bit.ly/dan-abramov",
    },
    {
      name: "Malika Rayhona",
      role: "Bosh Mentor",
      image: "https://bit.ly/prosper-baba",
    },
    {
      name: "Javohir Toshkentov",
      role: "Texnik Direktor",
      image: "https://bit.ly/code-beast",
    },
  ];

  return (
    <Box as="main" bg="gray.950" color="white" py={{ base: 16, md: 32 }}>
      <Container maxW="6xl">
        <VStack textAlign="center" mb={24}>
          <Badge
            variant="solid"
            bg="blue.500"
            color="white"
            px={4}
            py={1}
            borderRadius="full"
          >
            Platformamiz haqida
          </Badge>
          <Heading as="h1" size={{ base: "3xl", md: "5xl" }} fontWeight="black">
            Bilim olishning{" "}
            <Text as="span" color="blue.400">
              yangi davri
            </Text>
          </Heading>
          <Text fontSize="xl" color="gray.400" maxW="3xl">
            Bizning LMS platformamiz orqali professional ta'limni davom
            ettiring.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={8} mb={28}>
          {stats.map((stat, index) => (
            <Stack
              key={index}
              bg="gray.900"
              p={8}
              borderRadius="2xl"
              align="center"
              border="1px solid"
              borderColor="gray.800"
              _hover={{
                borderColor: "blue.500",
                transform: "translateY(-8px)",
              }}
              transition="all 0.4s"
            >
              <Circle size="60px" bg="blue.900" mb={4}>
                <Icon as={stat.icon} fontSize="2xl" color="blue.400" />
              </Circle>
              <Heading size="2xl" fontWeight="bold">
                {stat.value}
              </Heading>
              <Text color="gray.500" fontSize="sm" textTransform="uppercase">
                {stat.label}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>

        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={20}
          alignItems="center"
          mb={28}
        >
          <Box position="relative">
            <Box
              position="absolute"
              inset="-2"
              bgGradient="linear(to-r, blue.600, purple.600)"
              borderRadius="3xl"
              filter="blur(15px)"
              opacity="0.3"
            />
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
              alt="Team"
              borderRadius="2xl"
              position="relative"
            />
          </Box>
          <Stack>
            <Heading as="h2" size="2xl">
              Bizning qadriyatlarimiz
            </Heading>
            <Text color="gray.400" fontSize="lg">
              Har bir darslik talabaning real ko'nikmalariga qaratilgan.
            </Text>
            <VStack align="start">
              {["Premium darslar", "Mentorlik", "Karyera"].map((item) => (
                <HStack key={item}>
                  <Icon as={FaCheckCircle} color="blue.400" />
                  <Text fontSize="lg">{item}</Text>
                </HStack>
              ))}
            </VStack>
          </Stack>
        </SimpleGrid>

        <VStack>
          <Heading as="h2" size="2xl" mb={8}>
            Mutaxassislarimiz
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={12} w="full">
            {team.map((member, index) => (
              <VStack key={index}>
                <Box
                  p={1}
                  borderRadius="full"
                  bgGradient="linear(to-tr, blue.500, transparent)"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    boxSize="180px"
                    borderRadius="full"
                    objectFit="cover"
                  />
                </Box>
                <Text fontWeight="bold" fontSize="2xl">
                  {member.name}
                </Text>
                <Text color="blue.400">{member.role}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutContent;
