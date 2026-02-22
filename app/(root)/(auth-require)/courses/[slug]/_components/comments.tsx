"use client";

import { getApiErrorMessage } from "@/lib/helper/error-handler";
import { useGetRatingsQuery } from "@/services/rating/ratingApi";
import { Avatar, Flex, RatingGroup, Text } from "@chakra-ui/react";
import { Loader } from "@chakra-ui/react/loader";
import { formatDistanceToNowStrict } from "date-fns";

interface Props {
  slug: string;
}

const Comments = ({ slug }: Props) => {
  const { data, isLoading, isError, error } = useGetRatingsQuery(slug);

  if (isLoading)
    return (
      <Flex justifyContent="center" mt={"24"} alignItems="center">
        <Loader />
      </Flex>
    );
  if (isError) return <div>{getApiErrorMessage(error)}</div>;

  return (
    <Flex
      flexDirection={{ base: "column", md: "row", lg: "row", xl: "row" }}
      w={"full"}
      gap={"2"}
    >
      {data?.map((comment) => (
        <Flex
          key={comment.id}
          mt={"2"}
          flexDirection={"row"}
          gap={"2"}
          p={"2"}
          bg={"bg.muted"}
          borderRadius={"md"}
          w={{ base: "full", md: "full", lg: "1/2", xl: "1/2" }}
          alignItems={"center"}
        >
          <Avatar.Root size={"md"}>
            <Avatar.Fallback name={comment.user.email} />
          </Avatar.Root>
          <Flex flexDirection="column">
            <Text>{comment.user.email}</Text>
            <Flex gap={"2"} flexDirection={"row"} alignItems={"center"}>
              <RatingGroup.Root
                readOnly
                count={5}
                defaultValue={comment.rating}
                size="sm"
                colorPalette="yellow"
              >
                <RatingGroup.HiddenInput />
                <RatingGroup.Control />
              </RatingGroup.Root>
              <Text>{formatDistanceToNowStrict(comment.createdAt)} ago</Text>
            </Flex>
            <Text>{comment.comment}</Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default Comments;
