"use client";

import { RadioGroup } from "@chakra-ui/react/radio-group";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { filterByCategory } from "@/store/filters/filters.slice";
import { Flex } from "@chakra-ui/react/flex";

const items = [
  { label: "IT", value: "it" },
  { label: "Design", value: "design" },
  { label: "Marketing", value: "marketing" },
];

const CategoryFilter = () => {
  const courseState = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  return (
    <RadioGroup.Root
      value={courseState.category}
      onValueChange={(e) => dispatch(filterByCategory(e.value))}
    >
      <Flex flexDirection={"column"} gap="6">
        {items.map((item) => (
          <RadioGroup.Item key={item.value} value={item.value}>
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
          </RadioGroup.Item>
        ))}
      </Flex>
    </RadioGroup.Root>
  );
};

export default CategoryFilter;
