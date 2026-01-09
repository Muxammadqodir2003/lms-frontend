"use client";

import { io } from "socket.io-client";
import { adminApi, useGetAllInstructorQuery } from "@/services/admin/adminApi";
import { IUser } from "@/types";
import { Button, Flex, Loader } from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import ActiveInstructor from "./active-instructor";
import InActiveInstructor from "./inactive-instructor";
import { useAppDispatch } from "@/store/hooks";
import { toaster } from "@/components/ui/toaster";

const InstructorsView = () => {
  const [status, setStatus] = useState<"active" | "inactive">("inactive");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllInstructorQuery(page);
  const dispatch = useAppDispatch();

  const socket = useRef<ReturnType<typeof io> | null>(null);

  useEffect(() => {
    socket.current = io("http://localhost:4000", {
      auth: {
        role: "ADMIN",
      },
    });
  }, []);

  useEffect(() => {
    socket.current?.on("message", (data) => {
      dispatch(
        adminApi.util.updateQueryData("getAllInstructor", page, (draft) => {
          const exist = draft?.find(
            (instructor: IUser) => instructor.id === data.id
          );
          if (exist) return;
          draft?.unshift(data);
        })
      );
      toaster.info({
        title: "Malumot",
        description: "Yangi instruktor so'rov keldi",
      });
    });
  }, [socket, page]);

  const active = useMemo(
    () =>
      data?.filter(
        (instructor: IUser) => instructor?.instructorProfile?.isActive === true
      ),
    [data]
  );
  const inactive = useMemo(
    () =>
      data?.filter(
        (instructor: IUser) => instructor?.instructorProfile?.isActive === false
      ),
    [data]
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Flex flexDir={"column"}>
        <Flex gap={2}>
          <Button
            rounded={"md"}
            variant={status === "active" ? "solid" : "outline"}
            bg={status === "active" ? "blue.900" : "transparent"}
            color={"white"}
            w={"50%"}
            onClick={() => setStatus("active")}
          >
            Active
          </Button>
          <Button
            variant={status === "inactive" ? "solid" : "outline"}
            bg={status === "inactive" ? "blue.900" : "transparent"}
            color={"white"}
            w={"50%"}
            onClick={() => setStatus("inactive")}
          >
            Inactive
          </Button>
        </Flex>
        <Flex mt={"3"}>
          {status === "active" && (
            <ActiveInstructor
              page={page}
              setPage={setPage}
              data={active}
              isLoading={isLoading}
            />
          )}
          {status === "inactive" && (
            <InActiveInstructor
              page={page}
              setPage={setPage}
              data={inactive}
              isLoading={isLoading}
            />
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default InstructorsView;
