"use client";

import { Portal } from "@chakra-ui/react/portal";
import { Dialog } from "@chakra-ui/react/dialog";
import { CloseButton } from "@chakra-ui/react/button";
import { useInstructorModalStore } from "@/hooks/use-instructor-modal";
import Form from "./form";

const FormModal = () => {
  const { open, setOpen } = useInstructorModalStore();

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement={"center"}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p={"3"}>
            <Dialog.Header>
              <Dialog.Title>Be an instructor</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Form />
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default FormModal;
