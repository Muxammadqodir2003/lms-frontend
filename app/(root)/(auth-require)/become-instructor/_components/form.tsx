"use client";

import { becomeInstructorSchema } from "@/lib/validation";
import { Input } from "@chakra-ui/react/input";
import { Field } from "@chakra-ui/react/field";
import { Formik } from "formik";
import { createListCollection } from "@chakra-ui/react/collection";
import { Box, Button, Flex, Portal, Select } from "@chakra-ui/react";
import { BiCheckCircle } from "react-icons/bi";
import { useBecomeInstructorMutation } from "@/services/user/userApi";
import { toaster } from "@/components/ui/toaster";
import { useInstructorModalStore } from "@/hooks/use-instructor-modal";
import { IError } from "@/types";
import { getApiErrorMessage } from "@/lib/helper/error-handler";

const languages = createListCollection({
  items: [
    { label: "English", value: "en" },
    { label: "Uzbek", value: "uz" },
    { label: "Russian", value: "ru" },
    { label: "Turkish", value: "tr" },
  ],
});

const Form = () => {
  const [becomeInstructor, { isLoading, isSuccess }] =
    useBecomeInstructorMutation();
  const { setOpen } = useInstructorModalStore();

  const initialValues = {
    firstName: "",
    lastName: "",
    job: "",
    language: "" as string,
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
    } catch (error: unknown) {
      toaster.error({
        title: "So'rov yuborishda xatolik",
        description: getApiErrorMessage(error),
      });
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={becomeInstructorSchema}
      onSubmit={(values, actions) => onSubmit(values, actions)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        setFieldTouched,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box>
            <Field.Root mt={"2"} invalid={!!errors.firstName}>
              <Field.Label>First name</Field.Label>
              <Input
                p={"2"}
                name="firstName"
                value={values.firstName}
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue("firstName", e.target.value);
                }}
                disabled={isSubmitting}
              />
              <Field.ErrorText>{errors.firstName}</Field.ErrorText>
            </Field.Root>

            <Field.Root mt={"2"} invalid={!!errors.lastName}>
              <Field.Label>Last name</Field.Label>
              <Input
                p={"2"}
                name="lastName"
                value={values.lastName}
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue("lastName", e.target.value);
                }}
                disabled={isSubmitting}
              />
              <Field.ErrorText>{errors.lastName}</Field.ErrorText>
            </Field.Root>

            <Field.Root mt={"2"} invalid={!!errors.job}>
              <Field.Label>Job</Field.Label>
              <Input
                p={"2"}
                name="job"
                value={values.job}
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue("job", e.target.value);
                }}
                disabled={isSubmitting}
              />
              <Field.ErrorText>{errors.job}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!(touched.language && errors.language)}>
              <Select.Root
                name="language"
                value={values.language ? [values.language] : []}
                onValueChange={({ value }) =>
                  setFieldValue("language", value[0])
                }
                onInteractOutside={() => setFieldTouched("language", true)}
                collection={languages}
                disabled={isSubmitting}
              >
                <Select.Label fontSize="xl">Til</Select.Label>
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger p={"2"}>
                    <Select.ValueText placeholder="Tanlang" />
                  </Select.Trigger>
                </Select.Control>
                <Select.Positioner p={"2"}>
                  <Select.Content p={"2"}>
                    {languages.items.map((lang) => (
                      <Select.Item
                        cursor="pointer"
                        p={"2"}
                        item={lang}
                        key={lang.value}
                      >
                        {lang.label}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
              <Field.ErrorText>{errors.language}</Field.ErrorText>
            </Field.Root>

            <Field.Root mt={"2"} invalid={!!errors.social}>
              <Field.Label>Social</Field.Label>
              <Input
                p={"2"}
                name="social"
                value={values.social}
                onChange={(e) => {
                  handleChange(e);
                  setFieldValue("social", e.target.value);
                }}
                disabled={isSubmitting}
              />
              <Field.ErrorText>{errors.social}</Field.ErrorText>
            </Field.Root>

            <Flex justifyContent={"end"}>
              <Button type="submit" mt={"3"} px={"3"} loading={isSubmitting}>
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
