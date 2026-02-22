"use client";

import { courseSchema } from "@/lib/validation";
import { Input } from "@chakra-ui/react/input";
import { Textarea } from "@chakra-ui/react/textarea";
import { Field } from "@chakra-ui/react/field";
import { Form, Formik } from "formik";
import { Flex } from "@chakra-ui/react/flex";
import { TagsInput } from "@chakra-ui/react/tags-input";
import { Select } from "@chakra-ui/react/select";
import {
  Box,
  Button,
  CloseButton,
  createListCollection,
  FileUpload,
  Icon,
  Portal,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import Image from "next/image";
import {
  useCreateCourseMutation,
  useUpdateCourseMutation,
} from "@/services/instructor/instructorApi";
import { toaster } from "../ui/toaster";
import { useEditedCourse } from "@/hooks/useEditedCourse";
import { useRouter } from "next/navigation";
import TiptapEditor from "./react-quil";
import { IError } from "@/types";

// Kolleksiyalar o'zgarishsiz qoladi...
const languages = createListCollection({
  items: [
    { label: "Uz", value: "uz" },
    { label: "En", value: "en" },
    { label: "Ru", value: "ru" },
    { label: "Tur", value: "tu" },
  ],
});
const levels = createListCollection({
  items: [
    { label: "Boshlang'ich", value: "beginner" },
    { label: "O'rtacha", value: "intermediate" },
    { label: "Ilg'or", value: "advanced" },
  ],
});
const prices = createListCollection({
  items: [
    { label: "10$", value: "10" },
    { label: "20$", value: "20" },
  ],
});
const categories = createListCollection({
  items: [
    { label: "IT", value: "it" },
    { label: "Design", value: "design" },
    { label: "Marketing", value: "marketing" },
  ],
});

const CourseForm = () => {
  const { editedCourse, setEditedCourse } = useEditedCourse();
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const [createCourse, { isLoading }] = useCreateCourseMutation();
  const [updateCourse, { isLoading: updateLoading }] =
    useUpdateCourseMutation();

  // Dastlabki qiymatlar
  const initialValues = editedCourse
    ? {
        title: editedCourse.title,
        slug: editedCourse.slug,
        subTitle: editedCourse.subTitle,
        level: editedCourse.level,
        category: editedCourse.category,
        price: String(editedCourse.price),
        language: editedCourse.language,
        whatsLearn: editedCourse.whatsLearn,
        requirements: editedCourse.requirements,
        tags: editedCourse.tags,
        description: editedCourse.description,
        image: editedCourse.image,
      }
    : {
        title: "",
        slug: "",
        subTitle: "",
        level: "" as string,
        category: "" as string,
        price: "" as string,
        language: "" as string,
        whatsLearn: [],
        requirements: [],
        tags: [],
        description: "",
        image: null as File | null,
      };

  const handleFormSubmit = async (values: any) => {
    const formData = new FormData();

    // if (image) formData.append("image", image);
    // Formik values-dan FormData tayyorlash
    Object.keys(values).forEach((key) => {
      const val = values[key as keyof typeof values];

      if (Array.isArray(val)) {
        // Select va TagsInput massivlarini stringga o'tkazish
        formData.append(key, val.join(","));
      } else {
        formData.append(key, val);
      }
    });

    toaster.dismiss();
    const action = editedCourse
      ? updateCourse({ courseId: editedCourse.id, body: formData })
      : createCourse(formData);

    try {
      await action.unwrap();
      toaster.success({ title: editedCourse ? "Tahrirlandi" : "Yaratildi" });
      router.push("/instructor/dashboard/courses");
      setEditedCourse(null);
    } catch (error) {
      toaster.error({
        title: "Xatolik",
        description: (error as IError)?.data?.message,
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={courseSchema}
      onSubmit={handleFormSubmit}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        setFieldTouched,
        handleSubmit,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Flex flexDirection="row" w="full" bg="gray.700" spaceX="2" p="3">
            <Flex flexDirection="column" w="70%">
              <Field.Root invalid={!!(touched.title && errors.title)} mt="2">
                <Field.Label fontSize="xl">Kurs nomi</Field.Label>
                <Input
                  p={"2"}
                  name="title"
                  value={values.title}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue(
                      "slug",
                      e.target.value.toLowerCase().replace(/\s/g, "-"),
                    );
                    setFieldValue("title", e.target.value);
                    setFieldTouched("title", true);
                  }}
                  placeholder="Kurs nomini kiriting"
                />
                <Field.ErrorText>{errors.title}</Field.ErrorText>
              </Field.Root>

              <Field.Root
                invalid={!!(touched.subTitle && errors.subTitle)}
                mt="2"
              >
                <Field.Label fontSize="xl">Kurs qisqa tavsifi</Field.Label>
                <Textarea
                  p={"2"}
                  name="subTitle"
                  value={values.subTitle}
                  onChange={handleChange}
                  placeholder="Kurs qisqa tavsifi"
                  minHeight="100px"
                />
                <Field.ErrorText>{errors.subTitle}</Field.ErrorText>
              </Field.Root>

              <Field.Root
                invalid={!!(touched.whatsLearn && errors.whatsLearn)}
                mt="2"
              >
                <TagsInput.Root
                  value={values.whatsLearn}
                  onValueChange={({ value }) =>
                    setFieldValue("whatsLearn", value)
                  }
                  onInteractOutside={() => setFieldTouched("whatsLearn", true)}
                >
                  <TagsInput.Label fontSize="xl">
                    Nimalar o'rgatiladi?
                  </TagsInput.Label>
                  <TagsInput.Control bg="transparent">
                    <TagsInput.Context>
                      {({ value }) =>
                        value.map((tag, index) => (
                          <TagsInput.Item key={index} index={index} value={tag}>
                            <TagsInput.ItemPreview px="2" bg="blue.800">
                              <TagsInput.ItemText>{tag}</TagsInput.ItemText>
                              <TagsInput.ItemDeleteTrigger />
                            </TagsInput.ItemPreview>
                          </TagsInput.Item>
                        ))
                      }
                    </TagsInput.Context>
                    <TagsInput.Input p={"2"} placeholder="Qo'shish..." />
                  </TagsInput.Control>
                </TagsInput.Root>
                <Field.ErrorText>{errors.whatsLearn as string}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!(touched.tags && errors.tags)} mt="2">
                <TagsInput.Root
                  value={values.tags}
                  onValueChange={({ value }) => setFieldValue("tags", value)}
                  onInteractOutside={() => setFieldTouched("tags", true)}
                >
                  <TagsInput.Label fontSize="xl">Kurs teglari</TagsInput.Label>
                  <TagsInput.Control bg="transparent">
                    <TagsInput.Context>
                      {({ value }) =>
                        value.map((tag, index) => (
                          <TagsInput.Item key={index} index={index} value={tag}>
                            <TagsInput.ItemPreview px="2" bg="blue.800">
                              <TagsInput.ItemText>{tag}</TagsInput.ItemText>
                              <TagsInput.ItemDeleteTrigger />
                            </TagsInput.ItemPreview>
                          </TagsInput.Item>
                        ))
                      }
                    </TagsInput.Context>
                    <TagsInput.Input p={"2"} placeholder="Qo'shish..." />
                  </TagsInput.Control>
                </TagsInput.Root>
                <Field.ErrorText>{errors.tags as string}</Field.ErrorText>
              </Field.Root>

              <Field.Root
                invalid={!!(touched.requirements && errors.requirements)}
                mt="2"
              >
                <TagsInput.Root
                  value={values.requirements}
                  onValueChange={({ value }) =>
                    setFieldValue("requirements", value)
                  }
                  onInteractOutside={() =>
                    setFieldTouched("requirements", true)
                  }
                >
                  <TagsInput.Label fontSize="xl">Talablar</TagsInput.Label>
                  <TagsInput.Control bg="transparent">
                    <TagsInput.Context>
                      {({ value }) =>
                        value.map((tag, index) => (
                          <TagsInput.Item key={index} index={index} value={tag}>
                            <TagsInput.ItemPreview px="2" bg="blue.800">
                              <TagsInput.ItemText>{tag}</TagsInput.ItemText>
                              <TagsInput.ItemDeleteTrigger />
                            </TagsInput.ItemPreview>
                          </TagsInput.Item>
                        ))
                      }
                    </TagsInput.Context>
                    <TagsInput.Input p={"2"} placeholder="Qo'shish..." />
                  </TagsInput.Control>
                </TagsInput.Root>
                <Field.ErrorText>
                  {errors.requirements as string}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root
                invalid={!!(touched.description && errors.description)}
                mt="2"
              >
                <Field.Label fontSize="xl">Kurs tavsifi</Field.Label>
                <Box w="full" bg="gray.950">
                  <TiptapEditor
                    value={values.description}
                    onChange={(html) => setFieldValue("description", html)}
                  />
                </Box>
                <Field.ErrorText>{errors.description}</Field.ErrorText>
              </Field.Root>
            </Flex>

            <Flex flexDirection="column" w="30%">
              <Field.Root invalid={!!(touched.language && errors.language)}>
                <Select.Root
                  name="language"
                  value={values.language ? [values.language] : []}
                  onValueChange={({ value }) =>
                    setFieldValue("language", value[0])
                  }
                  onInteractOutside={() => setFieldTouched("language", true)}
                  collection={languages}
                >
                  <Select.Label fontSize="xl">Til</Select.Label>
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText p={"2"} placeholder="Select language" />
                    </Select.Trigger>
                  </Select.Control>
                  <Portal>
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
                  </Portal>
                </Select.Root>
                <Field.ErrorText>{errors.language}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!(touched.price && errors.price)}>
                <Select.Root
                  name="price"
                  value={values.price ? [values.price] : []}
                  onValueChange={({ value }) =>
                    setFieldValue("price", value[0])
                  }
                  onInteractOutside={() => setFieldTouched("price", true)}
                  collection={prices}
                >
                  <Select.Label fontSize="xl">Narxi</Select.Label>
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText p={"2"} placeholder="Select price" />
                    </Select.Trigger>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner p={"2"}>
                      <Select.Content p={"2"}>
                        {prices.items.map((price) => (
                          <Select.Item
                            cursor="pointer"
                            p={"2"}
                            item={price}
                            key={price.value}
                          >
                            {price.label}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
                <Field.ErrorText>{errors.price}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!(touched.category && errors.category)}>
                <Select.Root
                  name="category"
                  value={values.category ? [values.category] : []}
                  onValueChange={({ value }) =>
                    setFieldValue("category", value[0])
                  }
                  onInteractOutside={() => setFieldTouched("category", true)}
                  collection={categories}
                >
                  <Select.Label fontSize="xl">Kategoriyalar</Select.Label>
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText p={"2"} placeholder="Select category" />
                    </Select.Trigger>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner p={"2"}>
                      <Select.Content p={"2"}>
                        {categories.items.map((category) => (
                          <Select.Item
                            cursor="pointer"
                            p={"2"}
                            item={category}
                            key={category.value}
                          >
                            {category.label}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
                <Field.ErrorText>{errors.category}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!(touched.level && errors.level)}>
                <Select.Root
                  name="level"
                  value={values.level ? [values.level] : []}
                  onValueChange={({ value }) =>
                    setFieldValue("level", value[0])
                  }
                  onInteractOutside={() => setFieldTouched("level", true)}
                  collection={levels}
                >
                  <Select.Label fontSize="xl">Daraja</Select.Label>
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText p={"2"} placeholder="Select level" />
                    </Select.Trigger>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner p={"2"}>
                      <Select.Content p={"2"}>
                        {levels.items.map((level) => (
                          <Select.Item
                            cursor="pointer"
                            p={"2"}
                            item={level}
                            key={level.value}
                          >
                            {level.label}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
                <Field.ErrorText>{errors.level}</Field.ErrorText>
              </Field.Root>

              <Field.Root mt="4" invalid={!!errors.image && touched.image}>
                <Field.Label fontSize="xl">Kurs rasmi</Field.Label>

                <FileUpload.Root
                  onFileChange={(e) => {
                    const file = e.acceptedFiles[0];
                    setFieldValue("image", file);
                    setImage(file);
                  }}
                >
                  <FileUpload.HiddenInput />

                  {values.image ? (
                    <Box position="relative">
                      <FileUpload.ClearTrigger
                        onClick={() => {
                          setFieldValue("image", null);
                          setImage(null);
                        }}
                        asChild
                        position="absolute"
                        top="-1"
                        right="1"
                      >
                        <CloseButton size="xs" variant="plain" />
                      </FileUpload.ClearTrigger>

                      <Image
                        src={
                          values.image instanceof File
                            ? URL.createObjectURL(values.image)
                            : values.image
                        }
                        alt="Course Image"
                        width={250}
                        height={150}
                      />
                    </Box>
                  ) : (
                    <FileUpload.Dropzone
                      w={"full"}
                      bg={"gray.600"}
                      borderColor={
                        errors.image && touched.image ? "red.500" : "gray"
                      }
                    >
                      <Icon size="md" color="fg.muted">
                        <LuUpload />
                      </Icon>
                      <FileUpload.DropzoneContent>
                        <Box>Drag and drop files here</Box>
                        <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                      </FileUpload.DropzoneContent>
                    </FileUpload.Dropzone>
                  )}
                </FileUpload.Root>

                {errors.image && touched.image && (
                  <Box color="red.500" fontSize="sm" mt="1">
                    {errors.image}
                  </Box>
                )}
              </Field.Root>
            </Flex>
          </Flex>

          <Button
            type="submit"
            w="full"
            mt="3"
            loading={isLoading || updateLoading}
          >
            {editedCourse ? "Tahrirlash" : "Yaratish"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CourseForm;
