import { Metadata } from "next";
import PricesContent from "./prices.content";

export const metadata: Metadata = {
  title: "Prices Page",
};

const Page = () => {
  return <PricesContent />;
};

export default Page;
