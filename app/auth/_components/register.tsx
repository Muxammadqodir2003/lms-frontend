"use client";

import { registerSchema } from "@/lib/validation";
import { useRegisterMutation } from "@/services/auth/authApi";
import { useAuthState } from "@/hooks/useAuthState";
import { useData } from "@/hooks/useData";
import { IError, RegisterFormValues } from "@/types";
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
import { getApiErrorMessage } from "@/lib/helper/error-handler";

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
      const data = { email: values.email, password: values.password };

      setData(data);
      if (res) {
        setState("verify");
      }
    } catch (error: unknown) {
      toaster.error({
        title: "Xatolik",
        description: getApiErrorMessage(error),
      });
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
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Field.Root invalid={!!(touched.email && errors.email)} mt="2">
              <Field.Label fontSize={"xl"}>Email</Field.Label>
              <Input
                style={{
                  borderColor: errors.email && touched.email ? "red" : "gray",
                }}
                p={"2"}
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Email manzilingizni kiriting!"
              />
              <Field.ErrorText>{errors.email}</Field.ErrorText>
            </Field.Root>
            <HStack>
              <Field.Root
                invalid={!!(touched.password && errors.password)}
                mt={"3"}
              >
                <Field.Label fontSize={"xl"}>Parol</Field.Label>
                <PasswordInput
                  style={{
                    borderColor:
                      errors.password && touched.password ? "red" : "gray",
                  }}
                  p={"2"}
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={values.password}
                  placeholder="Parolingizni kiriting!"
                  disabled={isLoading}
                />
                <Field.ErrorText>{errors.password}</Field.ErrorText>
              </Field.Root>
              <Field.Root
                invalid={!!(touched.confirmPassword && errors.confirmPassword)}
                mt={"3"}
              >
                <Field.Label fontSize={"xl"}>Parolni tasdiqlash</Field.Label>
                <PasswordInput
                  style={{
                    borderColor:
                      errors.confirmPassword && touched.confirmPassword
                        ? "red"
                        : "gray",
                  }}
                  p={"2"}
                  name="confirmPassword"
                  onChange={handleChange}
                  value={values.confirmPassword}
                  placeholder="Parolingizni tasdiqlang!"
                  disabled={isLoading}
                />
                <Field.ErrorText>{errors.confirmPassword}</Field.ErrorText>
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
