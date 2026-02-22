"use client";

import { useRatingModal } from "@/hooks/use-rating-modal";
import { ratingSchema } from "@/lib/validation";
import { useGetRatingQuery } from "@/services/rating/ratingApi";
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Flex,
  Loader,
  Portal,
  RatingGroup,
  Textarea,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useAddRatingMutation } from "@/services/rating/ratingApi";
import { toaster } from "../ui/toaster";
import { IError } from "@/types";

const RatingModal = ({ slug }: { slug: string }) => {
  const { data } = useGetRatingQuery(slug);
  const [addRating, { isLoading }] = useAddRatingMutation();

  const [rating, setRating] = useState<number>(data?.rating || 0);
  const { open, onOpenChange } = useRatingModal();

  async function onSubmit(values: { comment: string }) {
    try {
      await addRating({ slug, data: { rating, ...values } }).unwrap();
      onOpenChange(false);
      toaster.success({
        title: "Success",
        description:
          "You have successfully sent a request to become an instructor",
      });
    } catch (error) {
      toaster.error({
        title: "Error",
        description: (error as IError)?.data?.message,
      });
    }
  }

  return (
    <Dialog.Root
      placement={"center"}
      size={"lg"}
      open={open}
      onOpenChange={(e) => onOpenChange(e.open)}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content p={"3"}>
            <Dialog.Header>
              <Dialog.Title>Kursni baholash</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Flex
                w={"full"}
                alignItems={"center"}
                justifyContent={"center"}
                mt={"4"}
              >
                <RatingGroup.Root
                  size={"lg"}
                  colorPalette={"yellow"}
                  allowHalf
                  count={5}
                  value={rating}
                  onValueChange={(e) => setRating(e.value)}
                >
                  <RatingGroup.HiddenInput />
                  <RatingGroup.Control />
                </RatingGroup.Root>
              </Flex>
              {rating > 0 && (
                <>
                  <Formik
                    initialValues={{ comment: data?.comment || "" }}
                    validationSchema={ratingSchema}
                    onSubmit={(values) => onSubmit(values)}
                  >
                    {(formik) => (
                      <Form>
                        <Field.Root mt={"2"} invalid={!!formik.errors.comment}>
                          <Textarea
                            mt={"4"}
                            p={"2"}
                            minHeight={"200px"}
                            w={"full"}
                            placeholder="Nima uchun bunday baho qo'ydingiz?"
                            {...formik.getFieldProps("comment")}
                          />
                          <Field.ErrorText>
                            {formik.errors.comment as string}
                          </Field.ErrorText>
                        </Field.Root>
                        <Flex w={"full"} justifyContent={"flex-end"} mt={"4"}>
                          <Button
                            size="md"
                            px={"4"}
                            type="submit"
                            disabled={isLoading}
                          >
                            Yuborish {isLoading && <Loader />}
                          </Button>
                        </Flex>
                      </Form>
                    )}
                  </Formik>
                </>
              )}
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

export default RatingModal;
