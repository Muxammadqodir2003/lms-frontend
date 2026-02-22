import { Metadata } from "next";
import CourseForm from "@/components/shared/course-form";
import { Box } from "@chakra-ui/react/box";

export const metadata: Metadata = {
  title: "Create Course",
};

const Page = () => {
  return (
    <Box mt={"16"}>
      <CourseForm />
    </Box>
  );
};

export default Page;
