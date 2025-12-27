"use client";

import { useData } from "@/hooks/useData";
import { useVerifyMutation } from "@/services/auth/authApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/user/user.slice";
import { toaster } from "@/components/ui/toaster";
import { PinInput } from "@chakra-ui/react/pin-input";
import { Heading } from "@chakra-ui/react/heading";
import { Text } from "@chakra-ui/react/text";
import { Button } from "@chakra-ui/react/button";
import { useState } from "react";
import { VStack } from "@chakra-ui/react";

const Verify = () => {
  const [value, setValue] = useState<string[]>(["", "", "", "", "", ""]);
  const router = useRouter();
  const dispatch = useDispatch();
  const [verify, { isLoading }] = useVerifyMutation();
  const { data } = useData();

  async function onSubmit() {
    if (value.join("").length < 6) return;
    try {
      const res = await verify({ ...data, otp: value.join("") }).unwrap();
      if (res) {
        dispatch(setCredentials(res));
        router.push("/");
        return;
      }
    } catch (error) {
      const message =
        // @ts-ignore
        error?.data?.message || error?.error || "Email yoki parol noto'g'ri";
      toaster.error({ description: message });
    }
  }

  return (
    <div className="">
      <Heading fontSize={"4xl"} mb={"4"}>
        Tasdiqlash
      </Heading>
      <Text color={"gray.400"}>
        Oxirgi qadam va deyarli bajarildi, biz sizning elektron pochtangizga
        yuborgan 6 ta raqamdan iborat tastiqlash kodini kiriting
      </Text>
      <VStack mt={"2"}>
        {/* <form onSubmit={onSubmit}> */}
        <PinInput.Root
          variant={"subtle"}
          value={value}
          onValueChange={(e) => setValue(e.value)}
        >
          <PinInput.HiddenInput />
          <PinInput.Control>
            <PinInput.Input index={0} />
            <PinInput.Input index={1} />
            <PinInput.Input index={2} />
            <PinInput.Input index={3} />
            <PinInput.Input index={4} />
            <PinInput.Input index={5} />
          </PinInput.Control>
        </PinInput.Root>
        <Button
          disabled={isLoading || value.join("").length < 6}
          onClick={onSubmit}
          w={"full"}
          mt={"3"}
        >
          Submit
        </Button>
        {/* </form> */}
      </VStack>
    </div>
  );
};

export default Verify;
