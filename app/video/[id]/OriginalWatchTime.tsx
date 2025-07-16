
import { devLog, errorLog, storeVodEvents } from "services/apilinks";
import { post } from "services/http-service";
import { Cookie } from "services/cookies";
import { secondsToHMS, getDeviceId } from "services/utils";
import { authStore } from "stores/auth/auth";

const lastWatchedCookie = "lastVideoWatchTime";

async function addToWatchTime(payloads, isFetch, isLive) {
  if (!WatchTimeEvent.sessionEnded) {
    const videoDuration =
      payloads?.VideoDuration > 0
        ? payloads.VideoDuration
        : window?.jwplayer?.().getDuration?.() ?? 0;
    const checkIfGreater = payloads.EndTime > videoDuration - 15;
    if (!isLive && checkIfGreater) {
      // payloads.Duration = 0;
      payloads.SessionEnd = 1;
    }
    if (isFetch) {
      if (!isLive && checkIfGreater) {
        WatchTimeEvent.sessionEnded = true;
      }
      try {
        const newPayloads = { ...payloads };
        delete newPayloads.timeLapse;
        const res = await post(storeVodEvents, newPayloads);
        if (res.data.Response.responseCode != 1)
          throw new Error(res.data.Response.message);
      } catch (error) {
        errorLog(` addToWatchTime() => ${error.message}`);
      }
    }
    Cookie.setCookies(lastWatchedCookie, JSON.stringify(payloads));
  }
}

export function recentTimeIcrement(duration) {
  const format = secondsToHMS(duration);
  const seconds = +format.split(":")[2];
  return Math.floor(seconds);
}

let sessionEndInitiate = true;

export async function sessionEnd(complete = false) {
  if (sessionEndInitiate) {
    sessionEndInitiate = false;
    const payloads = Cookie.getCookies(lastWatchedCookie);
    if (payloads) {
      payloads.Duration = recentTimeIcrement(payloads.timeLapse);
      payloads.SessionEnd = 1;
      // if (complete) {
      //   payloads.Duration = 0;
      // }
      await addToWatchTime(payloads, true);
      Cookie.setCookies(lastWatchedCookie, 0, 0);
    }
    sessionEndInitiate = true;
  }
}

export default class WatchTimeEvent {
  incrementDuration = 60;
  incrementDurationVOD = 60;
  incrementDurationLive = 180;
  trigger = this.incrementDuration;
  timeLapse = 0;
  liveTimeLapse = 0;
  sessionId = null;
  totalDuration = 0;
  bufferEvent = false;
  lastTimelapse = 0;
  videoData = null;
  player = null;
  oldDuration = 0;
  liveTimerInterval = null;
  live = false;
  seek = true;
  guestTime = 0;
  initialTrigger = true;
  initialTrigger2 = true;
  static sessionEnded = false;

  constructor() {
    this.reset = this.reset.bind(this);
    this.increment = this.increment.bind(this);
    this.continue = this.continue.bind(this);
    this.initiate = this.initiate.bind(this);
    this.onTime = this.onTime.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onSeeked = this.onSeeked.bind(this);
    this.onSeek = this.onSeek.bind(this);
    this.onBuffer = this.onBuffer.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.liveIntervalInitate = this.liveIntervalInitate.bind(this);
    this.clearLiveInterval = this.clearLiveInterval.bind(this);
  }

  initiate(videoData) {
    const { userId } = authStore.getState();

    this.live = Boolean(videoData?.IsVideoChannel);
    const continueVideo = {
      true: {
        init: () => {},
        timer: this.incrementDurationLive,
      },
      false: {
        init: this.continue,
        timer: this.incrementDurationVOD,
      },
    }[this.live];
    if (this.sessionId == null) {
      this.player = window?.jwplayer?.();
      this.videoData = videoData;
      this.sessionId = new Date().getTime() + userId;
      // .on("pause", this.onPause);
      this.lastTimelapse = videoData.EndTime;
      this.incrementDuration = continueVideo.timer;
      this.trigger = this.incrementDuration;
    }
    continueVideo.init();
  }

  reset() {
    this.incrementDuration = 60;
    this.trigger = this.incrementDuration;
    this.timeLapse = 0;
    this.sessionId = null;
    this.totalDuration = 0;
    this.bufferEvent = false;
    this.lastTimelapse = 0;
    this.seek = true;
    this.guestTime = 0;
    this.initialTrigger = true;
    this.initialTrigger2 = true;

    this.clearLiveInterval();
    WatchTimeEvent.sessionEnded = false;
  }

