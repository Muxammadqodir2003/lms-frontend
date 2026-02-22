"use client";

import { useEffect, useState } from "react"; // 1. Hooklarni qo'shdik
import Navbar from "@/components/shared/navbar";
import { ChildProps } from "@/types";
import { Container } from "@chakra-ui/react/container";
import { Box } from "@chakra-ui/react/box";
import { Grid, GridItem } from "@chakra-ui/react/grid";
import AdminSidebar from "@/components/shared/admin-sidebar";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { Flex, Heading, Text } from "@chakra-ui/react";

const AdminLayout = ({ children }: ChildProps) => {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();

  // 2. Window width va Client-side ekanini tekshirish uchun state
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Komponent brauzerda yuklanganini bildiradi

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Dastlabki tekshiruv
    window.addEventListener("resize", handleResize);

    // 3. Redirect mantiqini useEffect ichiga olamiz
    if (!user) {
      router.push("/auth");
    } else if (user.role !== "ADMIN") {
      router.push("/");
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [user, router]);

  // Serverda render bo'layotgan bo'lsa, hech narsa ko'rsatmaymiz (xatolikni oldini oladi)
  if (!isClient) return null;

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
            >
              <Heading textAlign="center">
                You can't access this page in mobile
              </Heading>
              <Text textAlign="center">
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
                <AdminSidebar />
              </GridItem>
              <GridItem colSpan={{ base: 5, lg: 4 }}>{children}</GridItem>
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
};

export default AdminLayout;
