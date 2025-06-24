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
}: {
  videoId: string;
  userId: string;
  deviceId: string;
  platform: string;
  position: number;
  videoDuration: number;
  lastReference: number | null;
}) => {
  try {
    const url = endpoint + "/" + videoId.trim();
    let duration = 0;
    if (lastReference) {
      duration = (Date.now() - lastReference) / 1000
    }

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        videoId,
        userId,
        deviceId,
        platform,
        position: Math.round(position),
        duration: Math.round(duration),
        videoDuration: Math.round(videoDuration),
      }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return { error: e };
  }
};
