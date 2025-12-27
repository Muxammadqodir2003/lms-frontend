"use client";

import { ChildProps } from "@/types";
import { Provider } from "../ui/provider";

export default function ChakraProvider({ children }: ChildProps) {
  return <Provider>{children}</Provider>;
}
