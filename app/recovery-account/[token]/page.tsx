"use client";

import { use } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Yup importi
import { useRecoveryMutation } from "@/services/auth/authApi";

// Chakra UI v3 components
import {
  Box,
  Button,
  Container,
  Fieldset,
  Heading,
  Input,
  Stack,
  Text,
  Field,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { passwordSchema } from "@/lib/validation";
import { getApiErrorMessage } from "@/lib/helper/error-handler";

const Page = ({ params }: { params: Promise<{ token: string }> }) => {
  const { token } = use(params);
  const [recovery, { isLoading }] = useRecoveryMutation();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: passwordSchema,
    onSubmit: async (values) => {
      try {
        const data = { password: values.password };
        // API chaqiruvi
        const res = await recovery({ body: data, token }).unwrap();

        if (res) {
          toaster.create({
            title: "Muvaffaqiyatli",
            description: "Parolingiz yangilandi!",
            type: "success",
          });
          window.location.href = "http://localhost:3000/auth";
          formik.resetForm();
        }
      } catch (error: unknown) {
        toaster.create({
          title: "Xatolik",
          description: getApiErrorMessage(error),
          type: "error",
        });
      }
    },
  });

  return (
    <Container maxW="lg" py={{ base: "12", md: "24" }}>
      <Box
        bg="bg.panel"
        p={{ base: "6", md: "8" }}
        borderRadius="2xl"
        boxShadow="md"
        borderWidth="1px"
      >
        <Stack gap="2" mb="8">
          <Heading size="3xl" letterSpacing="tight">
            Hisobni tiklash
          </Heading>
          <Text color="fg.muted">
            Yangi parolingizni kiriting va tizimga qayting.
          </Text>
        </Stack>

        <form onSubmit={formik.handleSubmit}>
          <Fieldset.Root size="lg" disabled={isLoading}>
            <Stack gap="5" w="full">
              {/* Yangi Parol */}
              <Field.Root mt={"2"}>
                <Field.Label fontSize={"xl"}>New password</Field.Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  variant="outline"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Field.Root>

              {/* Tasdiqlash */}
              <Field.Root>
                <Field.Label fontSize={"xl"}>Confirm password</Field.Label>
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  variant="outline"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Field.Root>

              <Button
                type="submit"
                loading={isLoading}
                loadingText="Saqlanmoqda..."
                width="full"
                colorPalette="teal" // Chakra v3 ranglar palitrasi
                size="lg"
                mt="2"
              >
                Parolni o'zgartirish
              </Button>
            </Stack>
          </Fieldset.Root>
        </form>
      </Box>
    </Container>
  );
};

export default Page;
