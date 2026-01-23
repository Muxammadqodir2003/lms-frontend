"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Loader,
  Separator,
  Text,
} from "@chakra-ui/react";
import { useGetUnpaidCoursesQuery } from "@/services/user/userApi";
import CartItem from "./cart-item";
import { usePayCoursesMutation } from "@/services/user/userApi";
import { toaster } from "@/components/ui/toaster";

const CartView = () => {
  const { data, isLoading, isError } = useGetUnpaidCoursesQuery();
  const [payCourses, { isLoading: isPayLoading }] = usePayCoursesMutation();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  const handlePayCourses = async () => {
    try {
      await payCourses().unwrap();
      toaster.success({
        title: "Success",
        description: "Courses paid successfully",
      });
    } catch (error: any) {
      toaster.error({ title: "Error", description: error?.data?.message });
    }
  };

  return (
    <Box w={"full"}>
      <Text fontSize={"2xl"}>Unpaid Courses</Text>
      <Separator />
      <Flex
        w={"full"}
        mt={"2"}
        flexDirection={{ base: "column", md: "column", lg: "row", xl: "row" }}
      >
        <Flex w={{ base: "full", md: "full", lg: "75%", xl: "75%" }} p={"2"}>
          {data?.length === 0 ? (
            <Text>No courses in cart</Text>
          ) : (
            data?.map((enrollment) => (
              <CartItem key={enrollment.id} enrollment={enrollment} />
            ))
          )}
        </Flex>

        <Flex
          flexDirection={"column"}
          rounded={"md"}
          border={"1px solid #333"}
          w={{ base: "full", md: "full", lg: "25%", xl: "25%" }}
          p={"2"}
          mt={{ base: "2", md: "2", lg: "0", xl: "0" }}
        >
          <Text>Total: </Text>
          <Text fontSize={"3xl"}>
            {data
              ?.reduce((acc, enrollment) => acc + enrollment.course.price, 0)
              .toLocaleString("en-US", {
                currency: "USD",
                style: "currency",
              })}
          </Text>
          <Button
            onClick={handlePayCourses}
            disabled={isPayLoading || data?.length === 0}
          >
            Checkout {isPayLoading && <Loader />}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CartView;
