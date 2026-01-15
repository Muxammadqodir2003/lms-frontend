"use client";

import { useGetCourseCommentsQuery } from "@/services/user/userApi";
import { Loader } from "@chakra-ui/react/loader";

interface Props {
  slug: string;
}

const Comments = ({ slug }: Props) => {
  const { data, isLoading, isError } = useGetCourseCommentsQuery(slug);

  if (isLoading) return <Loader />;
  if (isError) return <div>Error</div>;

  return <div>{slug}</div>;
};

export default Comments;
