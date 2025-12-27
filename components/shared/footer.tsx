import { Button } from "../ui/button";
import { FaGithub, FaTelegram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full flex items-center justify-between h-[8vh] bg-sidebar bottom-0 px-4">
      <p className="text-muted-foreground text-md">
        Sammi.ac barcha huquqlar himoyalangan
      </p>

      <div className="flex items-center justify-center space-x-1">
        <Button variant={"outline"}>
          <FaTelegram />
        </Button>
        <Button variant={"outline"}>
          <FaYoutube />
        </Button>
        <Button variant={"outline"}>
          <FaGithub />
        </Button>
      </div>
    </div>
  );
};

export default Footer;
