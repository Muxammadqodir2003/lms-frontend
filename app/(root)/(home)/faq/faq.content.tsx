"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@chakra-ui/react";
import { FiHelpCircle } from "react-icons/fi";

const faqs = [
  {
    question: "What is this LMS platform about?",
    answer:
      "This Learning Management System is designed to provide high-quality, accessible education to students worldwide. We offer a variety of courses ranging from programming to personal development, taught by industry experts.",
  },
  {
    question: "How do I enroll in a course?",
    answer:
      "To enroll in a course, simply create an account, browse our course catalog, and click the 'Enroll' button on the course you wish to take. If it is a paid course, you will be prompted to complete the payment process.",
  },
  {
    question: "Are there any prerequisites for the courses?",
    answer:
      "Prerequisites vary by course. Beginner courses typically require no prior knowledge, while advanced courses may require you to have completed introductory modules. Check the specific course details page for more information.",
  },
  {
    question: "Can I access the courses on my mobile device?",
    answer:
      "Yes! Our platform is fully responsive and optimized for mobile devices. You can learn on the go using your smartphone or tablet through any modern web browser.",
  },
  {
    question: "Do I receive a certificate upon completion?",
    answer:
      "Yes, for most of our comprehensive courses, you will receive a verifiable digital certificate of completion that you can share on your LinkedIn profile or resume.",
  },
  {
    question: "What forms of payment do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and regional payment methods depending on your location. Our payment processing is secure and encrypted.",
  },
];

const FaqContent = () => {
  return (
    <Box
      py={{ base: 16, md: 24 }}
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
      minH="100vh"
    >
      <VStack gap={4} textAlign="center" mb={16} px={4}>
        <Box
          display="inline-flex"
          alignItems="center"
          gap={2}
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
        >
          <Box as={FiHelpCircle} boxSize={4} />
          FAQs
        </Box>
        <Heading
          as="h1"
          fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
          fontWeight="extrabold"
          letterSpacing="tight"
          color="gray.900"
          _dark={{ color: "white" }}
        >
          Frequently Asked{" "}
          <Box as="span" color="blue.500">
            Questions
          </Box>
        </Heading>
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          color="gray.600"
          _dark={{ color: "gray.400" }}
          maxW="2xl"
          mx="auto"
        >
          Find answers to common questions about our platform, courses, and
          billing. Can't find what you're looking for? Contact our support team.
        </Text>
      </VStack>

      <Container maxW="4xl" mx="auto" px={4}>
        <Box
          bg="white"
          _dark={{ bg: "gray.800", borderColor: "gray.700" }}
          boxShadow="xl"
          borderRadius="3xl"
          border="1px solid"
          borderColor="gray.100"
          p={{ base: 6, md: 10 }}
        >
          <AccordionRoot collapsible multiple={false} variant="plain">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                borderBottom="1px solid"
                borderColor="gray.100"
                _dark={{ borderColor: "gray.700" }}
                _last={{ borderBottom: "none" }}
                py={2}
              >
                <AccordionItemTrigger
                  fontSize="lg"
                  fontWeight="semibold"
                  color="gray.800"
                  _dark={{ color: "gray.100" }}
                  _expanded={{
                    color: "blue.500",
                    _dark: { color: "blue.400" },
                  }}
                  _hover={{ color: "blue.600", _dark: { color: "blue.300" } }}
                >
                  {faq.question}
                </AccordionItemTrigger>
                <AccordionItemContent
                  color="gray.600"
                  _dark={{ color: "gray.400" }}
                  pb={4}
                  pt={2}
                  lineHeight="tall"
                  fontSize="md"
                >
                  {faq.answer}
                </AccordionItemContent>
              </AccordionItem>
            ))}
          </AccordionRoot>
        </Box>
      </Container>
    </Box>
  );
};

export default FaqContent;
