import { Box } from "@chakra-ui/react/box";
import { Text } from "@chakra-ui/react/text";
import AccardionContent from "./accardion-content";

interface SidebarProps {
  slug: string;
}

const Sidebar = ({ slug }: SidebarProps) => {
  return (
    <Box
      h={"92.5vh"}
      mt={"7.5vh"}
      pos={"fixed"}
      bottom={0}
      left={0}
      zIndex={"10"}
      w={"1/5"}
      bg={"gray.900"}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"start"}
        justifyContent={"start"}
        textAlign={"start"}
        w={"full"}
      >
        <Text color={"gray.400"} mt={"2"} mb={"3"}>
          {slug.split("-").join(" ")}
        </Text>
        <AccardionContent slug={slug} />
      </Box>
    </Box>
  );
};

export default Sidebar;
