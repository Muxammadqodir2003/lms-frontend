"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id }: { id: number }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <div className="flex flex-col items-center justify-center w-[200px] h-[30px] bg-sky-500 mt-4">
        <h1 className="text-2xl">{id}</h1>
      </div>
    </div>
  );
};

export default SortableItem;
