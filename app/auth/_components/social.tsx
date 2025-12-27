import { Button } from "@/components/ui/button";
import { HStack } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

const Social = () => {
  return (
    <HStack>
      <Button
        onClick={() =>
          (window.location.href = "http://localhost:4000/api/auth/github")
        }
        variant={"surface"}
        w={"1/2"}
      >
        <FaGithub /> Github
      </Button>
      <Button
        onClick={() =>
          (window.location.href = "http://localhost:4000/api/auth/google")
        }
        variant={"solid"}
        w={"1/2"}
      >
        <FaGoogle /> Google
      </Button>
    </HStack>
  );
};

export default Social;
