"use client";

import { emailSchema } from "@/lib/validation";
import { useGetUrlMutation } from "@/services/auth/authApi";
import { useAuthState } from "@/hooks/useAuthState";
import { toaster } from "@/components/ui/toaster";
import { EmailValues } from "@/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "@chakra-ui/react/button";
import { Text } from "@chakra-ui/react/text";
import { Input } from "@chakra-ui/react/input";
import { HStack } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react/heading";

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
    } catch (error) {
      // @ts-ignore
      toaster.error({ description: error.data.message });
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
        onSubmit={(values) => onSubmit(values)}
      >
        {(formik) => (
          <Form>
            <Field
              name="email"
              render={({ field }) => (
                <>
                  <Input
                    mt={"2"}
                    px={"2"}
                    name="email"
                    placeholder="Emailingizni kiriting"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.handleBlur}
                    variant={"subtle"}
                  />
                  <ErrorMessage name="email" />
                </>
              )}
            />
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
