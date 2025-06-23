import { endpoint } from "./home.endpoint";

export const getRows = async (from: number, count: number) => {
  try {
    const response = await fetch(
      endpoint + "?from=" + from + "&count=" + count,
      { next: { revalidate: 60 } }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
