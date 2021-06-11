import Link from "next/link";
import Image from "next/image";
import Avatar from "../base/Avatar";
import { useEffect } from "react";
import { useDispatch ,useSelector } from "react-redux";
import { setVideos } from "../../store/actions/videosActions";
import { handleServerError } from "../../store/actions/uiActions";
import { formatDateAgo } from "../../global/helpers";

const VideosList = ({data , serverError}) => {
  // redux
  const videos = useSelector(state => state.videosReducer.videos);
  const dispatch = useDispatch();

  useEffect(() => {
    if (serverError) {
      dispatch(handleServerError(serverError , 'VideosList'));
    } else {
      dispatch(setVideos(data.videos));
    }
  }, []);

  return (
    <div>
      <p className="font-semibold mb-6">Recommended videos</p>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mb-6">
        {videos.map(video => {
          return (
            <div className="video-preview mb-5" key={video.id}>
              <Link href={`/videos/${video.id}`}>
                <a>
                  <Image width={500} height={300} src={video.thumbnail} className="mb-1 hover:opacity-75 transition-opacity" alt="" />
                </a>
              </Link>
              <div className="flex items-start mt-4">
                <Avatar className="w-7 mr-3 mt-1" src={video.user.avatar} />

                <div>
                  <div className="mb-2 w-full">
                    <Link href={`/videos/${video.id}`}>
                      <a className="text-black font-semibold w-full">{video.title}</a>
                    </Link>
                  </div>
                  <div className="text-sm">
                    <Link href={`/videos/${video.id}`}>
                      <a className="text-gray-600 hover:text-black">
                        {video.user.channelName} <i className="fa fa-check-circle transition "></i>
                      </a>
                    </Link>
                  </div>
                  <div className="text-sm text-gray-600">245k views &middot; {formatDateAgo(video.createdAt)}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideosList;
