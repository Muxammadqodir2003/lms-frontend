"use client";

import { VStack } from "@chakra-ui/react/stack";
import { RadioGroup } from "@chakra-ui/react/radio-group";
import { filterByCategory } from "@/store/courses/courses.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "@chakra-ui/react";

const items = [
  { label: "Web developer", value: "web" },
  { label: "Mobile developer", value: "mobile" },
  { label: "Grafik design", value: "design" },
  { label: "Artifical Intelligence", value: "ai" },
];

const CategoryFilter = () => {
  const courseState = useAppSelector((state) => state.courses);
  const dispatch = useAppDispatch();

  return (
    <RadioGroup.Root
      value={courseState.category}
      onValueChange={(e) => dispatch(filterByCategory(e.value))}
    >
      <VStack gap="6">
        {items.map((item) => (
          <RadioGroup.Item key={item.value} value={item.value}>
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
          </RadioGroup.Item>
        ))}
      </VStack>
    </RadioGroup.Root>
  );
};

export default CategoryFilter;
