import IVideo from "@/models/IVideo";
import ICard from "@/models/ICard";
import { getVideoDetails } from "@/app/services/api/pages/video/video.services";
import Row from "@/components/Row";
import VideoPlayer from "@/components/VideoPlayer";
// import JWPlayer from "@/components/JWPlayer";

const VideoPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const {
    video: { file, image, error, title, description, live, long_description },
    other,
  } = await getVideoDetails(id);

  if (error) console.log(error);
  if (error || !file) return <p>Error</p>;
  return (
    <div className="max-w-[80%] mx-auto py-[40px]">
      <VideoPlayer
        id={id}
        file={file}
        image={image}
        title={title}
        live={live}
        description={description}
        long_description={long_description}
      />

      <div className="mt-8">
        {other.length ? (
          <Row
            cards={other.map(
              (v: IVideo) =>
                ({
                  id: v.id,
                  title: v.title,
                  image_url: v.image,
                  description: v.description,
                  is_video: true,
                  is_live: v.live,
                } as ICard)
            )}
            title="Other Videos"
            row_type="wide"
            row_i={1000}
          />
        ) : (
          <h2>No other videos</h2>
        )}
      </div>
    </div>
  );
};

export default VideoPage;
