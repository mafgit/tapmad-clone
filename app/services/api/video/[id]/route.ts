import { type NextRequest, NextResponse } from "next/server";

const videos = [
  {
    id: "1",
    title: "Tears of Steel",
    file: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    description: "lorem ipsum",
    long_description:
      "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
    image: "https://picsum.photos/1920/1080?random=1",
    live: false,
  },
  {
    id: "2",
    title: "Live Akamai",
    file: "https://stream-akamai.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8",
    image: "https://picsum.photos/1920/1080?random=2",
    description: "lorem ipsum",
    long_description:
      "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
    live: true,
  },
  {
    id: "3",
    title: "Test Stream",
    file: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    image: "https://picsum.photos/1920/1080?random=3",
    long_description:
      "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
    description: "lorem ipsum",
    live: false,
  },
  {
    id: "4",
    title: "Apple Stream",
    file: "https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_4x3/gear1/prog_index.m3u8",
    image: "https://picsum.photos/1920/1080?random=4",
    long_description:
      "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
    description: "lorem ipsum",
    live: false,
  },
  {
    id: "5",
    title: "Big Buck Bunny",
    file: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    image: "https://picsum.photos/1920/1080?random=5",
    description: "lorem ipsum",
    long_description:
      "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
    live: false,
  },
];

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;
  const vid = videos.find((v) => v.id === id);
  const other = videos.filter((v) => v.id !== id).slice(0, 5);
  if (vid) return NextResponse.json({ video: vid, other });
  return NextResponse.json({ error: "Not found" });
};

export const POST = async (req: NextRequest) => {
  const analytics = await req.json();
  analytics["appVersion"] = "1.0.0";
  console.log("---------------\n\n");
  console.log(analytics, "\n\n");
  return NextResponse.json({});
};