  continue() {
    let currentTime = this.guestTime;
    if (this.sessionId) {
      if (this.timeLapse == 0 && this.videoData.IsVideoChannel == 0) {
        this.timeLapse = +this.videoData?.EndTime;
      }
      this.trigger = this.timeLapse + this.incrementDuration;
      currentTime = this.timeLapse;
    }
    const videoElement = document.querySelector("#tapmad-jwplayer video");
    if (videoElement) videoElement.currentTime = currentTime;
  }

  liveIntervalInitate() {
    if (this.sessionId) {
      this.clearLiveInterval();
      this.liveTimerInterval = setInterval(() => {
        this.liveTimeLapse += 1;
      }, 1e3);
    }
  }

  clearLiveInterval() {
    if (this.sessionId && this.liveTimerInterval)
      clearInterval(this.liveTimerInterval);
  }

  increment(Duration, isFetch) {
    const { userId } = authStore.getState();
    const { VideoName, VideoEntityId, VideoCategoryId } = this.videoData;
    const DeviceId = getDeviceId();
    const payloads = {
      Platform: "web",
      UserId: userId,
      VideoName,
      appVersion: "v2.3.2",
      SessionId: this.sessionId,
      EndTime: this.timeLapse,
      Duration,
      ChannelOrVODId: VideoEntityId,
      VideoCategoryId,
      VideoDuration: this.totalDuration,
      timeLapse: this.timeLapse - this.lastTimelapse,
      IsChannel: this.videoData.IsVideoChannel,
      IsCategory: Boolean(this.videoData.VideoCategoryId),
      DeviceId,
      isSports:
        this.videoData?.NewSportsFormat?.toLowerCase().includes("sport"),
    };

    addToWatchTime(payloads, isFetch, this.live);
  }

  onSeek(e) {
    devLog("on seek event");
    this.seek = true;

    if (this.live) {
      this.clearLiveInterval();
    }
  }

  onSeeked(e) {
    devLog("on seeked event");
  }

  onReady(e) {}

  onTime(e) {
    devLog("on time event");
    if (this.sessionId && !this.seek) {
      if (this.totalDuration == 0 && !this.live)
        this.totalDuration = Math.floor(this.player.getDuration());

      this.timeLapse = this.live ? this.liveTimeLapse : Math.floor(e.position);
      let isFetch = false;

      let durationWatched = this.timeLapse - this.lastTimelapse;

      if (this.timeLapse == this.trigger) {
        isFetch = true;
        this.lastTimelapse = this.timeLapse;
        this.trigger =
          this.timeLapse +
          (this.live ? this.incrementDurationLive : this.incrementDuration);
        durationWatched = this.incrementDuration;
      }

      let Duration =
        this.timeLapse < this.incrementDuration
          ? this.timeLapse
          : durationWatched;

      if (this.timeLapse == this.trigger && this.initialTrigger2) {
        this.initialTrigger2 = false;
        Duration = 4;
      }

      if (this.initialTrigger) {
        this.trigger = this.timeLapse + 3;
        this.initialTrigger = false;
      }

      if (Duration < this.incrementDuration && Duration > 0)
        this.oldDuration = Duration;

      this.increment(Duration, isFetch);
    } else if (!this.sessionId) {
      this.guestTime = Math.floor(e.position);
    }
  }

  onBuffer(e) {
    devLog("on buffer event");
    this.bufferEvent = true;
  }

  onPause() {
    devLog("on pause event");
    if (this.sessionId) {
      this.timeLapse = this.live
        ? this.timeLapse
        : Math.floor(this.player.getCurrentTime());
      const Duration = this.timeLapse - this.lastTimelapse;
      this.lastTimelapse = this.timeLapse;
      this.trigger += Duration;
      let sendDuration =
        Duration > this.incrementDuration || Duration < 0
          ? this.oldDuration
          : Duration;
      this.increment(sendDuration, true);

      if (this.live) {
        this.clearLiveInterval();
      }
    }
  }

  onPlay(e) {
    devLog("on play event");
    this.seek = false;

    let newDuration = Math.floor(this.player?.getCurrentTime?.() ?? 0);

    if (this.live) {
      newDuration = this.timeLapse;
    }

    this.lastTimelapse = newDuration;
    this.timeLapse = newDuration;
    this.oldDuration = newDuration;
    this.trigger = newDuration + this.incrementDuration;
    this.bufferEvent = false;

    if (this.live) {
      this.liveTimeLapse = newDuration;
      this.liveIntervalInitate();
    }

    if (WatchTimeEvent.sessionEnded) {
      WatchTimeEvent.sessionEnded = false;
    }
  }
}
