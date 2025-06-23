import { endpoint } from "./home.endpoint";

export const getRows = async (from: number, count: number) => {
  const isServer = typeof window === "undefined";

  try {
    const response = await fetch(
      endpoint + "?from=" + from + "&count=" + count,
      isServer ? { next: { revalidate: 60 } } : { cache: "no-store" }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { rows: [] };
  }
};
