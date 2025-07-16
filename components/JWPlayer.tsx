"use client";

import { sendAnalytics } from "@/app/services/api/pages/video/video.services";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    jwplayer: any;
  }
}

const LIVE_TIMEOUT_DURATION = 10000;
const NORMAL_TIMEOUT_DURATION = 10000;

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
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const lastReference = useRef<number | null>(null);
  const playerCopy = useRef<any>(null);
  const isPaused = useRef<boolean>(true);
  const totalTimePlayed = useRef(0);
  const MAX_VIDEO_COOKIES = 2;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

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
        playerCopy.current = player;

        player.setup({
          file,
          image,
          width: "100%",
          aspectratio,
          autostart: false,
        });

        const timeoutDuration = live
          ? LIVE_TIMEOUT_DURATION
          : NORMAL_TIMEOUT_DURATION;

        const readCookie = () => {
          if (live) return;
          const splitted = document.cookie.split("; ");
          if (splitted.length > 0) {
            for (const word of splitted) {
              console.log(word);
              if (word.startsWith(`position_${id}=`)) {
                const wordSplitted = word.split("=");
                if (wordSplitted.length === 2) {
                  player.seek(parseInt(wordSplitted[1].split(",")[0]));
                }
              }
            }
          }
        };

        player.on("ready", () => {
          readCookie();

          function stopAnalytics() {
            if (timeout.current) {
              clearTimeout(timeout.current);
            }
            timeout.current = null;
            lastReference.current = null;
          }

          async function onPlay() {
            isPaused.current = false;
            async function recursive() {
              stopAnalytics();
              const currentDate = Date.now();
              lastReference.current = currentDate;

              timeout.current = setTimeout(async () => {
                const currentDate = Date.now();
                totalTimePlayed.current += lastReference.current
                  ? currentDate - lastReference.current
                  : 0;

                const args = {
                  videoId: id,
                  userId,
                  deviceId,
                  platform: "web",
                  position: player.getPosition(),
                  totalTimePlayed: totalTimePlayed.current,
                  videoDuration: player.getDuration(),
                  lastReference: lastReference.current,
                  currentDate,
                };

                await sendAnalytics(args);
                return await recursive();
              }, timeoutDuration);
            }

            await recursive();
          }

          player.on("play", onPlay);
          // player.on("time", (e: any) => {
          //   console.log(e)
          // });

          player.on("pause", async () => {
            isPaused.current = true;
            const currentDate = Date.now();
            totalTimePlayed.current += lastReference.current
              ? currentDate - lastReference.current
              : 0;

            const args = {
              videoId: id,
              userId,
              deviceId,
              platform: "web",
              position: player.getPosition(),
              totalTimePlayed: totalTimePlayed.current,
              videoDuration: player.getDuration(),
              lastReference: lastReference.current,
              currentDate,
            };
            await sendAnalytics(args);
            lastReference.current = null;
            stopAnalytics();
          });

          player.on("error", (e: any) => {
            console.log(e);
            stopAnalytics();
          });

          player.on("seek", async () => {
            const currentDate = Date.now();
            totalTimePlayed.current += lastReference.current
              ? currentDate - lastReference.current
              : 0;
            stopAnalytics();
          });

          player.on("seeked", async () => {});
        });
      }
    }

    return () => {};
  }, [id]);

  useEffect(() => {
    function saveCookie() {
      const player = playerCopy.current;
      if (!player || live) {
        return;
      }

      const splitted = document.cookie.split("; ");
      let oldestDateAdded = Infinity;
      let oldestVideoId = "";
      let totalVideoCookies = 0;

      if (splitted.length > 0) {
        for (const word of splitted) {
          if (word.startsWith(`position_`)) {
            totalVideoCookies++;
            const wordSplitted = word.split("=");
            if (wordSplitted.length === 2) {
              const key = wordSplitted[0];
              const value = wordSplitted[1];
              const dateAdded = parseInt(value[1]);
              if (dateAdded < oldestDateAdded) {
                oldestDateAdded = dateAdded;
                oldestVideoId = key.split("_")[1];
              }
            }
          }
        }
      }

      console.log("odldest", oldestVideoId);

      if (totalVideoCookies >= MAX_VIDEO_COOKIES) {
        if (oldestVideoId && oldestVideoId !== id)
          document.cookie = `position_${oldestVideoId}=; path=/video; max-age=0`;
      }

      if (
        !live &&
        playerCopy.current &&
        typeof playerCopy.current.getPosition === "function"
      ) {
        const pos = Math.floor(playerCopy.current.getPosition());
        document.cookie = `position_${id}=${pos},${Math.round(
          Date.now() / 1000
        )}; path=/video; max-age=604800`;
      }
    }

    window.addEventListener("beforeunload", saveCookie);

    return () => {
      window.removeEventListener("beforeunload", saveCookie);
      const player = playerCopy.current;
      saveCookie();
      if (player) {
        player.off("play");
        player.off("pause");
        player.off("seek");
        player.off("seeked");
        player.off("error");
        if (timeout.current) {
          clearTimeout(timeout.current);
          timeout.current = null;
        }
        player.remove?.();
      }
    };
  }, []);

  return <div ref={videoPlayerRef}></div>;
};

export default JWPlayer;
