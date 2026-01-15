import { Container } from "@chakra-ui/react/container";
import CourseView from "./_components/course-view";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return (
    <Container
      maxWidth={"6xl"}
      mx={"auto"}
      mt={"24"}
      p={"2"}
      display={"flex"}
      flexDirection={"row"}
      spaceX={"4"}
      bg={"bg.muted/70"}
    >
      <CourseView slug={slug} />
    </Container>
  );
};

export default Page;
