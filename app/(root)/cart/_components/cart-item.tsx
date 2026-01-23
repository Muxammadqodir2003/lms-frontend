import { IEnrollment } from "@/types";
import { Flex } from "@chakra-ui/react/flex";
import Image from "next/image";
import { Text } from "@chakra-ui/react/text";
import { Button } from "@chakra-ui/react/button";
import { CgRemove } from "react-icons/cg";
import { Badge } from "@chakra-ui/react/badge";
import { useDeleteEnrollmentMutation } from "@/services/user/userApi";
import { toaster } from "@/components/ui/toaster";
import { Loader } from "@chakra-ui/react";

interface CartItemProps {
  enrollment: IEnrollment;
}

const CartItem = ({ enrollment }: CartItemProps) => {
  const [deleteEnrollment, { isLoading }] = useDeleteEnrollmentMutation();

  const handleDeleteEnrollment = async () => {
    try {
      await deleteEnrollment(enrollment.course.id).unwrap();
      toaster.success({
        title: "Success",
        description: "Enrollment deleted successfully",
      });
    } catch (error) {
      toaster.error({
        title: "Error",
        description: error?.data?.message,
      });
    }
  };
  return (
    <Flex w={"full"} flexDirection={"row"} justifyContent={"space-between"}>
      <Flex>
        <Image
          src={enrollment.course.image}
          alt={enrollment.course.title}
          width={200}
          height={100}
        />

        <Flex
          flexDirection={"column"}
          mx={"2"}
          justifyContent={"center"}
          spaceY={"2"}
        >
          <Text>{enrollment.course.title}</Text>
          <Text>
            by{" "}
            {enrollment.course.instructor.firstName +
              " " +
              enrollment.course.instructor.lastName}
          </Text>
          <Flex flexDirection={"row"} spaceX={"2"}>
            {enrollment.course.tags.map((tag) => (
              <Badge colorPalette={"blue"} px={"2"} key={tag}>
                {tag}
              </Badge>
            ))}
          </Flex>
        </Flex>
      </Flex>

      <Flex flexDirection={"column"} justifyContent={"center"}>
        <Text>
          {enrollment.course.price.toLocaleString("en-US", {
            currency: "USD",
            style: "currency",
          })}
        </Text>
        <Button disabled={isLoading} onClick={() => handleDeleteEnrollment()}>
          {isLoading ? <Loader /> : <CgRemove />}
        </Button>
      </Flex>
    </Flex>
  );
};

export default CartItem;
