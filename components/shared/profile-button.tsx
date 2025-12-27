"use client";

import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Popover } from "@chakra-ui/react/popover";
import { Center } from "@chakra-ui/react/center";
import { Text } from "@chakra-ui/react/text";
import { useAppSelector } from "@/store/hooks";
import { logout } from "@/store/user/user.slice";

const ProfileButton = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div>
      <Popover.Root positioning={{ placement: "bottom-end" }}>
        <Popover.Trigger asChild>
          <Image
            src={"/account.png"}
            alt="Account image"
            width={40}
            height={40}
          />
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Body>
              <Center py={"4"} display={"flex"} flexDirection={"column"}>
                {user.user?.role === "INSTRUCTOR" && (
                  <Text
                    fontSize={"lg"}
                    p={"3"}
                    _hover={{ bg: "gray.800" }}
                    w={"full"}
                    mb={"2"}
                    cursor={"pointer"}
                    onClick={() => router.push("/instructor/dashboard")}
                  >
                    O'qituvchi admin
                  </Text>
                )}
                <Text
                  fontSize={"lg"}
                  p={"3"}
                  _hover={{ bg: "gray.800" }}
                  w={"full"}
                  mb={"2"}
                  cursor={"pointer"}
                  onClick={() => router.push("/dashboard")}
                >
                  Dashboard
                </Text>

                <Text
                  fontSize={"lg"}
                  p={"3"}
                  _hover={{ bg: "gray.800" }}
                  w={"full"}
                  mb={"2"}
                  cursor={"pointer"}
                  onClick={() => dispatch(logout())}
                >
                  logout
                </Text>
              </Center>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </div>
  );
};

export default ProfileButton;
