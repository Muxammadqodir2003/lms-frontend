"use client";

import { filterByLevel } from "@/store/filters/filters.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { VStack } from "@chakra-ui/react/stack";
import { RadioGroup } from "@chakra-ui/react/radio-group";

const items = [
  { label: "Beginner", value: "1" },
  { label: "Intermidate", value: "2" },
  { label: "Advanced", value: "3" },
];

const LevelFilter = () => {
  const coursesState = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  return (
    <RadioGroup.Root
      value={coursesState.level}
      onValueChange={(e) => dispatch(filterByLevel(e.value))}
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

export default LevelFilter;
