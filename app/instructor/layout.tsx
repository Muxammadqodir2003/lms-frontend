"use client";

import { useEffect, useState } from "react"; // Hooklarni qo'shdik
import Navbar from "@/components/shared/navbar";
import { ChildProps } from "@/types";
import { Container } from "@chakra-ui/react/container";
import { Box } from "@chakra-ui/react/box";
import { Grid, GridItem } from "@chakra-ui/react/grid";
import InstructorSidebar from "@/components/shared/instructor-sidebar";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { Flex, Heading, Text } from "@chakra-ui/react";

const InstructorLayout = ({ children }: ChildProps) => {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();

  // 1. O'zgaruvchilarni saqlash uchun state-lar
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 2. Komponent brauzerga yuklanganda ishga tushadi
    setIsClient(true);

    // Window width ni tekshirish
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile(); // Dastlabki tekshiruv
    window.addEventListener("resize", checkMobile);

    // 3. Yo'naltirish (Redirect) mantiqi
    if (!user) {
      router.push("/auth");
    } else if (user.role !== "INSTRUCTOR") {
      router.push("/");
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, [user, router]);

  // 4. Serverda (build paytida) hech narsa render qilmaslik uchun
  if (!isClient) {
    return null;
  }

  return (
    <>
      <Navbar />
      <Box w={"full"} h={"full"}>
        <Container w={"full"} mx={"auto"} p={"2rem"}>
          {isMobile ? (
            <Flex
              w={"full"}
              h={"full"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              mt={"16"}
              textAlign="center"
            >
              <Heading size="lg">You can't access this page in mobile</Heading>
              <Text mt={2}>
                Go to the desktop or laptop to access this page
              </Text>
            </Flex>
          ) : (
            <Grid gridTemplateColumns={"repeat(5, 1fr)"} mx={"auto"}>
              <GridItem
                display={{
                  base: "none",
                  lg: "block",
                }}
                colSpan={{ base: 0, lg: 1 }}
              >
                <InstructorSidebar />
              </GridItem>
              <GridItem colSpan={{ base: 5, lg: 4 }}>{children}</GridItem>
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
};

export default InstructorLayout;
