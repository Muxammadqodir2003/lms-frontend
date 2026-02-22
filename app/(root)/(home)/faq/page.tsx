import { Metadata } from "next";
import FaqContent from "./faq.content";

export const metadata: Metadata = {
  title: "FAQ Page",
};

const Page = () => {
  return <FaqContent />;
};

export default Page;
