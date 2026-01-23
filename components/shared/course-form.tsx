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
  Text,
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
    { label: "Qimmat", value: "advanced" },
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
    { label: "Programming", value: "programming" },
  ],
});

interface CourseForm {
  title: string;
  slug: string;
  subTitle: string;
  level: string;
  category: string;
  price: string;
  language: string;
  whatsLearn: string;
  requirements: string;
  tags: string;
  description: string;
}

const CourseForm = () => {
  const { editedCourse, setEditedCourse } = useEditedCourse();
  const [courseData, setCourseData] = useState<CourseForm>(
    editedCourse
      ? {
          title: editedCourse.title,
          slug: editedCourse.slug,
          subTitle: editedCourse.subTitle,
          level: editedCourse.level,
          category: editedCourse.category,
          price: String(editedCourse.price),
          language: editedCourse.language,
          whatsLearn: editedCourse.whatsLearn.join(","),
          requirements: editedCourse.requirements.join(","),
          tags: editedCourse.tags.join(","),
          description: editedCourse.description,
        }
      : {
          title: "",
          slug: "",
          subTitle: "",
          level: "",
          category: "",
          price: "",
          language: "",
          whatsLearn: "",
          requirements: "",
          tags: "",
          description: "",
        },
  );
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const [createCourse, { isLoading }] = useCreateCourseMutation();
  const [updateCourse, { isLoading: updateLoading }] =
    useUpdateCourseMutation();

  const onSubmit = async () => {
    const formData = new FormData();

    for (const key in courseData) {
      // if (key === "slug") continue;
      if (courseData[key]) {
        formData.append(key, courseData[key] as string);
      }
    }
    if (!editedCourse) {
      formData.append("image", image as File);
    }
    toaster.dismiss();

    if (!editedCourse) {
      await createCourse(formData)
        .unwrap()
        .then(() => {
          toaster.success({
            title: "Kurs yaratildi",
            description: "Kursingiz yaratildi",
            type: "success",
            closable: true,
          });
          router.push("/instructor/dashboard/courses");
        })
        .catch((error) => {
          console.log(error);
          toaster.error({
            title: "Kurs yaratishda xatolik",
            description: error.data.message,
            type: "error",
            closable: true,
          });
        });
    } else {
      await updateCourse({
        courseId: editedCourse.id,
        body: formData,
      })
        .unwrap()
        .then(() => {
          toaster.success({
            title: "Kurs tahrirlandi",
            description: "Kursingiz tahrirlandi",
            type: "success",
            closable: true,
          });
          router.push("/instructor/dashboard/courses");
        })
        .catch((error) => {
          toaster.error({
            title: "Kurs tahrirlashda xatolik",
            description: error.data.message,
            type: "error",
            closable: true,
          });
        });
    }
    setEditedCourse(null);
  };

  return (
    <>
      <Formik
        initialValues={courseData}
        validationSchema={courseSchema}
        onSubmit={onSubmit}
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
                  <Field.Label fontSize={"xl"}>Kurs nomi</Field.Label>
                  <Input
                    w={"full"}
                    pl={"2"}
                    variant={"outline"}
                    name="title"
                    onChange={(e) =>
                      setCourseData({
                        ...courseData,
                        title: e.target.value,
                        slug: e.target.value.toLowerCase().replace(/\s/g, "-"),
                      })
                    }
                    value={courseData.title}
                    disabled={isLoading}
                  />
                </Field.Root>
                <Field.Root mt={"2"}>
                  <Field.Label fontSize={"xl"}>Kurs qisqa tavsifi</Field.Label>
                  <Textarea
                    w={"full"}
                    pl={"2"}
                    variant={"outline"}
                    minH={"6rem"}
                    name="subTitle"
                    onChange={(e) =>
                      setCourseData({ ...courseData, subTitle: e.target.value })
                    }
                    value={courseData.subTitle}
                    disabled={isLoading}
                  />
                </Field.Root>
                <Field.Root mt={"2"}>
                  <TagsInput.Root
                    variant={"outline"}
                    value={
                      courseData.whatsLearn
                        ? courseData.whatsLearn.split(",")
                        : []
                    }
                    onValueChange={({ value }) =>
                      setCourseData({
                        ...courseData,
                        whatsLearn: value.join(","),
                      })
                    }
                  >
                    <TagsInput.Label fontSize={"xl"}>
                      Kursingizda talabalar nima o'rganadilar
                    </TagsInput.Label>
                    <TagsInput.Control bg={"transparent"}>
                      <TagsInput.Context>
                        {({ value }) =>
                          value.map((tag, index) => (
                            <TagsInput.Item
                              key={index}
                              index={index}
                              value={tag}
                            >
                              <TagsInput.ItemPreview
                                px={"2"}
                                bg={"blue.800"}
                                ml={1}
                              >
                                <TagsInput.ItemText>{tag}</TagsInput.ItemText>
                                <TagsInput.ItemDeleteTrigger />
                              </TagsInput.ItemPreview>
                              <TagsInput.ItemInput />
                            </TagsInput.Item>
                          ))
                        }
                      </TagsInput.Context>
                      <TagsInput.Input w={"full"} pl={"2"} />
                    </TagsInput.Control>
                  </TagsInput.Root>
                </Field.Root>
                <Field.Root mt={"2"}>
                  <TagsInput.Root
                    variant={"outline"}
                    size={"sm"}
                    value={
                      courseData.requirements
                        ? courseData.requirements.split(",")
                        : []
                    }
                    onValueChange={({ value }) =>
                      setCourseData({
                        ...courseData,
                        requirements: value.join(","),
                      })
                    }
                  >
                    <TagsInput.Label fontSize={"xl"}>
                      Kursingiz talablari
                    </TagsInput.Label>
                    <TagsInput.Control bg={"transparent"}>
                      <TagsInput.Context>
                        {({ value }) =>
                          value.map((tag, index) => (
                            <TagsInput.Item
                              key={index}
                              index={index}
                              value={tag}
                            >
                              <TagsInput.ItemPreview
                                px={"2"}
                                bg={"blue.800"}
                                ml={1}
                              >
                                <TagsInput.ItemText>{tag}</TagsInput.ItemText>
                                <TagsInput.ItemDeleteTrigger />
                              </TagsInput.ItemPreview>
                              <TagsInput.ItemInput />
                            </TagsInput.Item>
                          ))
                        }
                      </TagsInput.Context>
                      <TagsInput.Input w={"full"} ml={"2"} />
                    </TagsInput.Control>
                  </TagsInput.Root>
                </Field.Root>
                <Field.Root mt={"2"}>
                  <TagsInput.Root
                    variant={"outline"}
                    value={courseData.tags ? courseData.tags.split(",") : []}
                    onValueChange={({ value }) =>
                      setCourseData({ ...courseData, tags: value.join(",") })
                    }
                  >
                    <TagsInput.Label fontSize={"xl"}>
                      Kurs teglar
                    </TagsInput.Label>
                    <TagsInput.Control bg={"transparent"}>
                      <TagsInput.Context>
                        {({ value }) =>
                          value.map((tag, index) => (
                            <TagsInput.Item
                              key={index}
                              index={index}
                              value={tag}
                            >
                              <TagsInput.ItemPreview
                                px={"2"}
                                bg={"blue.800"}
                                ml={1}
                              >
                                <TagsInput.ItemText>{tag}</TagsInput.ItemText>
                                <TagsInput.ItemDeleteTrigger />
                              </TagsInput.ItemPreview>
                              <TagsInput.ItemInput />
                            </TagsInput.Item>
                          ))
                        }
                      </TagsInput.Context>
                      <TagsInput.Input w={"full"} pl={"2"} />
                    </TagsInput.Control>
                  </TagsInput.Root>
                </Field.Root>
                <Field.Root mt={"2"}>
                  <Field.Label fontSize={"xl"}>Kurs tavsifi</Field.Label>
                  <Box w={"full"} bg={"gray.950"}>
                    <TiptapEditor
                      value={courseData.description}
                      onChange={(html) =>
                        setCourseData({ ...courseData, description: html })
                      }
                    />
                  </Box>
                  {/* <Box
                    mt={10}
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    bg="bg.subtle"
                    maxWidth={"full"}
                  >
                    <Text fontWeight="bold" mb={2}>
                      HTML Natija:
                    </Text>
                    <Box
                      as="pre"
                      p={2}
                      bg="blackAlpha.100"
                      overflowX="auto"
                      fontSize="sm"
                    >
                      {courseData.description}
                    </Box>
                  </Box> */}
                </Field.Root>
              </Flex>
              <Flex flexDirection={"column"} w={"30%"}>
                <Field.Root>
                  <Select.Root
                    name={"language"}
                    defaultValue={[courseData.language]}
                    onValueChange={({ value }) =>
                      setCourseData({
                        ...courseData,
                        language: value.toString(),
                      })
                    }
                    collection={languages}
                    mt={"2"}
                  >
                    <Select.Label fontSize={"xl"}>Til</Select.Label>
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText
                          fontSize={"xl"}
                          pl={"2"}
                          placeholder="-"
                        />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content pl={"2"}>
                          {languages.items.map((language) => (
                            <Select.Item item={language} key={language.value}>
                              {language.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                </Field.Root>
                <Field.Root mt={"2"}>
                  <Select.Root
                    name={"category"}
                    defaultValue={[courseData.category]}
                    onValueChange={({ value }) =>
                      setCourseData({
                        ...courseData,
                        category: value.toString(),
                      })
                    }
                    collection={categories}
                    mt={"2"}
                  >
                    <Select.Label fontSize={"xl"}>Turkum</Select.Label>
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText
                          fontSize={"xl"}
                          pl={"2"}
                          placeholder="-"
                        />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content pl={"2"}>
                          {categories.items.map((category) => (
                            <Select.Item item={category} key={category.value}>
                              {category.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                </Field.Root>
                <Field.Root>
                  <Select.Root
                    name={"Narxi"}
                    defaultValue={[courseData.price.toString()]}
                    onValueChange={({ value }) =>
                      setCourseData({ ...courseData, price: value.toString() })
                    }
                    collection={prices}
                    mt={"2"}
                  >
                    <Select.Label fontSize={"xl"}>Narxi</Select.Label>
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText
                          fontSize={"xl"}
                          pl={"2"}
                          placeholder="-"
                        />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content pl={"2"}>
                          {prices.items.map((price) => (
                            <Select.Item item={price} key={price.value}>
                              {price.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                </Field.Root>
                <Field.Root mt={"2"}>
                  <Select.Root
                    name={"level"}
                    defaultValue={[courseData.level]}
                    onValueChange={({ value }) =>
                      setCourseData({ ...courseData, level: value.toString() })
                    }
                    collection={levels}
                    mt={"2"}
                  >
                    <Select.Label fontSize={"xl"}>Darajasi</Select.Label>
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText
                          fontSize={"xl"}
                          pl={"2"}
                          placeholder="-"
                        />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content pl={"2"}>
                          {levels.items.map((level) => (
                            <Select.Item item={level} key={level.value}>
                              {level.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                </Field.Root>
                <Field.Root mt={"2"}>
                  <Field.Label fontSize={"xl"}>
                    Kursni oldindan ko'rish uchun rasm
                  </Field.Label>
                  <FileUpload.Root
                    mt={"2"}
                    maxW="xl"
                    alignItems="stretch"
                    maxFiles={10}
                    required
                    name="image"
                    onFileChange={(e) => {
                      setImage(e.acceptedFiles[0]);
                      console.log(image);
                    }}
                  >
                    <FileUpload.HiddenInput />
                    {image ? (
                      <Box position="relative">
                        <FileUpload.ClearTrigger
                          asChild
                          position="absolute"
                          top="-1"
                          right="1"
                        >
                          <CloseButton
                            size="xs"
                            variant="plain"
                            focusVisibleRing="inside"
                            focusRingWidth="2px"
                            pointerEvents="auto"
                          />
                        </FileUpload.ClearTrigger>
                        <Image
                          src={
                            editedCourse
                              ? `http://localhost:4000/uploads/images/${editedCourse.image}`
                              : URL.createObjectURL(image)
                          }
                          alt="Course Image"
                          width={250}
                          height={150}
                        />
                      </Box>
                    ) : (
                      <FileUpload.Dropzone bg={"gray.600"}>
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
                </Field.Root>
              </Flex>
            </Flex>
            <Button
              type="submit"
              w={"full"}
              mt={"3"}
              disabled={isLoading}
              onClick={() => onSubmit()}
            >
              {editedCourse ? "Tahrirlash" : "Yaratish"}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CourseForm;
