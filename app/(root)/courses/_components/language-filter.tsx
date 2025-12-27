"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { VStack } from "@chakra-ui/react/stack";
import { RadioGroup } from "@chakra-ui/react/radio-group";
import { filterByLanguage } from "@/store/courses/courses.slice";

const items = [
  { label: "Uz", value: "uz" },
  { label: "Ru", value: "ru" },
  { label: "En", value: "en" },
  { label: "Tu", value: "tu" },
];

const LanguageFilter = () => {
  const coursesState = useAppSelector((state) => state.courses);
  const dispatch = useAppDispatch();

  return (
    <RadioGroup.Root
      value={coursesState.language}
      onValueChange={(e) => dispatch(filterByLanguage(e.value))}
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

export default LanguageFilter;
