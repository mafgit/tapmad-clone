'use client'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import WideRowCard from "./WideRowCard";
import { useRef } from "react";
import ICard from "@/app/models/ICard";
import NarrowRowCard from "./NarrowRowCard";
import Link from "next/link";

export default ({
  title,
  cards,
  row_type,
  row_i,
}: {
  title: string;
  cards: ICard[];
  row_type: string;
  row_i: number;
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={
        "cards-row flex flex-col gap-4 pr-0 h-max relative" +
        (row_type !== "slider" ? " px-6 " : "")
      }
    >
      {row_type !== "slider" ? (
        <div className="flex gap-2 items-center">
          <Link
            href="/"
            className="font-bold flex items-center justify-center gap-1"
          >
            <span>{title}</span>{" "}
            <span className="font-bold">
              <FaChevronRight />
            </span>
          </Link>
        </div>
      ) : (
        <></>
      )}
      <div
        ref={rowRef}
        className={
          "one-row flex gap-2 relative overflow-x-auto w-[100%] h-max scroll-smooth " +
          (row_type === "narrow" ? "min-h-[350px]" : "")
        }
        style={{ scrollbarWidth: "none" }}
      >
        {cards.map((card: ICard, card_i: number) =>
          row_type === "wide" ? (
            <WideRowCard key={row_i + "-" + card_i} card={card} />
          ) : row_type === "narrow" ? (
            <NarrowRowCard key={row_i + "-" + card_i} card={card} />
          ) : (
            <></>
          )
        )}
      </div>
      <button
        className="absolute left-[10px] top-1/2 -translate-y-1/2 rounded-full z-60 bg-black/50 cursor-pointer flex justify-center items-center w-[30px] h-[30px]"
        onClick={() => {
          rowRef.current?.scrollBy({
            left: row_type === "wide" ? -(350 + 8) : -(200 + 8),
            behavior: "smooth",
          });
        }}
      >
        <FaChevronLeft />
      </button>
      <button
        className="absolute right-[10px] top-1/2 -translate-y-1/2 rounded-full z-60 bg-black/50 cursor-pointer flex justify-center items-center w-[30px] h-[30px]"
        onClick={() => {
          rowRef.current?.scrollBy({
            left: row_type === "wide" ? 350 + 8 : 200 + 8,
            behavior: "smooth",
          });
        }}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};
