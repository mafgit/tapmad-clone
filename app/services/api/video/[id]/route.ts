import { type NextRequest, NextResponse } from "next/server";

const videos = [
  {
    id: "1",
    title: "Tears of Steel",
    file: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8",
    description: "lorem ipsum",
    image: "http://picsum.photos/1920/1080?random=2",

    live: false,
  },
  {
    id: "2",
    title: "Live Akamai",
    file: "https://stream-akamai.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8",
    image: "http://picsum.photos/1920/1080?random=2",
    description: "lorem ipsum",
    live: true,
  },
];

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;
  const vid = videos.find((v) => v.id === id);
  if (vid) return NextResponse.json(vid);
  return NextResponse.json({ error: "Not found" });
};

export const POST = async (req: NextRequest) => {
  const analytics = await req.json();
  analytics["appVersion"] = "1.0.0";
  console.log("---------------\n\n");
  console.log(analytics, "\n\n");
  return NextResponse.json({});
};
