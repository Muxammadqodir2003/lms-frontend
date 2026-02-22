import { Metadata } from "next";
import AboutContent from "./about.content";

export const metadata: Metadata = {
  title: "Biz haqimizda | LMS Platform",
  description: "Platformamiz va jamoamiz haqida batafsil ma'lumot",
};

export default function AboutPage() {
  return <AboutContent />;
}
