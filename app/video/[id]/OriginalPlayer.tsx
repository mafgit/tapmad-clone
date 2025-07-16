// ts-nocheck
import { memo, useEffect, useState } from "react";
import WatchTimeEvent, { sessionEnd } from "./OriginalWatchTime";
import { useRouter } from "next/router";
import watctPageStyle from "scss/components/watch/watchPage.module.scss";
import JWPlayer from "@jwplayer/jwplayer-react";

const watchTimeEvent = new WatchTimeEvent();

let disableStream = 0;

const Player = ({ movies, loggedin, checkIfgoogle, allowUser, ip }) => {
  let streamUrlType = 0;
  const playerStateContext = useState(defaultError(loggedin, allowUser));
  const [playerState, setPlayerState] = playerStateContext;
  const router = useRouter();
  const threshold = Boolean(movies.Video.StreamSwitchThreshold)
    ? movies.Video.StreamSwitchThreshold
    : 1;
  let advertisementObj = {};
  if (movies.Video?.IsPreRoll == true && !checkIfgoogle) {
    advertisementObj.advertising = {
      client: "vast",
      tag: movies.Video.AdTag,

      adscheduleid: "Az87bY12",

      schedule: [
        {
          tag: movies.Video.AdTag,
        },
      ],
      rules: {
        startOn: 0,
        frequency: 0,
      },
    };
  }
  const mediaId = movies?.Video?.JWMediaId;

  const handleOnError = (e) => {
    // Check if online and back up URL exist!
    if (navigator.onLine && movies.Video.IsStreamSwtichAllowed) {
      const player = document.getElementById("tapmad-jwplayer");
      player.classList.add("jw-hide-error");
      streamUrlType =
        streamUrlType === playerState.links.length - 1 ? 0 : streamUrlType + 1;

      disableStream ??= threshold * playerState.links.length;
      --disableStream;
      if (disableStream < 1) {
        setPlayerState((prevState) => ({
          view: 2,
          links: prevState.links,
          error: "",
        }));
        streamErrorHandler(e);
      } else {
        player.classList.remove("jw-hide-error");
        const file = playerState.links[streamUrlType];
        jwplayer().load({ file }).play();
      }

      VideoError(e, movies.Video);
      sessionEnd();
    } else {
      streamErrorHandler(e);
    }
  };

  const options = {
    id: "tapmad-jwplayer",
    library: "https://cdn.jwplayer.com/libraries/TPQRzCL9.js",
    autoplayMute: false,
    file: playerState?.links?.[0],
    mute: false,
    advertising: advertisementObj?.advertising,
    pipIcon: "enabled",
    // sharing:{{}}
    mediaid: mediaId,
    mediaId: mediaId,
    media_id: mediaId,
    config: {
      logo: {
        hide: true, // Ensures the logo is hidden
      },
    },
    controls: true,
    autoPause: {
      viewability: false,
    },
    cast: {
      appid: "C9C71D00",
    },
    aspectratio: "16:9",
    floating: {
      dismissible: true,
    },
    playlist: playerState.links?.[0]?.playlist,
  };

  const events = {
    onReady: (e) => {
      disableStream = threshold * playerState.links.length;
      import("./Youbora.service").then((module) => module.default(movies));
      // dispatchEvent(new Event("jwPlayerCreated"));
      watchTimeEvent.initiate(movies.Video);
    },
    onAdPlay: playerAnalytics.videoOnAdsPlay,
    onTime: (e) => {
      watchTimeEvent.onTime(e);
      playerAnalytics.videoQuartileEvent(e); // Video Watch Event Triggered
      watchTimeEvent.onReady(e);
    },
    onBuffer: (e) => {
      playerAnalytics.videoOnBuffer(e, ip);
      if (!window.navigator.onLine && e.reason == "buffering") {
        setPlayerState({
          view: 2,
          links: null,
          error: {
            status: 2,
            message: "Please ensure your device is connected to the Internet!",
          },
        });
      }
      watchTimeEvent.onBuffer(e);
    },
    onPlay: (e) => {
      disableStream = threshold * playerState.links.length;
      // playerAnalytics.videoWatchedEvent();
      watchTimeEvent.onPlay(e);
    },
    onPause: (e) => {
      watchTimeEvent.onPause(e, true, movies);
    },
    onSeeked: (e) => {
      watchTimeEvent.onSeeked(e);
    },
    onSeek: (e) => {
      watchTimeEvent.onSeek(e);
    },
    onComplete: () => {
      sessionEnd();
      playerAnalytics.videoOnEnd(allowUser, movies?.videoLinks);
    },
    onError: handleOnError,
    onSetupError: handleOnError,
  };
  const jwplayerProps = { ...options, ...events };
  const components = {
    0: () => <PlayerLogoLoader watctPageStyle={watctPageStyle} />,
    1: () => {
      return <JWPlayer {...jwplayerProps} />;
    },
    2: () => (
      <PlayerError
        playerState={playerState}
        setPlayerState={setPlayerState}
        video={movies.Video}
        ip={ip}
      />
    ),
  };

  const streamErrorHandler = (e) => {
    const codes = [230002, 232002, 221000];
    window.videoWatched = true;
    let message = e.message;
    if (codes.includes(e.code)) {
      message =
        "There was an issue connecting, please resume the stream to continue";
    }
    setPlayerState((prevState) => ({
      ...prevState,
      view: 2,
      error: { status: 2, message },
    }));
    VideoError(e, movies.Video);
    sessionEnd();
  };

  // Decrypt video links
  useEffect(() => {
    import("services/crypto").then(async (module) => {
      movies.Video.videoLink = module.default.decryptVOD(movies.videoLinks);
      let obj = {
        view: 1,
        links: movies.Video.videoLink,
      };
      if (movies?.videoLinks?.length) {
        if (movies.Video.IsDrm) {
          const drmPlaylist = await getDrmPlaylist(movies.Video.videoLink);
          movies.Video.videoLink = drmPlaylist;
          obj.links = drmPlaylist;
        }
      } else {
        obj = {
          view: 2,
          error: {
            status: 1,
            message:
              movies?.Response?.message ??
              "Please ensure your device is connected to the Internet!",
          },
        };
        if (isAuthentictedUser()) {
          obj.status = 2;
        }
      }
      if (movies.Response.responseCode !== 220) {
        if (playerState.view === 1 && obj?.links?.[0]) {
          playerAnalytics.videoOnEnd(allowUser, movies?.videoLinks);
          playerEnd(watchTimeEvent, playerAnalytics);
          watchTimeEvent.initiate(movies.Video);
          playerAnalytics.movies = movies;
          const player = jwplayer();
          jwplayer().setup({
            ...options,
            playlist: obj?.links?.[0]?.playlist,
            file: obj?.links?.[0],
          });
          Object.keys(events).forEach((event) => {
            const eventName = event.slice(2, 20).toLowerCase();
            player.on(eventName, events[event]);
          });
        } else setPlayerState(obj);
      } else {
        obj.error.status = 0;
        setPlayerState(obj);
      }
    });
  }, [movies?.videoLinks]);

  // GTM and Watch Time Session End event trigger for leaving page
  // useEffect(() => {
  //   router.beforePopState(({ as }) => {
  //     if (as !== router.asPath) {
  //       playerAnalytics.videoOnEnd(allowUser, movies?.videoLinks);
  //       playerEnd(watchTimeEvent, playerAnalytics);
  //     }
  //     return true;
  //   });
  // }, [router, loggedin, allowUser]);

  const handleNetworkOnline = () => {
    // disableStream = threshold * playerState.links.length;
    setPlayerState((prevState) => ({
      view: 1,
      links: prevState.links,
    }));
  };

  // Watch time reset on cleanup and rendered first time
  useEffect(() => {
    playerAnalytics.movies = movies;

    window.addEventListener("online", handleNetworkOnline);

    return () => {
      // window?.jwplayer?.()?.remove?.();
      playerEnd(watchTimeEvent, playerAnalytics);
    };
  }, []);

  // Watch time reset on router change
  useEffect(() => {
    playerAnalytics.movies = movies;
  }, [router]);

  // Sportbuff disabled
  // useEffect(() => {
  //   if (
  //     playerRef.current &&
  //     movies?.Video?.IsSportsBuff &&
  //     AuthState.sensitive
  //   ) {
  //     if (window.SportBuff) {
  //       sportBuffInit(playerRef.current, movies?.Video?.StreamId);
  //     } else {
  //       window.onSportBuffReady = () =>
  //         sportBuffInit(playerRef.current, movies?.Video?.StreamId);
  //     }
  //   }
  // }, [playerRef, AuthState]);
  return components?.[playerState.view]?.();
};

export default memo(Player);
