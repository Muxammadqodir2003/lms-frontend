"use client";

import { AppStore, store } from "@/store/store";
import { ChildProps } from "@/types";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

const StoreProvider = ({ children }: ChildProps) => {
  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) {
    storeRef.current = store();
  }

  useEffect(() => {
    console.log("render");
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
