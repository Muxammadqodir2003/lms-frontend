"use client";

import { useState } from "react";
import { Flex } from "@chakra-ui/react/flex";
import Description from "./description";
import Application from "./application";
import Comments from "./comments";
import Mentor from "./mentor";
import { Button } from "@chakra-ui/react/button";
import { BiUser } from "react-icons/bi";
import { BsPerson, BsStarFill } from "react-icons/bs";
import { LiaStickyNote } from "react-icons/lia";
import { ICourse } from "@/types";

interface Props {
  whatsLearn: string[];
  requirements: string[];
  description: string;
  course: ICourse;
}

const State = ({ course, whatsLearn, requirements, description }: Props) => {
  const [state, setState] = useState<
    "description" | "application" | "comments" | "mentor"
  >("description");

  return (
    <Flex w={"full"} flexDirection={"column"}>
      <Flex w={"full"}>
        <Button
          variant={"ghost"}
          w={"1/4"}
          onClick={() => setState("description")}
        >
          <BiUser size={10} /> Tavsif
        </Button>
        <Button
          variant={"ghost"}
          w={"1/4"}
          onClick={() => setState("application")}
        >
          <LiaStickyNote size={10} /> Dastur
        </Button>
        <Button
          variant={"ghost"}
          w={"1/4"}
          onClick={() => setState("comments")}
        >
          <BsStarFill size={10} /> Izohlar
        </Button>
        <Button variant={"ghost"} w={"1/4"} onClick={() => setState("mentor")}>
          <BsPerson size={10} /> Mentor
        </Button>
      </Flex>
      <Flex w={"full"} flexDirection={"row"}>
        <Flex
          w={"full"}
          h={state === "description" ? "2px" : "1px"}
          bg={state === "description" ? "blue.900" : "blue.500"}
        />
        <Flex
          w={"full"}
          h={state === "application" ? "2px" : "1px"}
          bg={state === "application" ? "blue.900" : "blue.500"}
        />
        <Flex
          w={"full"}
          h={state === "comments" ? "2px" : "1px"}
          bg={state === "comments" ? "blue.900" : "blue.500"}
        />
        <Flex
          w={"full"}
          h={state === "mentor" ? "2px" : "1px"}
          bg={state === "mentor" ? "blue.900" : "blue.500"}
        />
      </Flex>

      {state === "description" && (
        <Description
          description={description}
          whatsLearn={whatsLearn}
          requirements={requirements}
        />
      )}
      {state === "application" && <Application sections={course.sections} />}
      {state === "comments" && <Comments slug={course.slug} />}
      {state === "mentor" && <Mentor instructorId={course.instructorId} />}
    </Flex>
  );
};

export default State;
