import { Accordion } from "@chakra-ui/react/accordion";
import { Span } from "@chakra-ui/react/span";
import CategoryFilter from "./category-filter";
import LanguageFilter from "./language-filter";
import LevelFilter from "./level-filter";
import RatingFilter from "./rating-filter";

const items = [
  { value: "category", title: "By categories", component: CategoryFilter },
  { value: "language", title: "By languages", component: LanguageFilter },
  { value: "level", title: "By level", component: LevelFilter },
  { value: "rating", title: "By rating", component: RatingFilter },
];

const Filter = () => {
  return (
    <>
      <Accordion.Root collapsible defaultValue={["category"]}>
        {items.map((item, index) => (
          <Accordion.Item key={index} value={item.value}>
            <Accordion.ItemTrigger p={"3"}>
              <Span flex="1" fontSize={"xl"}>
                {item.title}
              </Span>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent p={"3"}>
              <item.component />
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </>
  );
};

export default Filter;
