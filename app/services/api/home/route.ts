import { type NextRequest, NextResponse } from "next/server"

const db = [
  {
    "type": "slider",
    "title": "Featured Sports Events",
    "cards": [
      {
        "title": "Champions League Final",
        "start_date": "2025-06-24 05:44",
        "end_date": "2025-06-24 09:44",
        "image_url": "https://picsum.photos/1080/1087?random=1"
      },
      // {
      //   "title": "Wrestling Showdown",
      //   "start_date": "2025-06-27 01:20",
      //   "end_date": "2025-06-27 02:20",
      //   "image_url": "https://picsum.photos/1080/1087?random=2"
      // },
      {
        "title": "World Cup Qualifier",
        "start_date": "2025-06-26 13:38",
        "end_date": "2025-06-26 17:38",
        "image_url": "https://picsum.photos/1080/1087?random=3"
      },
      {
        "title": "Tennis Open Semis",
        "start_date": "2025-06-29 14:50",
        "end_date": "2025-06-29 19:50",
        "image_url": "https://picsum.photos/1080/1087?random=4"
      },
      {
        "title": "Olympic Trials",
        "start_date": "2025-06-20 14:09",
        "end_date": "2025-06-20 17:09",
        "image_url": "https://picsum.photos/1080/1087?random=5"
      },
      {
        "title": "Tennis Open Semis",
        "start_date": "2025-06-20 19:46",
        "end_date": "2025-06-20 21:46",
        "image_url": "https://picsum.photos/1080/1087?random=6"
      },
      {
        "title": "Wrestling Showdown",
        "start_date": "2025-06-28 07:44",
        "end_date": "2025-06-28 08:44",
        "image_url": "https://picsum.photos/1080/1087?random=7"
      },
      {
        "title": "Olympic Trials",
        "start_date": "2025-06-21 20:17",
        "end_date": "2025-06-22 00:17",
        "image_url": "https://picsum.photos/1080/1087?random=8"
      },
      {
        "title": "Olympic Trials",
        "start_date": "2025-06-26 05:39",
        "end_date": "2025-06-26 10:39",
        "image_url": "https://picsum.photos/1080/1087?random=9"
      },
      {
        "title": "Tennis Open Semis",
        "start_date": "2025-06-27 10:03",
        "end_date": "2025-06-27 13:03",
        "image_url": "https://picsum.photos/1080/1087?random=10"
      }
    ]
  },
  {
    "type": "wide",
    "title": "Wide Row 1",
    "cards": [
      {
        "title": "Tournaments Event 1",
        "description": "Don't miss it!",
        "image_url": "https://picsum.photos/540/302?random=21",
        "date_time": "2025-06-20 15:44"
      },
      {
        "title": "Matches Event 2",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/540/302?random=22",
        "date_time": "2025-06-26 04:07"
      },
      {
        "title": "Events Event 3",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/540/302?random=23",
        "date_time": "2025-06-30 18:40"
      },
      {
        "title": "Events Event 4",
        "description": "Epic moments await",
        "image_url": "https://picsum.photos/540/302?random=24",
        "date_time": "2025-06-27 19:48"
      },
      {
        "title": "Sports Event 5",
        "description": "Coming soon",
        "image_url": "https://picsum.photos/540/302?random=25",
        "date_time": "2025-06-24 08:17"
      },
      {
        "title": "Tournaments Event 6",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/540/302?random=26",
        "date_time": "2025-06-24 15:24"
      },
      {
        "title": "Entertainment Event 7",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/540/302?random=27",
        "date_time": "2025-06-20 12:31"
      },
      {
        "title": "Tournaments Event 8",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/540/302?random=28",
        "date_time": "2025-07-10 03:35"
      },
      {
        "title": "Entertainment Event 9",
        "description": "Coming soon",
        "image_url": "https://picsum.photos/540/302?random=29",
        "date_time": "2025-07-08 15:28"
      },
      {
        "title": "Entertainment Event 10",
        "description": "Coming soon",
        "image_url": "https://picsum.photos/540/302?random=30",
        "date_time": "2025-06-23 00:08"
      }
    ]
  },
  {
    "type": "wide",
    "title": "Wide Row 2",
    "cards": [
      {
        "title": "Events Event 1",
        "description": "Don't miss it!",
        "image_url": "https://picsum.photos/540/302?random=41",
        "date_time": "2025-06-21 11:02"
      },
      {
        "title": "Events Event 2",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/540/302?random=42",
        "date_time": "2025-07-06 14:08"
      },
      {
        "title": "Sports Event 3",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/540/302?random=43",
        "date_time": "2025-06-26 04:43"
      },
      {
        "title": "Matches Event 4",
        "description": "Don't miss it!",
        "image_url": "https://picsum.photos/540/302?random=44",
        "date_time": "2025-07-03 13:46"
      },
      {
        "title": "Entertainment Event 5",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/540/302?random=45",
        "date_time": "2025-07-02 11:00"
      },
      {
        "title": "Tournaments Event 6",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/540/302?random=46",
        "date_time": "2025-06-24 12:28"
      },
      {
        "title": "Entertainment Event 7",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/540/302?random=47",
        "date_time": "2025-06-27 10:45"
      },
      {
        "title": "Sports Event 8",
        "description": "Epic moments await",
        "image_url": "https://picsum.photos/540/302?random=48",
        "date_time": "2025-06-25 10:58"
      },
      {
        "title": "Entertainment Event 9",
        "description": "Live coverage",
        "image_url": "https://picsum.photos/540/302?random=49",
        "date_time": "2025-07-01 09:51"
      },
      {
        "title": "Matches Event 10",
        "description": "Coming soon",
        "image_url": "https://picsum.photos/540/302?random=50",
        "date_time": "2025-06-30 06:59"
      },
      {
        "title": "Matches Event 11",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/540/302?random=51",
        "date_time": "2025-06-30 17:24"
      },
      {
        "title": "Matches Event 12",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/540/302?random=52",
        "date_time": "2025-07-08 11:17"
      },
      {
        "title": "Sports Event 13",
        "description": "Live coverage",
        "image_url": "https://picsum.photos/540/302?random=53",
        "date_time": "2025-07-07 23:01"
      },
      {
        "title": "Tournaments Event 14",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/540/302?random=54",
        "date_time": "2025-06-28 08:24"
      },
      {
        "title": "Matches Event 15",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/540/302?random=55",
        "date_time": "2025-06-24 06:52"
      },
      {
        "title": "Tournaments Event 16",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/540/302?random=56",
        "date_time": "2025-07-08 00:02"
      }
    ]
  },
  {
    "type": "wide",
    "title": "Wide Row 3",
    "cards": [
      {
        "title": "Sports Event 1",
        "description": "Coming soon",
        "image_url": "https://picsum.photos/540/302?random=61",
        "date_time": "2025-06-30 20:46"
      },
      {
        "title": "Tournaments Event 2",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/540/302?random=62",
        "date_time": "2025-06-22 13:19"
      },
      {
        "title": "Events Event 3",
        "description": "Watch the highlights",
        "image_url": "https://picsum.photos/540/302?random=63",
        "date_time": "2025-07-06 13:37"
      },
      {
        "title": "Tournaments Event 4",
        "description": "Live coverage",
        "image_url": "https://picsum.photos/540/302?random=64",
        "date_time": "2025-06-21 00:59"
      },
      {
        "title": "Sports Event 5",
        "description": "Watch the highlights",
        "image_url": "https://picsum.photos/540/302?random=65",
        "date_time": "2025-06-24 12:42"
      },
      {
        "title": "Matches Event 6",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/540/302?random=66",
        "date_time": "2025-06-23 06:08"
      },
      {
        "title": "Matches Event 7",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/540/302?random=67",
        "date_time": "2025-07-03 04:12"
      },
      {
        "title": "Events Event 8",
        "description": "Watch the highlights",
        "image_url": "https://picsum.photos/540/302?random=68",
        "date_time": "2025-06-23 00:00"
      },
      {
        "title": "Entertainment Event 9",
        "description": "Watch the highlights",
        "image_url": "https://picsum.photos/540/302?random=69",
        "date_time": "2025-07-06 09:12"
      },
      {
        "title": "Matches Event 10",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/540/302?random=70",
        "date_time": "2025-07-02 11:57"
      },
      {
        "title": "Matches Event 11",
        "description": "Coming soon",
        "image_url": "https://picsum.photos/540/302?random=71",
        "date_time": "2025-07-05 18:12"
      },
      {
        "title": "Entertainment Event 12",
        "description": "Live coverage",
        "image_url": "https://picsum.photos/540/302?random=72",
        "date_time": "2025-07-01 21:53"
      },
      {
        "title": "Entertainment Event 13",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/540/302?random=73",
        "date_time": "2025-07-02 08:23"
      },
      {
        "title": "Tournaments Event 14",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/540/302?random=74",
        "date_time": "2025-06-28 05:25"
      }
    ]
  },
  {
    "type": "wide",
    "title": "Wide Row 4",
    "cards": [
      {
        "title": "Matches Event 1",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/540/302?random=81",
        "date_time": "2025-06-22 17:18"
      },
      {
        "title": "Matches Event 2",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/540/302?random=82",
        "date_time": "2025-06-26 11:57"
      },
      {
        "title": "Sports Event 3",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/540/302?random=83",
        "date_time": "2025-06-26 05:23"
      },
      {
        "title": "Entertainment Event 4",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/540/302?random=84",
        "date_time": "2025-07-02 06:51"
      },
      {
        "title": "Matches Event 5",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/540/302?random=85",
        "date_time": "2025-07-01 21:09"
      },
      {
        "title": "Tournaments Event 6",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/540/302?random=86",
        "date_time": "2025-06-25 10:58"
      },
      {
        "title": "Matches Event 7",
        "description": "Don't miss it!",
        "image_url": "https://picsum.photos/540/302?random=87",
        "date_time": "2025-07-09 21:18"
      },
      {
        "title": "Sports Event 8",
        "description": "Watch the highlights",
        "image_url": "https://picsum.photos/540/302?random=88",
        "date_time": "2025-07-01 01:21"
      },
      {
        "title": "Entertainment Event 9",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/540/302?random=89",
        "date_time": "2025-07-01 03:05"
      },
      {
        "title": "Entertainment Event 10",
        "description": "Epic moments await",
        "image_url": "https://picsum.photos/540/302?random=90",
        "date_time": "2025-06-23 12:04"
      },
      {
        "title": "Events Event 11",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/540/302?random=91",
        "date_time": "2025-07-06 10:19"
      },
      {
        "title": "Matches Event 12",
        "description": "Live coverage",
        "image_url": "https://picsum.photos/540/302?random=92",
        "date_time": "2025-07-09 00:28"
      },
      {
        "title": "Events Event 13",
        "description": "Live coverage",
        "image_url": "https://picsum.photos/540/302?random=93",
        "date_time": "2025-07-07 13:47"
      },
      {
        "title": "Sports Event 14",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/540/302?random=94",
        "date_time": "2025-06-28 19:15"
      }
    ]
  },
  {
    "type": "wide",
    "title": "Wide Row 5",
    "cards": [
      {
        "title": "Tournaments Event 1",
        "description": "Watch the highlights",
        "image_url": "https://picsum.photos/540/302?random=101",
        "date_time": "2025-06-26 18:19"
      },
      {
        "title": "Events Event 2",
        "description": "Coming soon",
        "image_url": "https://picsum.photos/540/302?random=102",
        "date_time": "2025-06-30 21:06"
      },
      {
        "title": "Matches Event 3",
        "description": "Live coverage",
        "image_url": "https://picsum.photos/540/302?random=103",
        "date_time": "2025-06-20 18:13"
      },
      {
        "title": "Tournaments Event 4",
        "description": "Watch the highlights",
        "image_url": "https://picsum.photos/540/302?random=104",
        "date_time": "2025-06-24 12:09"
      },
      {
        "title": "Sports Event 5",
        "description": "Coming soon",
        "image_url": "https://picsum.photos/540/302?random=105",
        "date_time": "2025-07-08 00:11"
      },
      {
        "title": "Sports Event 6",
        "description": "Live coverage",
        "image_url": "https://picsum.photos/540/302?random=106",
        "date_time": "2025-07-05 23:59"
      },
      {
        "title": "Tournaments Event 7",
        "description": "Coming soon",
        "image_url": "https://picsum.photos/540/302?random=107",
        "date_time": "2025-07-04 05:42"
      },
      {
        "title": "Entertainment Event 8",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/540/302?random=108",
        "date_time": "2025-06-20 17:53"
      },
      {
        "title": "Matches Event 9",
        "description": "Epic moments await",
        "image_url": "https://picsum.photos/540/302?random=109",
        "date_time": "2025-06-27 10:00"
      },
      {
        "title": "Matches Event 10",
        "description": "Epic moments await",
        "image_url": "https://picsum.photos/540/302?random=110",
        "date_time": "2025-06-24 03:58"
      }
    ]
  },
  {
    "type": "wide",
    "title": "Wide Row 6",
    "cards": [
      {
        "title": "Events Event 1",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/540/302?random=121",
        "date_time": "2025-07-02 00:09"
      },
      {
        "title": "Sports Event 2",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/540/302?random=122",
        "date_time": "2025-06-29 04:41"
      },
      {
        "title": "Matches Event 3",
        "description": "Coming soon",
        "image_url": "https://picsum.photos/540/302?random=123",
        "date_time": "2025-07-06 11:22"
      },
      {
        "title": "Events Event 4",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/540/302?random=124",
        "date_time": "2025-06-25 22:50"
      },
      {
        "title": "Events Event 5",
        "description": "Coming soon",
        "image_url": "https://picsum.photos/540/302?random=125",
        "date_time": "2025-06-21 09:08"
      },
      {
        "title": "Matches Event 6",
        "description": "Coming soon",
        "image_url": "https://picsum.photos/540/302?random=126",
        "date_time": "2025-06-29 15:08"
      },
      {
        "title": "Matches Event 7",
        "description": "Epic moments await",
        "image_url": "https://picsum.photos/540/302?random=127",
        "date_time": "2025-06-30 08:03"
      },
      {
        "title": "Sports Event 8",
        "description": "Live coverage",
        "image_url": "https://picsum.photos/540/302?random=128",
        "date_time": "2025-07-01 23:52"
      },
      {
        "title": "Sports Event 9",
        "description": "Epic moments await",
        "image_url": "https://picsum.photos/540/302?random=129",
        "date_time": "2025-06-24 03:29"
      },
      {
        "title": "Matches Event 10",
        "description": "Don't miss it!",
        "image_url": "https://picsum.photos/540/302?random=130",
        "date_time": "2025-07-02 06:01"
      },
      {
        "title": "Tournaments Event 11",
        "description": "Don't miss it!",
        "image_url": "https://picsum.photos/540/302?random=131",
        "date_time": "2025-06-24 08:55"
      }
    ]
  },
  {
    "type": "wide",
    "title": "Wide Row 7",
    "cards": [
      {
        "title": "Tournaments Event 1",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/540/302?random=141",
        "date_time": "2025-07-01 22:37"
      },
      {
        "title": "Entertainment Event 2",
        "description": "Live coverage",
        "image_url": "https://picsum.photos/540/302?random=142",
        "date_time": "2025-06-28 14:35"
      },
      {
        "title": "Sports Event 3",
        "description": "Don't miss it!",
        "image_url": "https://picsum.photos/540/302?random=143",
        "date_time": "2025-07-01 02:38"
      },
      {
        "title": "Events Event 4",
        "description": "Don't miss it!",
        "image_url": "https://picsum.photos/540/302?random=144",
        "date_time": "2025-07-06 02:27"
      },
      {
        "title": "Tournaments Event 5",
        "description": "Coming soon",
        "image_url": "https://picsum.photos/540/302?random=145",
        "date_time": "2025-07-03 13:21"
      },
      {
        "title": "Tournaments Event 6",
        "description": "Don't miss it!",
        "image_url": "https://picsum.photos/540/302?random=146",
        "date_time": "2025-06-28 04:12"
      },
      {
        "title": "Entertainment Event 7",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/540/302?random=147",
        "date_time": "2025-06-28 10:40"
      },
      {
        "title": "Matches Event 8",
        "description": "Live coverage",
        "image_url": "https://picsum.photos/540/302?random=148",
        "date_time": "2025-07-07 09:42"
      },
      {
        "title": "Entertainment Event 9",
        "description": "Epic moments await",
        "image_url": "https://picsum.photos/540/302?random=149",
        "date_time": "2025-07-03 15:11"
      },
      {
        "title": "Matches Event 10",
        "description": "Don't miss it!",
        "image_url": "https://picsum.photos/540/302?random=150",
        "date_time": "2025-06-26 20:47"
      },
      {
        "title": "Matches Event 11",
        "description": "Live coverage",
        "image_url": "https://picsum.photos/540/302?random=151",
        "date_time": "2025-07-04 14:48"
      },
      {
        "title": "Entertainment Event 12",
        "description": "Coming soon",
        "image_url": "https://picsum.photos/540/302?random=152",
        "date_time": "2025-07-06 23:30"
      },
      {
        "title": "Matches Event 13",
        "description": "Watch the highlights",
        "image_url": "https://picsum.photos/540/302?random=153",
        "date_time": "2025-07-01 18:21"
      },
      {
        "title": "Entertainment Event 14",
        "description": "Watch the highlights",
        "image_url": "https://picsum.photos/540/302?random=154",
        "date_time": "2025-07-05 09:31"
      },
      {
        "title": "Entertainment Event 15",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/540/302?random=155",
        "date_time": "2025-06-28 09:58"
      },
      {
        "title": "Events Event 16",
        "description": "Don't miss it!",
        "image_url": "https://picsum.photos/540/302?random=156",
        "date_time": "2025-07-04 23:24"
      }
    ]
  },
  {
    "type": "narrow",
    "title": "Narrow Row 1",
    "cards": [
      {
        "title": "Events Event 1",
        "description": "Epic moments await",
        "image_url": "https://picsum.photos/324/432?random=21",
        "date_time": "2025-07-01 06:31"
      },
      {
        "title": "Events Event 2",
        "description": "Watch the highlights",
        "image_url": "https://picsum.photos/324/432?random=22",
        "date_time": "2025-06-28 18:15"
      },
      {
        "title": "Tournaments Event 3",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/324/432?random=23",
        "date_time": "2025-06-21 20:33"
      },
      {
        "title": "Entertainment Event 4",
        "description": "Live coverage",
        "image_url": "https://picsum.photos/324/432?random=24",
        "date_time": "2025-06-29 05:39"
      },
      {
        "title": "Entertainment Event 5",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/324/432?random=25",
        "date_time": "2025-06-28 18:12"
      },
      {
        "title": "Events Event 6",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/324/432?random=26",
        "date_time": "2025-06-21 05:58"
      },
      {
        "title": "Matches Event 7",
        "description": "Watch the highlights",
        "image_url": "https://picsum.photos/324/432?random=27",
        "date_time": "2025-07-03 19:28"
      },
      {
        "title": "Matches Event 8",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/324/432?random=28",
        "date_time": "2025-07-08 06:14"
      },
      {
        "title": "Tournaments Event 9",
        "description": "Watch the highlights",
        "image_url": "https://picsum.photos/324/432?random=29",
        "date_time": "2025-07-02 11:14"
      },
      {
        "title": "Tournaments Event 10",
        "description": "Don't miss it!",
        "image_url": "https://picsum.photos/324/432?random=30",
        "date_time": "2025-07-02 08:15"
      }
    ]
  },
  {
    "type": "narrow",
    "title": "Narrow Row 2",
    "cards": [
      {
        "title": "Matches Event 1",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/324/432?random=41",
        "date_time": "2025-06-24 05:24"
      },
      {
        "title": "Matches Event 2",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/324/432?random=42",
        "date_time": "2025-07-02 11:41"
      },
      {
        "title": "Tournaments Event 3",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/324/432?random=43",
        "date_time": "2025-07-03 16:06"
      },
      {
        "title": "Matches Event 4",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/324/432?random=44",
        "date_time": "2025-07-09 18:28"
      },
      {
        "title": "Entertainment Event 5",
        "description": "Epic moments await",
        "image_url": "https://picsum.photos/324/432?random=45",
        "date_time": "2025-06-27 20:07"
      },
      {
        "title": "Matches Event 6",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/324/432?random=46",
        "date_time": "2025-06-21 19:38"
      },
      {
        "title": "Tournaments Event 7",
        "description": "Coming soon",
        "image_url": "https://picsum.photos/324/432?random=47",
        "date_time": "2025-06-22 09:04"
      },
      {
        "title": "Events Event 8",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/324/432?random=48",
        "date_time": "2025-06-21 23:13"
      },
      {
        "title": "Tournaments Event 9",
        "description": "Watch the highlights",
        "image_url": "https://picsum.photos/324/432?random=49",
        "date_time": "2025-07-09 09:39"
      },
      {
        "title": "Sports Event 10",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/324/432?random=50",
        "date_time": "2025-06-25 18:00"
      },
      {
        "title": "Matches Event 11",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/324/432?random=51",
        "date_time": "2025-06-30 12:32"
      },
      {
        "title": "Matches Event 12",
        "description": "Don't miss it!",
        "image_url": "https://picsum.photos/324/432?random=52",
        "date_time": "2025-06-29 05:35"
      },
      {
        "title": "Matches Event 13",
        "description": "Coming soon",
        "image_url": "https://picsum.photos/324/432?random=53",
        "date_time": "2025-07-04 19:25"
      }
    ]
  },
  {
    "type": "narrow",
    "title": "Narrow Row 3",
    "cards": [
      {
        "title": "Events Event 1",
        "description": "Coming soon",
        "image_url": "https://picsum.photos/324/432?random=61",
        "date_time": "2025-07-03 20:42"
      },
      {
        "title": "Matches Event 2",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/324/432?random=62",
        "date_time": "2025-06-28 00:01"
      },
      {
        "title": "Events Event 3",
        "description": "Don't miss it!",
        "image_url": "https://picsum.photos/324/432?random=63",
        "date_time": "2025-06-23 04:50"
      },
      {
        "title": "Tournaments Event 4",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/324/432?random=64",
        "date_time": "2025-06-27 19:39"
      },
      {
        "title": "Matches Event 5",
        "description": "Live coverage",
        "image_url": "https://picsum.photos/324/432?random=65",
        "date_time": "2025-07-09 01:31"
      },
      {
        "title": "Sports Event 6",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/324/432?random=66",
        "date_time": "2025-06-23 07:45"
      },
      {
        "title": "Sports Event 7",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/324/432?random=67",
        "date_time": "2025-06-30 13:40"
      },
      {
        "title": "Matches Event 8",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/324/432?random=68",
        "date_time": "2025-06-30 19:27"
      },
      {
        "title": "Sports Event 9",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/324/432?random=69",
        "date_time": "2025-06-23 13:54"
      },
      {
        "title": "Entertainment Event 10",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/324/432?random=70",
        "date_time": "2025-07-09 23:03"
      },
      {
        "title": "Entertainment Event 11",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/324/432?random=71",
        "date_time": "2025-06-24 02:35"
      },
      {
        "title": "Sports Event 12",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/324/432?random=72",
        "date_time": "2025-06-20 23:23"
      },
      {
        "title": "Entertainment Event 13",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/324/432?random=73",
        "date_time": "2025-06-29 11:51"
      }
    ]
  },
  {
    "type": "narrow",
    "title": "Narrow Row 4",
    "cards": [
      {
        "title": "Matches Event 1",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/324/432?random=81",
        "date_time": "2025-07-08 05:59"
      },
      {
        "title": "Matches Event 2",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/324/432?random=82",
        "date_time": "2025-07-09 07:34"
      },
      {
        "title": "Tournaments Event 3",
        "description": "Live coverage",
        "image_url": "https://picsum.photos/324/432?random=83",
        "date_time": "2025-07-01 10:05"
      },
      {
        "title": "Tournaments Event 4",
        "description": "Epic moments await",
        "image_url": "https://picsum.photos/324/432?random=84",
        "date_time": "2025-06-21 16:42"
      },
      {
        "title": "Entertainment Event 5",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/324/432?random=85",
        "date_time": "2025-07-04 03:58"
      },
      {
        "title": "Entertainment Event 6",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/324/432?random=86",
        "date_time": "2025-07-03 16:44"
      },
      {
        "title": "Events Event 7",
        "description": "Coming soon",
        "image_url": "https://picsum.photos/324/432?random=87",
        "date_time": "2025-06-27 11:22"
      },
      {
        "title": "Entertainment Event 8",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/324/432?random=88",
        "date_time": "2025-06-29 12:26"
      },
      {
        "title": "Sports Event 9",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/324/432?random=89",
        "date_time": "2025-06-28 09:52"
      },
      {
        "title": "Tournaments Event 10",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/324/432?random=90",
        "date_time": "2025-07-07 00:15"
      }
    ]
  },
  {
    "type": "narrow",
    "title": "Narrow Row 5",
    "cards": [
      {
        "title": "Events Event 1",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/324/432?random=101",
        "date_time": "2025-07-02 15:23"
      },
      {
        "title": "Entertainment Event 2",
        "description": "Coming soon",
        "image_url": "https://picsum.photos/324/432?random=102",
        "date_time": "2025-06-28 13:08"
      },
      {
        "title": "Tournaments Event 3",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/324/432?random=103",
        "date_time": "2025-06-21 10:08"
      },
      {
        "title": "Entertainment Event 4",
        "description": "Watch the highlights",
        "image_url": "https://picsum.photos/324/432?random=104",
        "date_time": "2025-07-07 14:59"
      },
      {
        "title": "Events Event 5",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/324/432?random=105",
        "date_time": "2025-06-30 14:48"
      },
      {
        "title": "Entertainment Event 6",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/324/432?random=106",
        "date_time": "2025-06-22 01:46"
      },
      {
        "title": "Entertainment Event 7",
        "description": "Live coverage",
        "image_url": "https://picsum.photos/324/432?random=107",
        "date_time": "2025-06-28 12:27"
      },
      {
        "title": "Entertainment Event 8",
        "description": "Don't miss it!",
        "image_url": "https://picsum.photos/324/432?random=108",
        "date_time": "2025-06-30 20:27"
      },
      {
        "title": "Matches Event 9",
        "description": "Epic moments await",
        "image_url": "https://picsum.photos/324/432?random=109",
        "date_time": "2025-06-24 18:31"
      },
      {
        "title": "Entertainment Event 10",
        "description": "Epic moments await",
        "image_url": "https://picsum.photos/324/432?random=110",
        "date_time": "2025-07-02 00:28"
      }
    ]
  },
  {
    "type": "narrow",
    "title": "Narrow Row 6",
    "cards": [
      {
        "title": "Tournaments Event 1",
        "description": "Epic moments await",
        "image_url": "https://picsum.photos/324/432?random=121",
        "date_time": "2025-06-30 08:18"
      },
      {
        "title": "Events Event 2",
        "description": "Don't miss it!",
        "image_url": "https://picsum.photos/324/432?random=122",
        "date_time": "2025-06-25 06:23"
      },
      {
        "title": "Events Event 3",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/324/432?random=123",
        "date_time": "2025-06-23 06:33"
      },
      {
        "title": "Entertainment Event 4",
        "description": "Coming soon",
        "image_url": "https://picsum.photos/324/432?random=124",
        "date_time": "2025-07-03 03:24"
      },
      {
        "title": "Matches Event 5",
        "description": "Watch the highlights",
        "image_url": "https://picsum.photos/324/432?random=125",
        "date_time": "2025-06-23 03:10"
      },
      {
        "title": "Tournaments Event 6",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/324/432?random=126",
        "date_time": "2025-07-10 05:23"
      },
      {
        "title": "Entertainment Event 7",
        "description": "Epic moments await",
        "image_url": "https://picsum.photos/324/432?random=127",
        "date_time": "2025-06-28 03:15"
      },
      {
        "title": "Sports Event 8",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/324/432?random=128",
        "date_time": "2025-07-05 12:04"
      },
      {
        "title": "Tournaments Event 9",
        "description": "Coming soon",
        "image_url": "https://picsum.photos/324/432?random=129",
        "date_time": "2025-07-06 12:58"
      },
      {
        "title": "Events Event 10",
        "description": "Live coverage",
        "image_url": "https://picsum.photos/324/432?random=130",
        "date_time": "2025-06-25 02:06"
      },
      {
        "title": "Sports Event 11",
        "description": "Watch the highlights",
        "image_url": "https://picsum.photos/324/432?random=131",
        "date_time": "2025-07-02 09:43"
      },
      {
        "title": "Tournaments Event 12",
        "description": "Don't miss it!",
        "image_url": "https://picsum.photos/324/432?random=132",
        "date_time": "2025-06-28 09:54"
      },
      {
        "title": "Events Event 13",
        "description": "Coming soon",
        "image_url": "https://picsum.photos/324/432?random=133",
        "date_time": "2025-06-24 12:49"
      },
      {
        "title": "Matches Event 14",
        "description": "Don't miss it!",
        "image_url": "https://picsum.photos/324/432?random=134",
        "date_time": "2025-07-06 20:34"
      },
      {
        "title": "Tournaments Event 15",
        "description": "Watch the highlights",
        "image_url": "https://picsum.photos/324/432?random=135",
        "date_time": "2025-06-27 00:54"
      }
    ]
  },
  {
    "type": "narrow",
    "title": "Narrow Row 7",
    "cards": [
      {
        "title": "Matches Event 1",
        "description": "Live coverage",
        "image_url": "https://picsum.photos/324/432?random=141",
        "date_time": "2025-06-30 11:48"
      },
      {
        "title": "Matches Event 2",
        "description": "Don't miss it!",
        "image_url": "https://picsum.photos/324/432?random=142",
        "date_time": "2025-06-29 09:14"
      },
      {
        "title": "Sports Event 3",
        "description": "Catch the thrill",
        "image_url": "https://picsum.photos/324/432?random=143",
        "date_time": "2025-07-03 19:20"
      },
      {
        "title": "Tournaments Event 4",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/324/432?random=144",
        "date_time": "2025-06-23 10:00"
      },
      {
        "title": "Entertainment Event 5",
        "description": "Epic moments await",
        "image_url": "https://picsum.photos/324/432?random=145",
        "date_time": "2025-07-01 13:52"
      },
      {
        "title": "Tournaments Event 6",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/324/432?random=146",
        "date_time": "2025-07-02 00:44"
      },
      {
        "title": "Sports Event 7",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/324/432?random=147",
        "date_time": "2025-06-26 16:23"
      },
      {
        "title": "Sports Event 8",
        "description": "Streaming live",
        "image_url": "https://picsum.photos/324/432?random=148",
        "date_time": "2025-07-05 13:59"
      },
      {
        "title": "Tournaments Event 9",
        "description": "Coming soon",
        "image_url": "https://picsum.photos/324/432?random=149",
        "date_time": "2025-06-22 14:29"
      },
      {
        "title": "Tournaments Event 10",
        "description": "Epic moments await",
        "image_url": "https://picsum.photos/324/432?random=150",
        "date_time": "2025-07-02 11:27"
      },
      {
        "title": "Entertainment Event 11",
        "description": "Live coverage",
        "image_url": "https://picsum.photos/324/432?random=151",
        "date_time": "2025-07-03 22:17"
      },
      {
        "title": "Tournaments Event 12",
        "description": "Epic moments await",
        "image_url": "https://picsum.photos/324/432?random=152",
        "date_time": "2025-07-06 00:11"
      },
      {
        "title": "Entertainment Event 13",
        "description": "Top-tier action",
        "image_url": "https://picsum.photos/324/432?random=153",
        "date_time": "2025-07-02 00:54"
      }
    ]
  }
]

export const GET = async (req: NextRequest) => {
    const params = req.nextUrl.searchParams
    const from = Number(params.get('from'))
    const count = Number(params.get('count'))
    
     const sliced = from < db.length && from + count <= db.length ? db.slice(from, from + count) : []
    return NextResponse.json({ rows: sliced })
}