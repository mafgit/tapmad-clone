import InfiniteScroll from "@/components/InfiniteScroll";
import { getRows } from "./services/api/pages/home/home.services";

export default async function Home() {
  const { rows } = await getRows(0, 4);

  return <div className="overflow-x-hidden">{rows.length ? <InfiniteScroll sliderCards={rows[0].cards} rows={rows.slice(1)} /> : <></>}</div>;
}
