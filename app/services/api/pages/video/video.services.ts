import { endpoint } from "./video.endpoint";

export const getVideoDetails = async (id: string) => {
  try {
    const url = endpoint + "/" + id.trim();
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return { error: e };
  }
};

export const sendAnalytics = async ({
  videoId,
  userId,
  deviceId,
  platform,
  position,
  videoDuration,
  lastReference,
  totalTimePlayed,
  currentDate,
}: {
  videoId: string;
  userId: string;
  deviceId: string;
  platform: string;
  position: number;
  videoDuration: number;
  lastReference: number | null;
  totalTimePlayed: number;
  currentDate: number;
}) => {
  try {
    const url = endpoint + "/" + videoId.trim();
    if (lastReference) {
      const duration = (currentDate - lastReference) / 1000;
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          videoId,
          userId,
          deviceId,
          platform,
          position: Math.round(position),
          duration: Math.round(duration),
          totalTimePlayed: Math.round(totalTimePlayed / 1000),
          videoDuration: Math.round(videoDuration),
        }),
      });
      const data = await res.json();
      return data;
    } else {
      return {};
    }
  } catch (e) {
    console.log(e);
    return { error: e };
  }
};
