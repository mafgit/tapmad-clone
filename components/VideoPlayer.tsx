"use client";
import dynamic from "next/dynamic";
const JWPlayer = dynamic(() => import("@/components/JWPlayer"), { ssr: false });

const VideoPlayer = ({
  id,
  file,
  image,
  title,
  description,
  long_description,
  live,
}: {
  id: string;
  file: string;
  image: string;
  title: string;
  description: string;
  long_description: string;
  live: boolean;
}) => {
  return (
    <div className="px-[20px] flex flex-col items-center justify-center w-full mx-auto text-center">
      <JWPlayer file={file} image={image} live={live} id={id} />
      <h1 className="text-3xl font-bold mt-6">{title}</h1>
      <p className="mt-2 text-gray-400 text-lg">{description}</p>
      <p className="text-gray-400 italic">"{long_description}"</p>
    </div>
  );
};

export default VideoPlayer;
