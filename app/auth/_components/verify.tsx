"use client";

import { useData } from "@/hooks/useData";
import { useVerifyMutation } from "@/services/auth/authApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/user/user.slice";
import { toaster } from "@/components/ui/toaster";
import { PinInput } from "@chakra-ui/react/pin-input";
import { Button } from "@chakra-ui/react/button";
import { Flex } from "@chakra-ui/react";
import { getApiErrorMessage } from "@/lib/helper/error-handler";
import { Form, Formik } from "formik";
import { pinSchema } from "@/lib/validation";

const Verify = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [verify, { isLoading }] = useVerifyMutation();
  const { data } = useData();

  async function onSubmit(values: { otp: string }) {
    try {
      const res = await verify({ ...data, otp: values.otp }).unwrap();
      if (res) {
        dispatch(setCredentials(res));
        router.push("/");
        return;
      }
    } catch (error: unknown) {
      toaster.error({
        title: "Tasdiqlashda xatolik",
        description: getApiErrorMessage(error),
      });
    }
  }

  return (
    <Formik
      initialValues={{ otp: "" }}
      validationSchema={pinSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values, errors, touched, setFieldTouched }) => {
        const charArray = values.otp.split("");
        const displayValue = Array.from(
          { length: 6 },
          (_, i) => charArray[i] ?? "",
        );

        return (
          <Form>
            <Flex
              flexDirection={"column"}
              gap={"2"}
              w={"full"}
              h={"full"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <PinInput.Root
                disabled={isLoading}
                variant="subtle"
                value={displayValue}
                onValueChange={(details) => {
                  const stringValue = details.value.join("");
                  setFieldValue("otp", stringValue);
                }}
                onValueInvalid={() => setFieldTouched("otp", true)}
              >
                <PinInput.Label display={"block"} fontSize={"xl"} mb={"2"}>
                  Tasdiqlash kodi
                </PinInput.Label>
                <PinInput.Control>
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <PinInput.Input
                      key={index}
                      index={index}
                      style={{
                        borderColor: errors.otp && touched.otp ? "red" : "gray",
                      }}
                    />
                  ))}
                </PinInput.Control>
              </PinInput.Root>

              {errors.otp && touched.otp && (
                <p style={{ color: "red", fontSize: "14px" }}>{errors.otp}</p>
              )}

              <Button
                type="submit"
                mt={4}
                w={"full"}
                disabled={isLoading}
                loading={isLoading}
              >
                Yuborish
              </Button>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Verify;
