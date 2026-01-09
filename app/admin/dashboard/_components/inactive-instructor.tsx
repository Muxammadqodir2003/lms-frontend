"use client";

import { Table } from "@chakra-ui/react/table";
import { IUser } from "@/types";
import { Flex } from "@chakra-ui/react/flex";
import { Button } from "@chakra-ui/react/button";
import { Dispatch, SetStateAction } from "react";
import { useApproveInstructorMutation } from "@/services/admin/adminApi";
import { toaster } from "@/components/ui/toaster";
import { Loader } from "@chakra-ui/react";

interface Props {
  data: IUser[] | undefined;
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  isLoading: boolean;
}

const InActiveInstructor = ({ data, setPage, page, isLoading }: Props) => {
  const [approveInstructor, { isLoading: isLoadingApprove }] =
    useApproveInstructorMutation();

  const handleApprove = async (userId: string) => {
    try {
      await approveInstructor(userId).unwrap();
      toaster.success({
        title: "Muvaffaqiyatli",
        description: "Instructor tasdiqlandi",
      });
    } catch (error) {
      // @ts-ignore
      toaster.error({ title: "Xatolik", description: error?.data?.message });
    }
  };

  return (
    <>
      <Flex w={"full"} flexDirection={"column"}>
        <Table.Root size="lg" striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader py={"2"}>No</Table.ColumnHeader>
              <Table.ColumnHeader>Elektron pochta</Table.ColumnHeader>
              <Table.ColumnHeader>Toliq ismi</Table.ColumnHeader>
              <Table.ColumnHeader>Ish</Table.ColumnHeader>
              <Table.ColumnHeader>SOCIAL_MEDIA</Table.ColumnHeader>
              <Table.ColumnHeader>Harakatlar</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data?.map((instructor: IUser, idx: number) => (
              <Table.Row key={instructor.id}>
                <Table.Cell py={"4"}>{idx + 1}</Table.Cell>
                <Table.Cell>{instructor.email}</Table.Cell>
                <Table.Cell>
                  {instructor.instructorProfile.firstName}{" "}
                  {instructor.instructorProfile.lastName}
                </Table.Cell>
                <Table.Cell>{instructor.instructorProfile.job}</Table.Cell>
                <Table.Cell>{instructor.instructorProfile.social}</Table.Cell>
                <Table.Cell>
                  <Button
                    size={"sm"}
                    variant={"outline"}
                    outline={"green.500"}
                    px={"3"}
                    onClick={() => handleApprove(instructor.id)}
                    disabled={isLoadingApprove}
                  >
                    {isLoadingApprove ? <Loader /> : "Tasdiqlash"}
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        {data && page * 8 < data?.length && (
          <Flex
            w={"full"}
            justifyContent={"center"}
            alignItems={"center"}
            mt={"2"}
          >
            <Button
              onClick={() => setPage((prev) => prev + 1)}
              variant={"solid"}
              bg={"green.500"}
              px={"3"}
              disabled={isLoading}
            >
              Ko'proq ko'rish {isLoading && <Loader />}
            </Button>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default InActiveInstructor;
