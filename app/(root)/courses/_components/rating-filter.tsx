"use client";

import { filterByRating } from "@/store/filters/filters.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { VStack } from "@chakra-ui/react/stack";
import { RadioGroup } from "@chakra-ui/react/radio-group";
import { RatingGroup } from "@chakra-ui/react/rating-group";

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
      <VStack gap="6">
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
              >
                <RatingGroup.HiddenInput />
                <RatingGroup.Control />
              </RatingGroup.Root>
            </RadioGroup.ItemText>
          </RadioGroup.Item>
        ))}
      </VStack>
    </RadioGroup.Root>
  );
};

export default RatingFilter;
