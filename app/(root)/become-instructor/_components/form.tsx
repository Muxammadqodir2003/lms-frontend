"use client";

import { becomeInstructorSchema } from "@/lib/validation";
import { Input } from "@chakra-ui/react/input";
import { Field } from "@chakra-ui/react/field";
import { Formik } from "formik";
import { createListCollection } from "@chakra-ui/react/collection";
import { Box, Button, Flex } from "@chakra-ui/react";
import { BiCheckCircle } from "react-icons/bi";
import { useBecomeInstructorMutation } from "@/services/user/userApi";
import { toaster } from "@/components/ui/toaster";
import { useInstructorModalStore } from "@/hooks/use-instructor-modal";

const Form = () => {
  const [becomeInstructor, { isLoading, isSuccess }] =
    useBecomeInstructorMutation();
  const { setOpen } = useInstructorModalStore();

  const initialValues = {
    firstName: "",
    lastName: "",
    job: "",
    language: "",
    social: "",
  };

  async function onSubmit(values: typeof initialValues, actions: any) {
    try {
      await becomeInstructor(values).unwrap();
      toaster.success({
        title: "Success",
        description:
          "You have successfully sent a request to become an instructor",
      });
      actions.resetForm();
      setOpen(false);
    } catch (error) {
      toaster.error({
        title: "Error",
        // @ts-ignore
        description: error?.data?.message,
      });
    }
  }

  const languages = createListCollection({
    items: [
      { label: "English", value: "en" },
      { label: "Uzbek", value: "uz" },
      { label: "Russian", value: "ru" },
      { label: "Turkish", value: "tr" },
    ],
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={becomeInstructorSchema}
      onSubmit={(values, actions) => onSubmit(values, actions)}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Box>
            <Field.Root mt={"2"} invalid={!!formik.errors.firstName}>
              <Field.Label>First name</Field.Label>
              <Input p={"2"} {...formik.getFieldProps("firstName")} />
              <Field.ErrorText>{formik.errors.firstName}</Field.ErrorText>
            </Field.Root>

            <Field.Root mt={"2"} invalid={!!formik.errors.lastName}>
              <Field.Label>Last name</Field.Label>
              <Input p={"2"} {...formik.getFieldProps("lastName")} />
              <Field.ErrorText>{formik.errors.lastName}</Field.ErrorText>
            </Field.Root>

            <Field.Root mt={"2"} invalid={!!formik.errors.job}>
              <Field.Label>Job</Field.Label>
              <Input p={"2"} {...formik.getFieldProps("job")} />
              <Field.ErrorText>{formik.errors.job}</Field.ErrorText>
            </Field.Root>

            <Field.Root mt={"2"} invalid={!!formik.errors.language}>
              <Field.Label>Language</Field.Label>
              <Input p={"2"} {...formik.getFieldProps("language")} />
              <Field.ErrorText>{formik.errors.language}</Field.ErrorText>
            </Field.Root>

            <Field.Root mt={"2"} invalid={!!formik.errors.social}>
              <Field.Label>Social</Field.Label>
              <Input p={"2"} {...formik.getFieldProps("social")} />
              <Field.ErrorText>{formik.errors.social}</Field.ErrorText>
            </Field.Root>

            <Flex justifyContent={"end"}>
              <Button type="submit" mt={"3"} px={"3"}>
                Send to verify <BiCheckCircle />
              </Button>
            </Flex>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
