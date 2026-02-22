"use client";

import { loginSchema } from "@/lib/validation";
import { useLoginMutation } from "@/services/auth/authApi";
import { setCredentials } from "@/store/user/user.slice";
import { useAuthState } from "@/hooks/useAuthState";
import { useRouter } from "next/navigation";
import { Box, Button, Field, Heading, Input, Text } from "@chakra-ui/react";
import { IError, LoginFormValues } from "@/types";
import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import { toaster } from "@/components/ui/toaster";
import { useAppDispatch } from "@/store/hooks";
import { PasswordInput } from "@/components/ui/password-input";
import { getApiErrorMessage } from "@/lib/helper/error-handler";

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { setState } = useAuthState();

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  async function handleSubmit(values: LoginFormValues) {
    try {
      toaster.dismiss();
      const data = await login(values).unwrap();
      dispatch(setCredentials(data));
      toaster.success({
        title: "Muvaffaqiyatli",
        description: "Sizning hisobingizga kirdingiz",
      });
      router.push("/");
    } catch (error: unknown) {
      toaster.error({
        title: "Tizimga kirishda xatolik",
        description: getApiErrorMessage(error),
      });
    }
  }

  return (
    <div className="">
      <Heading size={"4xl"}>Kirish</Heading>
      <Text color={"gray.500"} className="text-muted-foreground">
        Sizni yana platformamizda ko'rib turishdan xursandmiz, ko'proq tajriba
        orttirish uchun hisobingizga kiring
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
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
                placeholder="Email manzilingizni kiriting"
              />
              <Field.ErrorText>{errors.email}</Field.ErrorText>
            </Field.Root>
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
                placeholder="Parolingizni kiriting"
                disabled={isLoading}
              />
              <Field.ErrorText>{errors.password}</Field.ErrorText>
            </Field.Root>
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
        <Text>Hisobingiz yo'qmi?</Text>
        <Text
          onClick={() => setState("register")}
          cursor={"pointer"}
          color={"gray.400"}
        >
          Unda ro'yxatdan o'ting
        </Text>
      </Box>
    </div>
  );
};

export default Login;
