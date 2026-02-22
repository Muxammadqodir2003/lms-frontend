import CourseForm from "@/components/shared/course-form";
import { Container } from "@chakra-ui/react/container";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Edit Course ${slug}`,
  };
}

const Page = () => {
  return (
    <Container maxWidth={"6xl"} mx={"auto"} mt={"16"} bg={"gray.900"}>
      <CourseForm />
    </Container>
  );
};

export default Page;
