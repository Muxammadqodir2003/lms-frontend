"use client";

import { loginSchema } from "@/lib/validation";
import { useLoginMutation } from "@/services/auth/authApi";
import { setCredentials } from "@/store/user/user.slice";
import { useAuthState } from "@/hooks/useAuthState";
import { useRouter } from "next/navigation";
import { Box, Button, Field, Heading, Input, Text } from "@chakra-ui/react";
import { LoginFormValues } from "@/types";
import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import { toaster } from "@/components/ui/toaster";
import { useAppDispatch } from "@/store/hooks";

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { setState } = useAuthState();

  const initialValue: LoginFormValues = {
    email: "",
    password: "",
  };

  async function onSubmit(
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) {
    console.log(values);
    try {
      toaster.dismiss();
      const data = await login(values).unwrap();
      dispatch(setCredentials(data));
      actions.resetForm();
      router.push("/");
    } catch (error) {
      toaster.error({
        // @ts-ignore
        description: error.data.message,
        type: "error",
        closable: true,
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
      <Formik<LoginFormValues>
        initialValues={initialValue}
        validationSchema={loginSchema}
        onSubmit={(values, actions) => onSubmit(values, actions)}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Field.Root mt={"2"}>
              <Field.Label fontSize={"xl"}>Email</Field.Label>
              <Input
                pl={"2"}
                bg={"gray.900"}
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
            <Field.Root mt={"3"}>
              <Field.Label fontSize={"xl"}>Parol</Field.Label>
              <Input
                pl={"2"}
                bg={"gray.900"}
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Parolingizni kiriting"
                disabled={isLoading}
              />
              <ErrorMessage name="password" />
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
