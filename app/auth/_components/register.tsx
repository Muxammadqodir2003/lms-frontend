"use client";

import { registerSchema } from "@/lib/validation";
import { useRegisterMutation } from "@/services/auth/authApi";
import { useAuthState } from "@/hooks/useAuthState";
import { useData } from "@/hooks/useData";
import { RegisterFormValues } from "@/types";
import { toaster } from "@/components/ui/toaster";
import { HStack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react/box";
import { Button } from "@chakra-ui/react/button";
import { Field } from "@chakra-ui/react/field";
import { Heading } from "@chakra-ui/react/heading";
import { Text } from "@chakra-ui/react/text";
import { Input } from "@chakra-ui/react/input";
import { ErrorMessage, Form, Formik } from "formik";
import { PasswordInput } from "@/components/ui/password-input";

const Register = () => {
  const { setData } = useData();
  const [register, { isLoading }] = useRegisterMutation();
  const { setState } = useAuthState();

  const initialValues: RegisterFormValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  async function onSubmit(values: RegisterFormValues) {
    try {
      const res = await register({ email: values.email }).unwrap();
      console.log(res);
      const data = { email: values.email, password: values.password };

      setData(data);
      if (res) {
        setState("verify");
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
      <Heading mb={"4"} fontSize={"4xl"}>
        Ro'yxatdan o'tish
      </Heading>
      <Text color={"gray.400"}>
        Biz siz kabi ajoyib muxandislarni qidiramiz! Bizning rockyulduz
        muxandislik jamoamizning bir qismiga aylaning va martabangizni ko'taring
      </Text>
      <Formik<RegisterFormValues>
        validationSchema={registerSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Field.Root mt={"2"}>
              <Field.Label fontSize={"xl"}>Email</Field.Label>
              <Input
                pl={"2"}
                bg={"gray.950"}
                variant={"subtle"}
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Email manzilingizni kiriting"
                disabled={isLoading}
              />
              <ErrorMessage name="email" className="text-red" />
            </Field.Root>
            <HStack>
              <Field.Root mt={"3"}>
                <Field.Label fontSize={"xl"}>Parol</Field.Label>
                <PasswordInput
                  pl={"2"}
                  bg={"gray.950"}
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="Parolingizni kiriting"
                  disabled={isLoading}
                />
                <ErrorMessage name="password" />
              </Field.Root>
              <Field.Root mt={"3"}>
                <Field.Label fontSize={"xl"}>Parolni tasdiqlash</Field.Label>
                <PasswordInput
                  pl={"2"}
                  bg={"gray.950"}
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  placeholder="Parolingizni kiriting"
                  disabled={isLoading}
                />
                <ErrorMessage name="confirmPassword" />
              </Field.Root>
            </HStack>
            <Text
              textAlign={"end"}
              mt={"2"}
              cursor={"pointer"}
              color={"gray.400"}
              onClick={() => setState("recovery")}
            >
              Parolni unutdingizmi?
            </Text>
            <Button type="submit" w={"full"} mt={"3"} disabled={isLoading}>
              Kirish
            </Button>
          </Form>
        )}
      </Formik>
      <Box mt={"2"} display={"flex"} flexDirection={"row"} spaceX={"2"}>
        <Text>Hisobingiz bormi?</Text>
        <Text
          onClick={() => setState("login")}
          cursor={"pointer"}
          color={"gray.400"}
        >
          Unda tizimga kiring
        </Text>
      </Box>
    </div>
  );
};

export default Register;
