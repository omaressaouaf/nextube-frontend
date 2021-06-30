import Link from "next/link";
import Image from "next/image";
import Avatar from "../base/Avatar";
import PropTypes from "prop-types";
import { formatDateAgo } from "../../global/helpers";

const VideoItem = ({ video }) => {
  return (
    <div className="video-preview mb-5" key={video.id}>
      <Link href={`/videos/${video.id}`}>
        <a className="relative">
          <Image
            placeholder="blur"
            blurDataURL={video.thumbnail}
            width={500}
            height={300}
            src={video.thumbnail}
            className="mb-1 hover:opacity-75 transition-opacity"
            alt="thumbnail"
          />
          {video.duration && (
            <div className="absolute bottom-2 right-1 p-1 text-xs font-semibold bg-lightBlack text-gray-200 rounded-sm">
              {video.duration.toFixed(2).replace(".", ":")}
            </div>
          )}
        </a>
      </Link>
      <div className="flex items-start mt-4">
        <Avatar className="w-7 mr-3 mt-1" src={video.user.avatar} />

        <div>
          <div className="mb-2 w-full">
            <Link href={`/videos/${video.id}`}>
              <a className="text-black dark:text-white  font-semibold w-full">{video.title}</a>
            </Link>
          </div>
          <div className="text-sm">
            <Link href={`/videos/${video.id}`}>
              <a className="text-gray-600 capitalize hover:text-black dark:text-gray-400 dark:hover:text-white ">
                {video.user.channelName}
                <i className="fa fa-check-circle ml-2"></i>
              </a>
            </Link>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {video.viewsCount} views &middot; {formatDateAgo(video.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

VideoItem.propTypes = {
  video: PropTypes.object.isRequired,
};

export default VideoItem;
