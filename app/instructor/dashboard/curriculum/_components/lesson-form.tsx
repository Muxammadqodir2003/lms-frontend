import { lessonSchema } from "@/lib/validation";
import { Input } from "@chakra-ui/react/input";
import { Field } from "@chakra-ui/react/field";
import { Flex } from "@chakra-ui/react/flex";
import { Formik } from "formik";
import { Button, CloseButton } from "@chakra-ui/react/button";
import { useCreateLessonMutation } from "@/services/instructor/instructorApi";
import { useUpdateLessonMutation } from "@/services/instructor/instructorApi";
import { useEditedCourse } from "@/hooks/useEditedCourse";
import { toaster } from "@/components/ui/toaster";
import { FileUpload } from "@chakra-ui/react/file-upload";
import { InputGroup } from "@chakra-ui/react/input-group";
import { LuFileUp } from "react-icons/lu";
import { useState } from "react";

const LessonForm = ({
  sectionId,
  onClose,
}: {
  sectionId: number;
  onClose: () => void;
}) => {
  const [video, setVideo] = useState<File | null>(null);
  const [createLesson, { isLoading }] = useCreateLessonMutation();
  const [updateLesson, { isLoading: isUpdating }] = useUpdateLessonMutation();
  const { editedLesson, setEditedLesson } = useEditedCourse();

  const initialValues = {
    name: editedLesson?.name || "",
  };

  const onSubmit = (values: typeof initialValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (video) formData.append("video", video);

    console.log(formData);
    try {
      if (editedLesson?.id) {
        updateLesson({
          lessonId: editedLesson?.id,
          body: formData,
        }).unwrap();
      } else {
        createLesson({
          sectionId,
          body: formData,
        }).unwrap();
      }
      toaster.success({
        title: "Muvaffaqiyatli",
        description: "Darslik yaratish muvaffaqiyatli",
      });
      onClose();
      setEditedLesson(null);
    } catch (error) {
      toaster.error({ title: "Xatolik", description: error?.data?.message });
    }
  };

  return (
    <Flex w={"full"} flexDirection={"column"}>
      <Formik
        initialValues={initialValues}
        validationSchema={lessonSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Field.Root invalid={!!formik.errors.name}>
              <Field.Label>Darslik nomi</Field.Label>
              <Input
                {...formik.getFieldProps("name")}
                p={"2"}
                disabled={isLoading || isUpdating}
              />
              <Field.ErrorText>{formik.errors.name}</Field.ErrorText>
            </Field.Root>

            <FileUpload.Root
              onFileAccept={(e) => setVideo(e.files?.[0] || null)}
              mt={"2"}
              gap="1"
              w={"full"}
            >
              <FileUpload.HiddenInput />
              <FileUpload.Label>Video yuklash</FileUpload.Label>
              <InputGroup
                startElement={<LuFileUp />}
                endElement={
                  <FileUpload.ClearTrigger asChild>
                    <CloseButton
                      me="-1"
                      size="xs"
                      variant="plain"
                      focusVisibleRing="inside"
                      focusRingWidth="2px"
                      pointerEvents="auto"
                    />
                  </FileUpload.ClearTrigger>
                }
              >
                <Input asChild>
                  <FileUpload.Trigger>
                    <FileUpload.FileText lineClamp={1} />
                  </FileUpload.Trigger>
                </Input>
              </InputGroup>
            </FileUpload.Root>

            <Button
              w={"full"}
              mt={"2"}
              type="submit"
              disabled={isLoading || isUpdating}
            >
              Yuborish
            </Button>
          </form>
        )}
      </Formik>
    </Flex>
  );
};

export default LessonForm;
