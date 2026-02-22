"use client";

import { filterByLevel } from "@/store/filters/filters.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RadioGroup } from "@chakra-ui/react/radio-group";
import { Flex } from "@chakra-ui/react/flex";

const items = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermidate", value: "intermidate" },
  { label: "Advanced", value: "advanced" },
];

const LevelFilter = () => {
  const coursesState = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  return (
    <RadioGroup.Root
      value={coursesState.level}
      onValueChange={(e) => dispatch(filterByLevel(e.value))}
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

export default LevelFilter;
