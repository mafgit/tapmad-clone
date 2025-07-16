"use client";
import ICard from "@/models/ICard";
import Image from "next/image";
import { toNormalDate } from "./SliderCard";
import { FaPlay } from "react-icons/fa6";
import Link from "next/link";

const WideRowCard = ({ card }: { card: ICard }) => {
  // 'hover:scale-x-105 origin-left hover:z-50 duration-400 hover:mr-[20px] transition-all '
  return (
    <Link
      href={`/video/${card.id}`}
      className="one-card flex flex-col gap-1 w-[350px] h-[300px] relative cursor-pointer rounded-xl"
    >
      <div className="w-full max-h-[220px] min-w-[350px] h-full relative">
        <Image
          src={card.image_url}
          width={350}
          height={300}
          alt=""
          className="contrast-125 saturate-150 shadow-xl w-full max-h-[220px] min-w-[350px] h-full rounded-xl object-cover"
        />
        {card.is_video ? (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/20">
            <FaPlay className="text-2xl" />
          </div>
        ) : (
          <></>
        )}
      </div>

      {card.date_time || card.is_live ? (
        <div className="absolute top-0 left-0 w-max p-2 text-sm font-bold text-black rounded-sm rounded-tl-md bg-[#37c673]">
          {card.date_time ? (
            <span>{toNormalDate(card.date_time, true)}</span>
          ) : card.is_live ? (
            <div className="w-full h-full flex items-center justify-center gap-1">
              <span className="rounded-full w-[6px] h-[6px] block bg-black"></span>
              <span>Live</span>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}

      <div className="flex flex-col pt-2 px-1">
        <h3 className="font-bold text-md">{card.title}</h3>
        <p className="text-gray-500 text-sm">{card.description}</p>
      </div>
    </Link>
  );
};

export default WideRowCard;
