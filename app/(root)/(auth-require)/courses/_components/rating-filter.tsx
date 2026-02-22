"use client";

import { filterByRating } from "@/store/filters/filters.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RadioGroup } from "@chakra-ui/react/radio-group";
import { RatingGroup } from "@chakra-ui/react/rating-group";
import { Flex } from "@chakra-ui/react/flex";
import { Text } from "@chakra-ui/react";

const items = [
  { quantity: 4.5, value: "1" },
  { quantity: 4, value: "2" },
  { quantity: 3.5, value: "3" },
  { quantity: 3, value: "4" },
];

const RatingFilter = () => {
  const coursesState = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  return (
    <RadioGroup.Root
      value={coursesState.rating}
      onValueChange={(e) => dispatch(filterByRating(e.value))}
    >
      <Flex flexDirection={"column"} gap="6">
        {items.map((item) => (
          <RadioGroup.Item key={item.value} value={String(item.quantity)}>
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText asChild>
              <RatingGroup.Root
                readOnly
                allowHalf
                count={5}
                defaultValue={item.quantity}
                size="sm"
                colorPalette={"orange"}
                display={"flex"}
                flexDirection={"column"}
              >
                <RatingGroup.HiddenInput />
                <RatingGroup.Control />
                <Text>{item.quantity} dan yuqori</Text>
              </RatingGroup.Root>
            </RadioGroup.ItemText>
          </RadioGroup.Item>
        ))}
      </Flex>
    </RadioGroup.Root>
  );
};

export default RatingFilter;
