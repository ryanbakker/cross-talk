import LogoImage from "@logos/cross-talk.svg";
import Link from "next/link";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" prefetch={false} className="overflow-hidden">
      <div className="flex items-center w-48 h-16">
        <AspectRatio
          ratio={16 / 9}
          className="flex items-center justify-center"
        >
          <Image
            priority
            src={LogoImage}
            alt="CrossTalk Logo"
            className="dark:filter dark:invert"
          />
        </AspectRatio>
      </div>
    </Link>
  );
};

export default Logo;
