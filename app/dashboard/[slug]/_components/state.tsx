"use client";

import { useSearchParams } from "next/navigation";
import LessonWatch from "./lesson-watch";
import Redirect from "./redirect";

interface StateProps {
  slug: string;
}

const State = ({ slug }: StateProps) => {
  const seacrchParams = useSearchParams();
  const lessonId = seacrchParams.get("lessonId");

  return (
    <div>
      {lessonId && <LessonWatch slug={slug} lessonId={lessonId} />}
      {!lessonId && <Redirect slug={slug} />}
    </div>
  );
};

export default State;
