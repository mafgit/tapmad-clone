import ICard from "@/app/models/ICard";
import Image from "next/image";
import { toNormalDate } from "./SliderCard";

export default ({ card }: { card: ICard }) => {
  return (
    <div className="one-card flex flex-col gap-1 min-w-[200x] w-[200px] h-[300px] relative hover:scale-x-110 origin-center hover:z-50 duration-400 hover:mx-[20px] transition-all cursor-pointer rounded-xl">
      <Image
        src={card.image_url}
        width={300}
        height={200}
        alt=""
        className="contrast-125 origin-center saturate-150 shadow-xl w-full max-h-[300px] min-w-[200px] h-full rounded-xl object-cover"
      />
      <span className="absolute top-0 left-0 w-max p-2 text-sm font-bold text-black rounded-sm rounded-tl-md bg-[#37c673]">
        {toNormalDate(card.date_time!, true)}
      </span>
      <div className="flex flex-col pt-2 px-1">
        <h3 className="font-bold text-md">{card.title}</h3>
        <p className="text-gray-500 text-sm">{card.description}</p>
      </div>
    </div>
  );
};
