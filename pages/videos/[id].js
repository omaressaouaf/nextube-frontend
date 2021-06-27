import MetaData from "../../components/layouts/MetaData";
import VideoSingle from "../../components/videos/VideoSingle";
import SuggestionList from "../../components/suggestions/SuggestionList";
import CommentList from "../../components/comments/CommentList";
import Divider from "../../components/base/Divider";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Video = () => {
  // redux
  const [video, loading] = useSelector(state => [
    state.videosReducer.video,
    state.uiReducer.loadings.VideoSingle,
  ]);

  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="video-page grid grid-cols-12 gap-6">
      <MetaData title={loading ? "" : video.title} />
      <div className="video-all col-span-12 lg:col-span-8">
        <VideoSingle videoId={id} />

        <Divider />

        <div className="comments-section w-full">
          <CommentList videoId={id} />
        </div>
      </div>
      <div className="suggestions col-span-12 lg:col-span-4">
        <SuggestionList videoId={id} />
      </div>
    </div>
  );
};

export default Video;
