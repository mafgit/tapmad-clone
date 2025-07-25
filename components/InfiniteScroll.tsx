"use client";
import { useEffect, useRef, useState } from "react";
import { getRows } from "../app/services/api/pages/home/home.services";
import IRow from "../models/IRow";
import Row from "@/components/Row";
import Slider from "@/components/Slider";
import ICard from "../models/ICard";

const InfiniteScroll = ({
  sliderCards,
  rows: initialRows,
}: {
  sliderCards: ICard[];
  rows: IRow[];
}) => {
  const from = useRef(4);
  const count = 4;
  const [rows, setRows] = useState<IRow[]>(initialRows);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const finished = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!finished.current && entry.isIntersecting) {
          setLoading(true);
          getRows(from.current, count)
            .then(({ rows: newRows }) => {
              // setRows(JSON.parse(JSON.stringify([...rows, ...newRows])));
              // if (from.current === 0) {
              //   setSliderCards(newRows[0].cards);
              //   setRows(newRows.slice(1));
              // } else {
              setRows((prevRows) => [...prevRows, ...newRows]);
              // }

              if (newRows.length < count) finished.current = true;
              else from.current += count;
            })
            .finally(() => {
              setLoading(false);
            });
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -100px 0px",
        threshold: 0,
      }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, []);

  return (
    <div className="rows flex flex-col gap-1">
      {sliderCards.length ? <Slider cards={sliderCards} /> : <></>}
      {rows.map((row: IRow, i: number) => (
        <Row
          title={row.title}
          cards={row.cards}
          row_i={i}
          row_type={row.type}
          key={"row-" + (i + 1)}
        />
      ))}

      {loading ? (
        <div className="mx-auto mt-4 mb-8 loader border-t-4 border-b-4 rounded-full  w-[40px] h-[40px] animate-spin text-[#37c673] z-50"></div>
      ) : (
        <></>
      )}

      <div className="load-more-ref" ref={loadMoreRef}></div>
    </div>
  );
};

export default InfiniteScroll;
