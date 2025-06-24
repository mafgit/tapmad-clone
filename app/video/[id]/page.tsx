import { getVideoDetails } from "@/app/services/api/pages/video/video.services";
import VideoPlayer from "@/components/VideoPlayer";
// import JWPlayer from "@/components/JWPlayer";

const VideoPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const { file, image, error, title, description, live } = await getVideoDetails(id);
  if (error) console.log(error);
  if (error || !file) return <p>Error</p>;
  return (
    <div className="py-[20px]">
      <VideoPlayer
        id={id}
        file={file}
        image={image}
        title={title}
        live={live}
        description={description}
      />
      
      <div className="">
        {}
      </div>
    </div>
  );
};

export default VideoPage;
