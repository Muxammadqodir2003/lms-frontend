import { Metadata } from "next";
import ContactContent from "./contact.content";

export const metadata: Metadata = {
  title: "Contact Page",
};

const Page = () => {
  return <ContactContent />;
};

export default Page;
