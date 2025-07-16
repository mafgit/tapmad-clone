"use client";
import ICard from "@/models/ICard";
import Image from "next/image";

export const toNormalDate = (date: string, year: boolean = false) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: year ? "numeric" : undefined,
    month: "long",
    day: "numeric",
    // timeZone: "UTC",
  });
  // return new Intl.DateTimeFormat(undefined, {
  //   dateStyle: "short"
  // }).format(new Date(date));
};

const SliderCard = ({ card, active }: { card: ICard; active: boolean }) => {
  // const width = window.innerWidth;
  //   const cardWidth = Math.floor(width / 3);
  //   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const normalizedStart = toNormalDate(card.start_date!);
  const normalizedEnd = toNormalDate(card.end_date!);

  return (
    <div
      className={`flex flex-col gap-1 min-w-[430px] min-h-[500px] relative `}
    >
      <div className="relative h-full min-h-full w-full">
        <Image
          src={card.image_url}
          alt=""
          width={430}
          height={500}
          className={
            "w-full h-[500px] contrast-125 brightness-105 saturate-150 min-w-full min-h-[500px] rounded-xl object-cover transition-all duration-500 ease-in-out " +
            (active ? "grayscale-0" : "grayscale contrast-150 brightness-110")
          }
        />
        <div className="absolute top-0 rounded-t-xl left-0 w-full h-[70%] bg-gradient-to-b from-transparent from-0% via-70% via-black/50 to-100% to-black/50"></div>
        <div className="absolute top-[70%] rounded-b-xl left-0 w-full h-[30%] from-0% from-black/50 bg-gradient-to-b to-100% to-black"></div>
      </div>

      <div
        className={
          "absolute bottom-[40px] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center transition-all duration-300 ease-in-out " +
          (active ? "opacity-100" : "opacity-0")
        }
      >
        <h1 className="font-bold text-xl w-max uppercase">{card.title}</h1>
        <span>
          {normalizedStart}
          {normalizedStart !== normalizedEnd ? " - " : ""}
          {normalizedStart !== normalizedEnd ? normalizedEnd : <></>}
        </span>
        <button className="bg-[#37c673] px-6 mt-3 py-2 rounded-full w-max z-40 font-bold uppercase text-black">
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default SliderCard;
