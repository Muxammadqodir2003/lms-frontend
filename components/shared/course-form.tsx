"use client";

import { courseSchema } from "@/lib/validation";
import { Input } from "@chakra-ui/react/input";
import { Textarea } from "@chakra-ui/react/textarea";
import { Field } from "@chakra-ui/react/field";
import { HStack, VStack } from "@chakra-ui/react/stack";
import { Form, Formik } from "formik";
import { Flex } from "@chakra-ui/react/flex";
import { TagsInput } from "@chakra-ui/react/tags-input";
import { Select } from "@chakra-ui/react/select";
import { createListCollection } from "@chakra-ui/react";

const languages = createListCollection({
  items: [
    { label: "Uz", value: "uz" },
    { label: "En", value: "en" },
    { label: "Ru", value: "ru" },
    { label: "Tur", value: "tu" },
  ],
});

const CourseForm = () => {
  const initailValues = {
    title: "",
    subTitle: "",
    whatsLearn: [],
    requirements: [],
    tags: [],
    description: "",
    level: "",
    category: "",
    price: 0,
    language: "",
  };

  return (
    <Formik
      initialValues={initailValues}
      validationSchema={courseSchema}
      onSubmit={(values) => console.log(values)}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <Flex
            flexDirection={"row"}
            w={"full"}
            bg={"gray.700"}
            spaceX={"2"}
            p={"3"}
          >
            <Flex flexDirection={"column"} w={"70%"}>
              <Field.Root mt={"2"}>
                <Field.Label fontSize={"xl"}>Email</Field.Label>
                <Input
                  w={"full"}
                  pl={"2"}
                  variant={"outline"}
                  name="title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  // disabled={isLoading}
                />
              </Field.Root>
              <Field.Root mt={"2"}>
                <Field.Label fontSize={"xl"}>Email</Field.Label>
                <Textarea
                  w={"full"}
                  pl={"2"}
                  variant={"outline"}
                  minH={"6rem"}
                  name="subTitle"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subTitle}
                  // disabled={isLoading}
                />
              </Field.Root>
              <Field.Root>
                <TagsInput.Root
                  name="whatsLearn"
                  value={formik.values.whatsLearn}
                  onValueChange={({ value }) => formik.handleChange(value)}
                >
                  <TagsInput.Label>
                    Kursingizda talabalar nima o'rganadilar
                  </TagsInput.Label>
                  <TagsInput.Control>
                    <TagsInput.Items />
                    <TagsInput.Input />
                  </TagsInput.Control>
                </TagsInput.Root>
              </Field.Root>
            </Flex>
            <Flex flexDirection={"column"} w={"30%"}>
              <Select.Root collection={languages} mt={"2"}>
                <Select.Label fontSize={"xl"}>Email</Select.Label>
                <Input
                  w={"full"}
                  pl={"2"}
                  variant={"outline"}
                  name="title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  placeholder="Kurs titili"
                  // disabled={isLoading}
                />
              </Select.Root>
              <Field.Root mt={"2"}>
                <Field.Label fontSize={"xl"}>Email</Field.Label>
                <Textarea
                  w={"full"}
                  pl={"2"}
                  variant={"outline"}
                  name="subTitle"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subTitle}
                  placeholder="Kursni qisqa tavsifi"
                  // disabled={isLoading}
                />
              </Field.Root>
            </Flex>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default CourseForm;
