import { Container } from "@chakra-ui/react/container";
import Feed from "./_components/feed";
import CategoriesCarousel from "./_components/categories-carausel";
import CoursesCarousel from "./_components/courses.carousel";
import CommentsCarousel from "./_components/comments-carousel";
import LogoCarousel from "./_components/logo-carousel";
import Subscribe from "./_components/subscribe";

const Page = () => {
  return (
    <Container maxWidth={"6xl"} mx={"auto"} mt={"24"} p={"2"} mb={"6"}>
      <Feed />
      <CategoriesCarousel />
      <CoursesCarousel />
      <CommentsCarousel />
      <LogoCarousel />
      <Subscribe />
    </Container>
  );
};

export default Page;
