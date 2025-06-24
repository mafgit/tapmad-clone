"use client";

import { sendAnalytics } from "@/app/services/api/pages/video/video.services";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    jwplayer: any;
  }
}

const LIVE_INTERVAL_DURATION = 10000;
const NORMAL_INTERVAL_DURATION = 5000;

const generateRandomId = () => {
  let chars = "abcdefghijklmnopqrstuvwxyz-0123456789";
  let str = "";

  for (let i = 0; i < 18; i++) {
    let idx = Math.floor(Math.random() * chars.length);
    str += chars[idx];
  }

  return str;
};

const JWPlayer = ({
  file,
  image,
  aspectratio = "16:9",
  live,
  id,
}: {
  file: string;
  image: string;
  aspectratio?: string;
  live: boolean;
  id: string;
}) => {
  const videoPlayerRef = useRef<HTMLDivElement | null>(null);
  const interval = useRef<NodeJS.Timeout | null>(null);
  const lastReference = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    console.log("asdasdasd", live);

    const userId = generateRandomId();
    const deviceId = generateRandomId();

    if (!document.getElementById("jwplayer-script")) {
      const script = document.createElement("script");
      script.id = "jwplayer-script";
      script.src = "https://cdn.jwplayer.com/libraries/TPQRzCL9.js";

      script.async = true;
      script.onload = initializePlayer;
      document.body.appendChild(script);
    } else {
      initializePlayer();
    }

    function initializePlayer() {
      if (window.jwplayer && videoPlayerRef.current) {
        const player = window.jwplayer(videoPlayerRef.current);

        player.setup({
          file,
          image,
          width: "80%",
          aspectratio,
          autostart: false,
        });

        const intervalDuration = live
          ? LIVE_INTERVAL_DURATION
          : NORMAL_INTERVAL_DURATION;
        console.log("bbbbbbb", intervalDuration);

        async function onPlay() {
          lastReference.current = Date.now();

          interval.current = setInterval(async () => {
            const args = {
              videoId: id,
              userId,
              deviceId,
              platform: "web",
              position: player.getPosition(),
              videoDuration: player.getDuration(),
              lastReference: lastReference.current,
            };
            await sendAnalytics(args);
            lastReference.current = Date.now();
          }, intervalDuration);
        }

        player.on("play", onPlay);
        // player.on("time", (e: any) => {
        //   console.log(e)
        // });

        player.on("pause", async () => {
          if (interval.current) clearInterval(interval.current);
          const args = {
            videoId: id,
            userId,
            deviceId,
            platform: "web",
            position: player.getPosition(),
            videoDuration: player.getDuration(),
            lastReference: lastReference.current,
          };
          await sendAnalytics(args);
          lastReference.current = null;
        });

        player.on("error", (e: any) => {
          console.log(e);
          if (interval.current) {
            clearInterval(interval.current);
            interval.current = null;
          }
          lastReference.current = null;
        });

        player.on("seek", async () => {
          if (interval.current) {
            clearInterval(interval.current);
            interval.current = null;
          }
          lastReference.current = null;
        });

        player.on("seeked", onPlay);
      }
    }

    return () => {
      if (window.jwplayer) {
        const player = window.jwplayer(videoPlayerRef.current);
        if (player) {
          player.off("play");
          player.off("pause");
          player.off("seek");
          player.off("seeked");
          player.off("error");
          if (interval.current) {
            clearInterval(interval.current);
            interval.current = null;
          }
        }
      }
    };
  }, []);

  return <div ref={videoPlayerRef}></div>;
};

export default JWPlayer;
