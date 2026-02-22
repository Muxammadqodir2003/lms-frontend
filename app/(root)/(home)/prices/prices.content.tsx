"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  List,
  Icon,
  Button,
  Badge,
  VStack,
  HStack,
  Separator,
} from "@chakra-ui/react";
import { FaCheckCircle, FaStar } from "react-icons/fa";

// TypeScript Interfeyslari
interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}

const plans: PricingPlan[] = [
  {
    name: "Boshlang'ich",
    price: "0",
    description: "Sohaga yangi kirib kelganlar uchun bepul darslar.",
    features: [
      "5 ta bepul kurs",
      "Jamiyatga kirish",
      "Mobil ilova",
      "Sertifikat (yo'q)",
    ],
    buttonText: "Bepul boshlash",
  },
  {
    name: "Professional",
    price: "29",
    description: "Karyera qurishni xohlovchilar uchun eng yaxshi tanlov.",
    features: [
      "Barcha kurslar",
      "Mentorlik yordami",
      "Amaliy loyihalar",
      "Xalqaro sertifikat",
      "Offline yuklab olish",
    ],
    isPopular: true,
    buttonText: "Hozir boshlang",
  },
  {
    name: "Enterprise",
    price: "99",
    description: "Jamoalar va tashkilotlar uchun maxsus tarif.",
    features: [
      "Cheksiz foydalanuvchilar",
      "Maxsus LMS paneli",
      "Shaxsiy kurator",
      "Haftalik hisobotlar",
      "24/7 VIP yordam",
    ],
    buttonText: "Biz bilan bog'laning",
  },
];

const PricesContent = () => {
  return (
    <Box as="main" bg="gray.950" color="white" py={{ base: 16, md: 32 }}>
      <Container maxW="6xl">
        {/* Header Section */}
        <VStack textAlign="center" mb={20}>
          <Badge
            variant="outline"
            colorPalette="blue"
            px={3}
            py={1}
            borderRadius="full"
          >
            Narxlar va rejalar
          </Badge>
          <Heading as="h1" size={{ base: "3xl", md: "5xl" }} fontWeight="black">
            O'zingizga mos{" "}
            <Text as="span" color="blue.400">
              tarifni tanlang
            </Text>
          </Heading>
          <Text fontSize="xl" color="gray.400" maxW="2xl">
            Hech qanday yashirin to'lovlarsiz. Istalgan vaqtda tarifni
            o'zgartirishingiz yoki bekor qilishingiz mumkin.
          </Text>
        </VStack>

        {/* Pricing Cards Grid */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} alignItems="stretch">
          {plans.map((plan, index) => (
            <Stack
              key={index}
              bg={plan.isPopular ? "gray.900" : "transparent"}
              p={8}
              borderRadius="3xl"
              border="1px solid"
              borderColor={plan.isPopular ? "blue.500" : "gray.800"}
              position="relative"
              boxShadow={
                plan.isPopular
                  ? "0 0 40px -10px rgba(66, 153, 225, 0.3)"
                  : "none"
              }
              _hover={{ transform: "scale(1.02)", transition: "0.3s" }}
            >
              {plan.isPopular && (
                <Badge
                  position="absolute"
                  top="-4"
                  left="50%"
                  transform="translateX(-50%)"
                  bg="blue.500"
                  color="white"
                  px={4}
                  py={1}
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Icon as={FaStar} /> Ommabop
                </Badge>
              )}

              <VStack align="start">
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  color={plan.isPopular ? "blue.400" : "white"}
                >
                  {plan.name}
                </Text>
                <HStack align="end">
                  <Text fontSize="4xl" fontWeight="black">
                    ${plan.price}
                  </Text>
                  <Text color="gray.500" mb={1}>
                    /oylik
                  </Text>
                </HStack>
                <Text color="gray.400" fontSize="sm">
                  {plan.description}
                </Text>
              </VStack>

              <Separator borderColor="gray.800" />

              <List.Root variant="plain" flex="1">
                {plan.features.map((feature, i) => (
                  <List.Item key={i} display="flex" alignItems="center" gap={3}>
                    <Icon
                      as={FaCheckCircle}
                      color={plan.isPopular ? "blue.400" : "gray.600"}
                    />
                    <Text fontSize="sm" color="gray.300">
                      {feature}
                    </Text>
                  </List.Item>
                ))}
              </List.Root>

              <Button
                colorPalette={plan.isPopular ? "blue" : "gray"}
                variant={plan.isPopular ? "solid" : "outline"}
                size="lg"
                borderRadius="xl"
                fontWeight="bold"
                w="full"
              >
                {plan.buttonText}
              </Button>
            </Stack>
          ))}
        </SimpleGrid>

        {/* FAQ Teaser */}
        <Box textAlign="center" mt={20}>
          <Text color="gray.500">
            Katta jamoangiz bormi?{" "}
            <Text
              as="span"
              color="blue.400"
              cursor="pointer"
              textDecoration="underline"
            >
              Biz bilan bog'laning
            </Text>{" "}
            va maxsus chegirmaga ega bo'ling.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default PricesContent;
