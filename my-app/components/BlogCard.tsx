import { BlogCardProps } from "@/types/types";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const BlogCard = ({ width, imgSrc, title, subtitle, text }: BlogCardProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className={`h-[${width}] w-full overflow-hidden rounded-3xl`}>
        <Image
          src={imgSrc}
          alt=""
          width={500}
          height={500}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex w-[300px] flex-col gap-2 border-2 border-blue-400">
        <h4 className="w-max rounded-full bg-black px-2 text-sm font-medium uppercase text-white">
          {title}
        </h4>
        <p className="whitespace-normal text-pretty break-words text-lg uppercase">
          {subtitle}
        </p>
        <p className="text-slate-500">{text}</p>
      </div>
    </div>
  );
};

export default BlogCard;
