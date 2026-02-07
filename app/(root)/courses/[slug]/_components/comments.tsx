"use client";

import { useGetRatingsQuery } from "@/services/rating/ratingApi";
import { Loader } from "@chakra-ui/react/loader";

interface Props {
  slug: string;
}

const Comments = ({ slug }: Props) => {
  const { data, isLoading, isError } = useGetRatingsQuery(slug);
  console.log(data);

  if (isLoading) return <Loader />;
  if (isError) return <div>Error</div>;

  return <div>{data?.data}</div>;
};

export default Comments;
