"use client";

import { Dialog } from "@chakra-ui/react/dialog";
import { Button, CloseButton } from "@chakra-ui/react/button";
import { Portal } from "@chakra-ui/react/portal";
import { useSectionModalStore } from "@/hooks/useSectionModal";
import { Separator } from "@chakra-ui/react/separator";
import { Formik } from "formik";
import { sectionSchema } from "@/lib/validation";
import { Field } from "@chakra-ui/react/field";
import { Input } from "@chakra-ui/react/input";
import { useCreateSectionMutation } from "@/services/instructor/instructorApi";
import { useEditedCourse } from "@/hooks/useEditedCourse";
import { useUpdateSectionMutation } from "@/services/instructor/instructorApi";
import { toaster } from "@/components/ui/toaster";

const SectionFromModal = ({ slug }: { slug: string }) => {
  const { isOpen, setIsOpen } = useSectionModalStore();
  const [createSection, { isLoading }] = useCreateSectionMutation();
  const [updateSection, { isLoading: isUpdating }] = useUpdateSectionMutation();
  const { editedSection, setEditedSection } = useEditedCourse();

  const initialValues = {
    name: editedSection?.name || "",
  };

  const onSubmit = async (values: typeof initialValues) => {
    console.log(slug, values);
    try {
      if (editedSection?.id) {
        await updateSection({
          sectionId: editedSection?.id,
          body: values,
        }).unwrap();
      } else {
        await createSection({ slug, body: values }).unwrap();
      }
      toaster.success({
        title: "Muvaffaqiyatli",
        description: "Bo'lim yaratish muvaffaqiyatli",
      });
      setIsOpen(false);
      setEditedSection(null);
    } catch (error) {
      toaster.error({ title: "Xatolik", description: error?.data?.message });
    }
  };

  return (
    <Dialog.Root
      lazyMount
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
      size="sm"
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p={"3"}>
            <Dialog.Header>
              <Dialog.Title>
                {editedSection?.id ? "Bo'lim tahrirlash" : "Bo'lim yaratish"}
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Separator w={"full"} mt={"2"} />
            <Dialog.Body mt={"2"}>
              <Formik
                initialValues={initialValues}
                validationSchema={sectionSchema}
                onSubmit={onSubmit}
              >
                {(formik) => (
                  <form onSubmit={formik.handleSubmit}>
                    <Field.Root invalid={!!formik.errors.name}>
                      <Field.Label>Bo'lim nomi</Field.Label>
                      <Input
                        {...formik.getFieldProps("name")}
                        p={"2"}
                        disabled={isLoading || isUpdating}
                      />
                      <Field.ErrorText>{formik.errors.name}</Field.ErrorText>
                    </Field.Root>

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
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default SectionFromModal;
