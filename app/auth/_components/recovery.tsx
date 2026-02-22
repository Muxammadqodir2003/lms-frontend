"use client";

import { emailSchema } from "@/lib/validation";
import { useGetUrlMutation } from "@/services/auth/authApi";
import { useAuthState } from "@/hooks/useAuthState";
import { toaster } from "@/components/ui/toaster";
import { EmailValues, IError } from "@/types";
import { ErrorMessage, Form, Formik } from "formik";
import { Button } from "@chakra-ui/react/button";
import { Text } from "@chakra-ui/react/text";
import { Input } from "@chakra-ui/react/input";
import { Field, HStack } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react/heading";
import { getApiErrorMessage } from "@/lib/helper/error-handler";

const Recovery = () => {
  const [getUrl, { isLoading }] = useGetUrlMutation();
  const { setState } = useAuthState();

  async function onSubmit(values: EmailValues) {
    try {
      const res = await getUrl(values).unwrap();

      if (res === true) {
        toaster.success({
          description: "Email manzilingizga havola yuborildi uni tekshiring",
        });
      }
    } catch (error: unknown) {
      toaster.error({ description: getApiErrorMessage(error) });
    }
  }

  return (
    <div className="">
      <Heading size={"4xl"} mb={"4"}>
        Hisobni tiklash
      </Heading>
      <Text color={"gray.400"}>
        Akauntingizni tiklash uchun platformada ro'yxatdan o'tgan email
        manzilingini kiriting, biz unga akauntingizni tiklash havolasini
        yuboramiz!
      </Text>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={emailSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Field.Root invalid={!!(touched.email && errors.email)} mt="2">
              <Field.Label fontSize={"xl"}>Email</Field.Label>
              <Input
                p={"2"}
                style={{
                  borderColor: errors.email && touched.email ? "red" : "gray",
                }}
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Email manzilingizni kiriting"
              />
              <Field.ErrorText>{errors.email}</Field.ErrorText>
            </Field.Root>

            <Button type="submit" w={"full"} mt={"3"} disabled={isLoading}>
              Havolani olish
            </Button>
            <HStack gap={"1"} justifyContent={"end"} mt={"2"}>
              <Text>Akauntingiz bormi? </Text>
              <Text
                color={"gray.400"}
                cursor={"pointer"}
                onClick={() => setState("login")}
              >
                Tizimga kirish
              </Text>
            </HStack>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Recovery;
